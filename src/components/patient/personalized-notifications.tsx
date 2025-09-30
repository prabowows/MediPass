'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BrainCircuit, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { PersonalizedNotificationsOutput } from '@/ai/flows/personalized-notifications';

const PersonalizedNotifications = () => {
  const notifications: PersonalizedNotificationsOutput | null = {
    relevantNotifications: `You have several important notifications. For promotions, consider taking advantage of a 20% discount on comprehensive heart check-up packages, as you have a history of hypertension. There is also a special package for diabetes management and consultation, including a free glucose meter, which is highly relevant to your Type 2 Diabetes. Additionally, you may be interested in 50% off on allergy testing panels due to your listed allergies. Regarding medication updates, please check your batch number for a BrandX Lisinopril recall notice, as you are prescribed Lisinopril. A new study suggests a link between long-term Metformin use and Vitamin B12 deficiency, which you should discuss with your doctor. Finally, a generic version of a popular cholesterol medication, similar to your Atorvastatin, is now available at a lower price.`,
    reasoning: `The notifications were selected based on your specific health profile:
- The heart check-up promotion is relevant due to your diagnosis of Hypertension.
- The diabetes package is directly applicable to your Type 2 Diabetes condition.
- The allergy testing discount is suggested because you have multiple listed allergies.
- The Lisinopril recall is critical as it's a medication you are currently taking.
- The Metformin-B12 deficiency link is important for your long-term health management.
- The generic medication update could offer cost savings on your cholesterol treatment.`
  };

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
      <div 
        className="rounded-lg shadow-lg transition-all hover:shadow-xl text-white"
        style={{ backgroundColor: '#2596be' }}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <BrainCircuit className="h-6 w-6 text-white"/>
            </div>
            <div className="flex-1">
              <h3 className="font-headline text-lg font-semibold">
                Curated For You
              </h3>
              <p className="text-sm text-white/80">
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
          <AccordionItem value="item-1" className="border-t border-white/30">
            <AccordionTrigger className="text-base font-semibold text-white hover:no-underline">
              Relevant Insights
            </AccordionTrigger>
            <AccordionContent>
              <p className="whitespace-pre-line text-sm text-white/80">
                {notifications.relevantNotifications}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b-0 border-white/30">
            <AccordionTrigger className="text-base font-semibold text-white hover:no-underline">
              Analyst's Reasoning
            </AccordionTrigger>
            <AccordionContent>
              <p className="whitespace-pre-line text-sm text-white/80">
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
