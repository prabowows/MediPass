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
import ConditionCard from './condition-card';

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
          <CardTitle className="font-headline text-2xl">Medical History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Conditions</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {patient.medicalHistory.conditions.map(c => (
                        <ConditionCard key={c.name} condition={c} />
                    ))}
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

            <div>
                <h3 className="text-lg font-semibold mb-2">Surgeries & Vaccinations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className='font-medium text-muted-foreground'>Surgeries: {patient.medicalHistory.surgeries.map(s => `${s.name} (${format(new Date(s.date), 'yyyy')})`).join(', ')}</p>
                    <p className='font-medium text-muted-foreground'>Vaccinations: {patient.medicalHistory.vaccinations.map(v => `${v.name} (${format(new Date(v.date), 'yyyy')})`).join(', ')}</p>
                </div>
            </div>
        </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle className="font-headline text-2xl">Consultation History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              {patient.consultationHistory.map((item, index) => (
                  <div key={index}>
                      <div className="p-4 rounded-lg border bg-card">
                          <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold">{item.reason}</h4>
                              <p className="text-sm text-muted-foreground">{format(new Date(item.date), 'MMMM d, yyyy')}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                              {item.hospital} - Dr. {item.doctor}
                          </p>
                          <p className="mt-2 text-sm">{item.notes}</p>
                      </div>
                      {index < patient.consultationHistory.length - 1 && <Separator className="my-4"/>}
                  </div>
              ))}
          </CardContent>
      </Card>

    </div>
  );
};

export default MedicalResume;
