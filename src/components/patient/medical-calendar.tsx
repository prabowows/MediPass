
'use client';

import { useMemo } from 'react';
import type { Patient } from '@/lib/data';
import { Calendar } from '@/components/ui/calendar';
import { parseISO, isSameDay } from 'date-fns';

type MedicalEvent = {
  date: Date;
  type: 'Consultation' | 'Surgery' | 'Vaccination';
  title: string;
  details: any;
};

interface MedicalCalendarProps {
    patient: Patient;
    selectedDate: Date | undefined;
    onDateSelect: (date: Date | undefined) => void;
}

export default function MedicalCalendar({ patient, selectedDate, onDateSelect }: MedicalCalendarProps) {

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

  const handleDayClick = (day: Date) => {
    const eventsOnDay = medicalEvents.some(event => isSameDay(event.date, day));
    if (eventsOnDay) {
      onDateSelect(day);
    } else {
        onDateSelect(undefined);
    }
  };

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onDayClick={handleDayClick}
      modifiers={{ highlighted: highlightedDays }}
      modifiersClassNames={{
        highlighted: 'bg-[#63a3b2] text-primary-foreground rounded-md',
      }}
      className="rounded-md border w-full"
    />
  );
}
