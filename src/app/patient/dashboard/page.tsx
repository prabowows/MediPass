
'use client';

import React, { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeartPulse, QrCode, Bell } from 'lucide-react';

import MedicalResume from '@/components/patient/medical-resume';
import PatientQrCode from '@/components/patient/qr-code';
import { mainPatient } from '@/lib/data';

// Lazy load the notifications component
const PersonalizedNotifications = React.lazy(() => import('@/components/patient/personalized-notifications'));
import { PersonalizedNotificationsSkeleton } from '@/components/patient/personalized-notifications';

export default function PatientDashboard() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-8 md:py-12">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold">
            Welcome, {mainPatient.name}
          </h1>
          <p className="text-muted-foreground">
            This is your personal health dashboard.
          </p>
        </div>
        <Tabs defaultValue="resume" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-fit">
            <TabsTrigger value="resume">
              <HeartPulse className="mr-2 h-4 w-4" />
              Medical Resume
            </TabsTrigger>
            <TabsTrigger value="qr">
              <QrCode className="mr-2 h-4 w-4" />
              QR Code
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="resume" className="mt-6">
            <MedicalResume patient={mainPatient} />
          </TabsContent>
          <TabsContent value="qr" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Your MediPass QR Code</CardTitle>
                <CardDescription>
                  Present this code at any registered hospital for instant access to your medical resume.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PatientQrCode patientId={mainPatient.id} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
             <Card>
              <CardHeader>
                <CardTitle className="font-headline">Your Personal Health Analyst</CardTitle>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
