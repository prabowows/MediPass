'use client';

import { personalizedNotifications } from '@/ai/flows/personalized-notifications';
import {
  patientMedicalHistory,
  hospitalPromotions,
  medicationUpdates,
} from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BrainCircuit, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import type { PersonalizedNotificationsOutput } from '@/ai/flows/personalized-notifications';

const PersonalizedNotifications = () => {
  const [notifications, setNotifications] =
    useState<PersonalizedNotificationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const result = await personalizedNotifications({
          patientMedicalHistory,
          hospitalPromotions,
          medicationUpdates,
        });
        setNotifications(result);
      } catch (error) {
        console.error('Failed to fetch personalized notifications:', error);
        // Optionally, set an error state to show in the UI
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (isLoading) {
    return <PersonalizedNotificationsSkeleton />;
  }

  if (!notifications) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
        <Info className="h-10 w-10 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">
          Could not load notifications
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          There was an error fetching your personalized health insights. Please
          try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card shadow-lg transition-all hover:shadow-xl">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-headline text-lg font-semibold text-foreground">
                Curated For You
              </h3>
              <p className="text-sm text-muted-foreground">
                Our AI has analyzed your health data to provide these exclusive
                insights.
              </p>
            </div>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full px-6 pb-4"
        >
          <AccordionItem value="item-1" className="border-t">
            <AccordionTrigger className="text-base font-semibold text-primary">
              Relevant Insights
            </AccordionTrigger>
            <AccordionContent>
              <p className="whitespace-pre-line text-sm text-muted-foreground">
                {notifications.relevantNotifications}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b-0">
            <AccordionTrigger className="text-base font-semibold text-primary">
              Analyst&apos;s Reasoning
            </AccordionTrigger>
            <AccordionContent>
              <p className="whitespace-pre-line text-sm text-muted-foreground">
                {notifications.reasoning}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export const PersonalizedNotificationsSkeleton = () => {
  return (
    <div className="rounded-lg border bg-card shadow-lg">
       <div className="p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      <div className="w-full px-6 pb-4 space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
};

export default PersonalizedNotifications;
