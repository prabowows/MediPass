import Link from 'next/link';
import {
  ArrowRight,
  HeartPulse,
  Hospital,
  QrCode,
  Bell,
  Activity,
  Pill,
  ShieldAlert,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Hero3D from '@/components/home/hero-3d';

const features = [
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: 'Comprehensive Medical Resume',
    description: 'A single, unified view of your entire medical history, from conditions to consultations.',
    image: PlaceHolderImages.find(img => img.id === 'feature-1'),
  },
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: 'Personalized Notifications',
    description:
      'Receive AI-powered alerts for relevant health promotions, medication updates, and check-up reminders.',
    image: PlaceHolderImages.find(img => img.id === 'feature-2'),
  },
  {
    icon: <QrCode className="h-8 w-8 text-primary" />,
    title: 'Instant QR Access',
    description:
      'Generate a secure QR code for hospitals to instantly access your medical resume in emergencies.',
    image: PlaceHolderImages.find(img => img.id === 'feature-3'),
  },
  {
    icon: <Hospital className="h-8 w-8 text-primary" />,
    title: 'Seamless Hospital Integration',
    description:
      'Hospitals can scan your QR code to get up-to-date information, ensuring faster and safer care.',
    image: PlaceHolderImages.find(img => img.id === 'feature-4'),
  },
];

const IconCard = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <Card className="absolute animate-fade-in-up backdrop-blur-sm bg-white/30">
    <CardContent className="p-3">
      <div className="flex flex-col items-center gap-2">
        {icon}
        <span className="text-xs font-semibold">{label}</span>
      </div>
    </CardContent>
  </Card>
);

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full bg-background pt-16 md:pt-24 lg:pt-32">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-6">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Your Health Story,
                <br />
                Simplified & Secure.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                MediPassport organizes your complete medical records into a
                single, secure digital passport. Share your history instantly
                with any hospital, anytime.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/register">
                  Register as a Patient
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/login">
                  Hospital Portal
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative flex h-[300px] w-full items-center justify-center md:h-[400px]">
            <Hero3D />
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Smarter Healthcare for Everyone
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                MediPassport empowers both patients and healthcare providers with
                cutting-edge features designed for efficiency and peace of mind.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="flex flex-row items-start gap-4">
                  {feature.icon}
                  <div className="grid gap-1">
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
