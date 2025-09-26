
'use client';

import React, { useState, Suspense } from 'react';
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
import { format } from 'date-fns';
import MedicalCalendar from './medical-calendar';
import MedicalEventDetails from './medical-event-details';
import ConsultationTimeline from './consultation-timeline';

const PersonalizedNotifications = React.lazy(() => import('@/components/patient/personalized-notifications'));
import { PersonalizedNotificationsSkeleton } from '@/components/patient/personalized-notifications';


const InfoField = ({ label, value }: { label: string | undefined; value: string | undefined }) => (
    <div className="grid grid-cols-2 gap-2">
        <p className="font-medium text-muted-foreground">{label}</p>
        <p>{value}</p>
    </div>
);

const MedicalResume = ({ patient }: { patient: Patient }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your Personal Health Analyst</CardTitle>
          <CardDescription>
            Exclusive insights curated by our AI based on your health profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<PersonalizedNotificationsSkeleton />}>
              <PersonalizedNotifications />
          </Suspense>
        </CardContent>
      </Card>

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
          <CardTitle className="font-headline text-2xl">Medical Procedures Timeline</CardTitle>
          <CardDescription>A calendar view of your past surgeries and vaccinations. Click a date for details.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <MedicalCalendar patient={patient} selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            <MedicalEventDetails patient={patient} selectedDate={selectedDate} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Consultation History</CardTitle>
          <CardDescription>A timeline of your past consultations.</CardDescription>
        </CardHeader>
        <CardContent>
          <ConsultationTimeline consultations={patient.consultationHistory} />
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
