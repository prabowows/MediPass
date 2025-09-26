'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

const QrScanner = () => {
  const [patientId, setPatientId] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleScanClick = () => {
    toast({
      title: 'Feature Not Available',
      description: 'Live QR scanning is for demonstration purposes only. Please use manual ID entry.',
      variant: 'default',
    });
  };

  const handleManualLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientId.trim()) {
      router.push(`/hospital/patient/${patientId.trim()}`);
    }
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={handleScanClick}
        className="w-full"
        size="lg"
      >
        <QrCode className="mr-2 h-5 w-5" />
        Scan Patient QR Code
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
          />
        </div>
        <Button type="submit" variant="secondary" className="w-full">
          Look Up Patient
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default QrScanner;
