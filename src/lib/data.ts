export type Patient = {
  id: string;
  name: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  medicalHistory: {
    conditions: { name: string; diagnosed: string }[];
    surgeries: { name:string; date: string }[];
    medications: { name: string; dosage: string; frequency: string }[];
    allergies: string[];
    vaccinations: { name: string; date: string }[];
  };
  consultationHistory: { date: string; doctor: string; hospital: string; reason: string; notes: string }[];
};

export const mainPatient: Patient = {
  id: 'pat-12345',
  name: 'Jane Doe',
  dob: '1985-05-22',
  gender: 'Female',
  bloodType: 'O+',
  contact: {
    phone: '+1 (555) 123-4567',
    email: 'jane.doe@email.com',
    address: '456 Oak Avenue, Springfield, USA',
  },
  emergencyContact: {
    name: 'John Doe',
    relation: 'Spouse',
    phone: '+1 (555) 987-6543',
  },
  medicalHistory: {
    conditions: [
      { name: 'Hypertension', diagnosed: '2020-01-15' },
      { name: 'Type 2 Diabetes', diagnosed: '2021-06-30' },
      { name: 'Asthma', diagnosed: '2005-09-10' },
    ],
    surgeries: [{ name: 'Appendectomy', date: '2012-03-20' }],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { name: 'Albuterol Inhaler', dosage: 'As needed', frequency: 'For asthma attacks' },
    ],
    allergies: ['Penicillin', 'Peanuts'],
    vaccinations: [
      { name: 'COVID-19 (Pfizer)', date: '2023-11-10' },
      { name: 'Flu Shot', date: '2023-10-05' },
    ],
  },
  consultationHistory: [
    {
      date: '2024-03-15',
      doctor: 'Dr. Emily Carter',
      hospital: 'Springfield General',
      reason: 'Annual Check-up',
      notes: 'Blood pressure and blood sugar levels are stable. Recommended continued medication and diet monitoring.',
    },
    {
      date: '2023-09-20',
      doctor: 'Dr. Ben Adams',
      hospital: 'Central Clinic',
      reason: 'Asthma follow-up',
      notes: 'Prescribed a new controller inhaler.',
    },
  ],
};

export const hospitalPromotions = `
- Get a 20% discount on comprehensive heart check-up packages. Valid until the end of the month.
- Free dental consultation with any general health screening.
- Special package for diabetes management and consultation, including a free glucose meter.
- 50% off on allergy testing panels for the month of July.
`;

export const medicationUpdates = `
- Recall Notice: A specific batch of BrandX Lisinopril has been recalled due to potential contamination. Patients are advised to check their batch number.
- New Study: Recent findings suggest that long-term Metformin use may be linked to Vitamin B12 deficiency. Patients are advised to discuss monitoring with their doctor.
- Price Drop: The generic version of a popular cholesterol medication is now available at a lower price.
`;

export const patientMedicalHistory = JSON.stringify(mainPatient.medicalHistory, null, 2);

export const hospitalPatientHistory = [
    {
        id: 'pat-12345',
        name: 'Jane Doe',
        lastVisit: '2024-03-15',
        reason: 'Annual Check-up',
        status: 'Discharged'
    },
    {
        id: 'pat-67890',
        name: 'Robert Smith',
        lastVisit: '2024-02-28',
        reason: 'Broken Arm',
        status: 'Discharged'
    },
    {
        id: 'pat-13579',
        name: 'Maria Garcia',
        lastVisit: '2024-01-10',
        reason: 'Flu-like symptoms',
        status: 'Discharged'
    },
];
