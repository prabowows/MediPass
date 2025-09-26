
import Image from 'next/image';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import type { Patient } from '@/lib/data';

interface ConsultationTimelineProps {
  consultations: Patient['consultationHistory'];
}

export default function ConsultationTimeline({ consultations }: ConsultationTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 h-full w-0.5 bg-border -translate-x-1/2" />

      <div className="space-y-12">
        {consultations.map((consult, index) => (
          <div key={index} className="relative flex items-start gap-6">
            {/* Dot on the timeline */}
            <div className="relative z-10 flex h-12 w-12 items-center justify-center">
              <div className="absolute h-full w-full rounded-full bg-background"></div>
              <Image
                src={consult.doctor.image}
                alt={consult.doctor.name}
                width={48}
                height={48}
                data-ai-hint={consult.doctor.imageHint}
                className="relative rounded-full border-2 border-primary"
              />
            </div>
            
            <div className="flex-1 space-y-2 pt-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{consult.doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{consult.doctor.specialty}</p>
                </div>
                <time className="text-sm text-muted-foreground">{format(new Date(consult.date), 'MMMM d, yyyy')}</time>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold">{consult.reason}</h4>
                    <Badge variant="outline">{consult.hospital}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {consult.notes}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
