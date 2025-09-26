
'use client';

import { useMemo } from 'react';
import type { Patient } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { format, parseISO, isSameDay } from 'date-fns';
import { Stethoscope, Syringe, Scissors, CalendarOff } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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

interface MedicalEventDetailsProps {
    patient: Patient;
    selectedDate: Date | undefined;
}

export default function MedicalEventDetails({ patient, selectedDate }: MedicalEventDetailsProps) {

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


    const eventsForSelectedDate = selectedDate
    ? medicalEvents.filter(event => isSameDay(event.date, selectedDate))
    : [];

    if (!selectedDate || eventsForSelectedDate.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed bg-card p-8">
                <CalendarOff className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Events</h3>
                <p className="mt-1 text-center text-sm text-muted-foreground">
                    No medical events recorded for this day, or no date selected.
                </p>
            </div>
        );
    }


    return (
        <div className="h-full rounded-md border bg-card p-4">
            <h3 className="font-headline text-lg font-semibold mb-4">
                Events for {format(selectedDate, 'PPP')}
            </h3>
            <ScrollArea className="h-[calc(100%-40px)]">
                <div className="grid gap-4 pr-4">
                    {eventsForSelectedDate.map((event, index) => (
                    <div key={index} className="space-y-2 rounded-lg border p-4">
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
            </ScrollArea>
        </div>
    );
}
