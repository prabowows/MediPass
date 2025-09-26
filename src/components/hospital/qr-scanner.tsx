'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jsQR from 'jsqr';
import { QrCode, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const QrScanner = () => {
  const [patientId, setPatientId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isScanning) {
        // Stop camera stream when not scanning
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        return;
    }

    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        setIsScanning(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to scan QR codes.',
        });
      }
    };

    getCameraPermission();

    return () => {
        // Cleanup function to stop camera stream
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, [isScanning, toast]);


  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      if (isScanning && videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code) {
            const url = code.data;
             // Basic validation for URL
            if (url.includes('/hospital/patient/')) {
                router.push(url);
                setIsScanning(false);
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    if(isScanning) {
        animationFrameId = requestAnimationFrame(tick);
    }
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [isScanning, router]);


  const handleScanClick = () => {
    setIsScanning(prev => !prev);
  };

  const handleManualLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientId.trim()) {
      router.push(`/hospital/patient/${patientId.trim()}`);
    }
  };

  return (
    <div className="space-y-6">
       {isScanning && (
        <div className="space-y-4">
          <div className="relative w-full">
            <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
            <canvas ref={canvasRef} className="hidden" />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-4 border-dashed border-primary/70 rounded-lg"></div>
            </div>
          </div>
          {hasCameraPermission === false && (
            <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access to use this feature. You may need to refresh the page and try again.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <Button
        onClick={handleScanClick}
        className="w-full"
        size="lg"
      >
        <QrCode className="mr-2 h-5 w-5" />
        {isScanning ? 'Stop Scanning' : 'Scan Patient QR Code'}
      </Button>
      
      <div className="flex items-center space-x-2">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleManualLookup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="patient-id">Enter Patient ID Manually</Label>
          <Input
            id="patient-id"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="e.g., pat-12345"
            disabled={isScanning}
          />
        </div>
        <Button type="submit" variant="secondary" className="w-full" disabled={isScanning}>
          Look Up Patient
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default QrScanner;
