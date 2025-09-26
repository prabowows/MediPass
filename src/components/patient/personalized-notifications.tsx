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

export default async function PersonalizedNotifications() {
  const notifications = await personalizedNotifications({
    patientMedicalHistory,
    hospitalPromotions,
    medicationUpdates,
  });

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
                Our AI has analyzed your health data to provide these exclusive insights.
              </p>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible defaultValue="item-1" className="w-full px-6 pb-4">
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
              Analyst's Reasoning
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
}
