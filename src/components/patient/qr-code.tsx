'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PatientQrCode = ({ patientId }: { patientId: string }) => {
  const [patientUrl, setPatientUrl] = useState('');

  useEffect(() => {
    // This ensures window is available
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/hospital/patient/${patientId}`;
      setPatientUrl(url);
    }
  }, [patientId]);

  if (!patientUrl) {
    return (
        <div className="flex h-64 w-64 items-center justify-center rounded-lg bg-muted">
            <p className="text-muted-foreground">Generating QR Code...</p>
        </div>
    );
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
    patientUrl
  )}&bgcolor=e5eae7`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-lg border-4 border-primary p-2">
        <Image
          src={qrCodeUrl}
          alt="Patient QR Code"
          width={256}
          height={256}
          unoptimized // Required for external image services that don't support optimization
        />
      </div>
      <p className="max-w-xs text-center text-sm text-muted-foreground">
        Hospitals can scan this to view your non-sensitive medical history.
      </p>
    </div>
  );
};

export default PatientQrCode;
