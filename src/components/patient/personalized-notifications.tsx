import { personalizedNotifications } from '@/ai/flows/personalized-notifications';
import {
  patientMedicalHistory,
  hospitalPromotions,
  medicationUpdates,
} from '@/lib/data';
import { AlertCircle, Info } from 'lucide-react';

export default async function PersonalizedNotifications() {
  const notifications = await personalizedNotifications({
    patientMedicalHistory,
    hospitalPromotions,
    medicationUpdates,
  });

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-300 bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">{notifications.relevantNotifications}</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-amber-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">AI-Powered Reasoning</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>{notifications.reasoning}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
