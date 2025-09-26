
export type Condition = {
  name: string;
  diagnosed: string;
  measurements?: { date: string; value: number | { systolic: number, diastolic: number } }[];
};

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
    conditions: Condition[];
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
      { 
        name: 'Hypertension', 
        diagnosed: '2020-01-15',
        measurements: [
          { date: '2024-01-10', value: { systolic: 145, diastolic: 92 } },
          { date: '2024-02-08', value: { systolic: 142, diastolic: 90 } },
          { date: '2024-03-15', value: { systolic: 138, diastolic: 88 } },
          { date: '2024-04-12', value: { systolic: 135, diastolic: 85 } },
          { date: '2024-05-20', value: { systolic: 130, diastolic: 84 } },
          { date: '2024-06-18', value: { systolic: 128, diastolic: 82 } },
        ]
      },
      { 
        name: 'Type 2 Diabetes', 
        diagnosed: '2021-06-30',
        measurements: [
          { date: '2024-01-15', value: 160 },
          { date: '2024-02-12', value: 155 },
          { date: '2024-03-18', value: 152 },
          { date: '2024-04-20', value: 148 },
          { date: '2024-05-25', value: 145 },
          { date: '2024-06-22', value: 140 },
        ]
      },
      { name: 'Asthma', diagnosed: '2005-09-10' },
      { name: 'Gastroesophageal Reflux Disease (GERD)', diagnosed: '2018-05-20' },
    ],
    surgeries: [
        { name: 'Appendectomy', date: '2012-03-20' },
        { name: 'Knee Arthroscopy', date: '2019-11-05' }
    ],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { name: 'Albuterol Inhaler', dosage: 'As needed', frequency: 'For asthma attacks' },
      { name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily' },
      { name: 'Ibuprofen', dosage: '200mg', frequency: 'As needed for pain' },
    ],
    allergies: ['Penicillin', 'Peanuts', 'Dust Mites', 'Shellfish'],
    vaccinations: [
      { name: 'COVID-19 (Pfizer)', date: '2023-11-10' },
      { name: 'Flu Shot', date: '2023-10-05' },
      { name: 'Tetanus (Tdap)', date: '2021-08-15' },
      { name: 'Hepatitis B', date: '2003-06-01' },
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
      notes: 'Prescribed a new controller inhaler. Patient reports improved breathing.',
    },
     {
      date: '2023-05-10',
      doctor: 'Dr. Sarah Lee',
      hospital: 'Springfield General',
      reason: 'Gastroenterology Consultation',
      notes: 'Discussed management of GERD symptoms. Advised lifestyle changes and continuing Omeprazole.',
    },
    {
      date: '2022-11-22',
      doctor: 'Dr. Michael Chen',
      hospital: 'OrthoCare Hospital',
      reason: 'Post-Op Knee Follow-up',
      notes: 'Patient shows good recovery from arthroscopy. Recommended physical therapy.',
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
    {
        id: 'pat-24680',
        name: 'David Wilson',
        lastVisit: '2023-12-05',
        reason: 'Minor Surgery',
        status: 'Discharged'
    },
    {
        id: 'pat-97531',
        name: 'Linda Johnson',
        lastVisit: '2023-11-18',
        reason: 'Allergy Testing',
        status: 'Discharged'
    },
];
