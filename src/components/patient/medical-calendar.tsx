'use client';

import { useState, useMemo } from 'react';
import type { Patient } from '@/lib/data';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format, parseISO, isSameDay } from 'date-fns';
import { Stethoscope, Syringe, Scissors } from 'lucide-react';

type MedicalEvent = {
  date: Date;
  type: 'Consultation' | 'Surgery' | 'Vaccination';
  title: string;
  details: any;
};

const EventIcon = ({ type }: { type: MedicalEvent['type'] }) => {
    switch (type) {
        case 'Consultation':
            return <Stethoscope className="h-4 w-4 mr-2" />;
        case 'Surgery':
            return <Scissors className="h-4 w-4 mr-2" />;
        case 'Vaccination':
            return <Syringe className="h-4 w-4 mr-2" />;
        default:
            return null;
    }
};


export default function MedicalCalendar({ patient }: { patient: Patient }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const medicalEvents = useMemo(() => {
    const events: MedicalEvent[] = [];
    patient.consultationHistory.forEach(item =>
      events.push({
        date: parseISO(item.date),
        type: 'Consultation',
        title: item.reason,
        details: item,
      })
    );
    patient.medicalHistory.surgeries.forEach(item =>
      events.push({
        date: parseISO(item.date),
        type: 'Surgery',
        title: item.name,
        details: item,
      })
    );
     patient.medicalHistory.vaccinations.forEach(item =>
      events.push({
        date: parseISO(item.date),
        type: 'Vaccination',
        title: item.name,
        details: item,
      })
    );
    return events;
  }, [patient]);

  const highlightedDays = medicalEvents.map(event => event.date);

  const eventsForSelectedDate = selectedDate
    ? medicalEvents.filter(event => isSameDay(event.date, selectedDate))
    : [];

  const handleDayClick = (day: Date) => {
    const eventsOnDay = medicalEvents.some(event => isSameDay(event.date, day));
    if (eventsOnDay) {
      setSelectedDate(day);
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <Calendar
        mode="single"
        onDayClick={handleDayClick}
        modifiers={{ highlighted: highlightedDays }}
        modifiersClassNames={{
          highlighted: 'bg-primary/20 text-primary-foreground rounded-full',
        }}
        className="rounded-md border"
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Medical Events for {selectedDate ? format(selectedDate, 'PPP') : ''}
            </DialogTitle>
            <DialogDescription>
                Details of medical events that occurred on this day.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {eventsForSelectedDate.map((event, index) => (
              <div key={index} className="p-4 rounded-md border space-y-2">
                <div className="flex items-center">
                  <EventIcon type={event.type} />
                  <h4 className="font-semibold">{event.title}</h4>
                   <Badge variant="outline" className="ml-auto">{event.type}</Badge>
                </div>
                {event.type === 'Consultation' && (
                    <>
                        <p className="text-sm text-muted-foreground">
                            {event.details.hospital} - Dr. {event.details.doctor}
                        </p>
                        <p className="text-sm">{event.details.notes}</p>
                    </>
                )}
                 {event.type === 'Surgery' && (
                    <p className="text-sm text-muted-foreground">
                       Performed at {event.details.hospital || 'Unknown Hospital'}.
                    </p>
                )}
                 {event.type === 'Vaccination' && (
                    <p className="text-sm text-muted-foreground">
                      Administered on this date.
                    </p>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
