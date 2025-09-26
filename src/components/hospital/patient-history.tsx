import Link from 'next/link';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type PatientHistoryEntry = {
  id: string;
  name: string;
  lastVisit: string;
  reason: string;
  status: string;
};

interface PatientHistoryProps {
  patients: PatientHistoryEntry[];
}

const PatientHistory = ({ patients }: PatientHistoryProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead className="hidden md:table-cell">Reason</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{format(new Date(patient.lastVisit), 'PPP')}</TableCell>
              <TableCell className="hidden md:table-cell">{patient.reason}</TableCell>
              <TableCell className="text-right">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/hospital/patient/${patient.id}`}>
                    View Record
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientHistory;
