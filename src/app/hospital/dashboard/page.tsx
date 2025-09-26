import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PatientHistory from '@/components/hospital/patient-history';
import QrScanner from '@/components/hospital/qr-scanner';
import { hospitalPatientHistory } from '@/lib/data';

export default function HospitalDashboard() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-8 md:py-12">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold">
            Hospital Portal
          </h1>
          <p className="text-muted-foreground">
            Scan a patient&apos;s MediPassport or view recent patient records.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Patient Lookup</CardTitle>
                <CardDescription>
                  Scan a QR code or enter a Patient ID to access their record.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QrScanner />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Recent Patient History</CardTitle>
                <CardDescription>
                  A list of patients recently accessed by this hospital.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PatientHistory patients={hospitalPatientHistory} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
