import type { Patient } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import MedicalCalendar from './medical-calendar';

const InfoField = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="grid grid-cols-2 gap-2">
        <p className="font-medium text-muted-foreground">{label}</p>
        <p>{value}</p>
    </div>
);

const MedicalResume = ({ patient }: { patient: Patient }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            <InfoField label="Full Name" value={patient.name} />
            <InfoField label="Date of Birth" value={patient.dob ? format(new Date(patient.dob), 'MMMM d, yyyy') : ''} />
            <InfoField label="Gender" value={patient.gender} />
            <InfoField label="Blood Type" value={patient.bloodType} />
            <InfoField label="Phone" value={patient.contact.phone} />
            <InfoField label="Email" value={patient.contact.email} />
            <InfoField label="Address" value={patient.contact.address} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Medical Timeline</CardTitle>
          <CardDescription>Click on a highlighted date to see event details.</CardDescription>
        </CardHeader>
        <CardContent>
            <MedicalCalendar patient={patient} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Medical Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Conditions</h3>
                <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.conditions.map(c => <Badge key={c.name} variant="outline">{c.name}</Badge>)}
                </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-2">Allergies</h3>
                <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.allergies.map(allergy => <Badge key={allergy} variant="secondary">{allergy}</Badge>)}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Medications</h3>
                 <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Medication</TableHead>
                                <TableHead>Dosage</TableHead>
                                <TableHead>Frequency</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patient.medicalHistory.medications.map(m => (
                                <TableRow key={m.name}>
                                    <TableCell className="font-medium">{m.name}</TableCell>
                                    <TableCell>{m.dosage}</TableCell>
                                    <TableCell>{m.frequency}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalResume;
