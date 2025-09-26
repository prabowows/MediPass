import MedicalResume from '@/components/patient/medical-resume';
import { mainPatient } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ViewPatientRecord({ params }: { params: { id: string } }) {
  // In a real app, you would fetch patient data based on params.id
  // For this demo, we'll use the mock patient if the ID matches.
  const patient = params.id === mainPatient.id ? mainPatient : null;

  return (
    <div className="bg-background">
      <div className="container mx-auto py-8 md:py-12">
        <div className="mb-8">
            <Button asChild variant="ghost" className="mb-4">
                <Link href="/hospital/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
            </Button>
          {patient ? (
            <>
              <h1 className="font-headline text-3xl font-bold">
                Medical Record: {patient.name}
              </h1>
              <p className="text-muted-foreground">
                Patient ID: {patient.id}
              </p>
            </>
          ) : (
             <h1 className="font-headline text-3xl font-bold">
                Patient Not Found
              </h1>
          )}
        </div>
        
        {patient ? (
          <MedicalResume patient={patient} />
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed bg-card">
            <p className="text-muted-foreground">No patient record found for ID: {params.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}
