'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  HeartPulse,
  Hospital,
  QrCode,
  Bell,
  Stethoscope,
  BriefcaseMedical,
  FlaskConical,
  PlayCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const features = [
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: 'Comprehensive Medical Resume',
    description:
      'A single, unified view of your entire medical history, from conditions to consultations.',
    imageId: 'feature-1',
  },
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: 'Personalized Notifications',
    description:
      'Receive AI-powered alerts for relevant health promotions, medication updates, and check-up reminders.',
    imageId: 'feature-2',
  },
  {
    icon: <QrCode className="h-8 w-8 text-primary" />,
    title: 'Instant QR Access',
    description:
      'Generate a secure QR code for hospitals to instantly access your medical resume in emergencies.',
    imageId: 'feature-3',
  },
  {
    icon: <Hospital className="h-8 w-8 text-primary" />,
    title: 'Seamless Hospital Integration',
    description:
      'Hospitals can scan your QR code to get up-to-date information, ensuring faster and safer care.',
    imageId: 'feature-4',
  },
];

const hospitalLogos = [
  {
    name: 'RS JIH Solo',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_gL0WBD--GHwPXXmDE87wbbAPrj5hTxwp_9SNWT4mCyv5eTd2JXh-Ond5GH3fFidBWU9q3Y7ICJ3vnvBlZA_ficXySGbcXImHdfPAvdK9bupLg6nO0oYrEDen_8-6s4N75PJxJost4ddT0RJYQ3fYEvOZNnLtdM0F6uWSteT4bXbNWXz0NgZNPAXq/s1692/rs%20jih%20solo.jpg',
  },
  {
    name: 'RS Kasih Ibu',
    image:
      'https://img.idxchannel.com/media/700/images/idx/2023/08/18/IMG-20230818-WA0030.jpg',
  },
  {
    name: 'RS PKU Muhammadiyah',
    image:
      'https://static.wikia.nocookie.net/logopedia/images/b/b6/Rumah_Sakit_PKU_Muhammadiyah_Bantul.png/revision/latest?cb=20191009161639',
  },
  {
    name: 'Mayapada Hospital',
    image:
      'https://images.seeklogo.com/logo-png/36/1/rs-mayapada-logo-png_seeklogo-369059.png',
  },
  {
    name: 'Siloam Hospitals',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/5/5e/Siloam_Hospitals.svg',
  },
  { name: 'General United', icon: <Stethoscope className="h-10 w-10" /> },
];

const LogoScroller = ({
  logos,
  direction = 'left',
}: {
  logos: (typeof hospitalLogos);
  direction?: 'left' | 'right';
}) => {
  const duplicatedLogos = [...logos, ...logos];
  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex animate-scroll"
        style={{
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="w-48 flex-shrink-0 px-4">
            <div className="flex h-24 items-center justify-center rounded-lg bg-muted p-4">
              {logo.image ? (
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={120}
                  height={60}
                  className="h-full w-auto object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  {logo.icon}
                  <p className="text-center text-xs font-medium text-muted-foreground">
                    {logo.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full bg-background pt-16 md:pt-20 lg:pt-24">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-6">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Your Health Story,
                <br />
                Smart, Simple & Secure.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                MediPass intelligently organizes your complete medical records
                and provides personalized AI insights, all in a single, secure
                digital passport.
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
                <Link href="/login">Hospital Portal</Link>
              </Button>
            </div>
          </div>
          <div className="relative flex w-full items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <div className="group relative w-full max-w-lg cursor-pointer overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3NTg4NjU0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Promotional video about MediPass"
                    width={600}
                    height={400}
                    data-ai-hint="healthcare technology"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="h-20 w-20 text-white/80 transition-all group-hover:scale-110 group-hover:text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-0">
                <DialogTitle className="sr-only">
                  MediPass Promotional Video
                </DialogTitle>
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/su-x3GMNLIo?autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-16">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Trusted by Leading Healthcare Providers
            </h3>
          </div>
          <div className="relative flex flex-col overflow-hidden">
            <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent"></div>
            <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent"></div>
            <LogoScroller logos={hospitalLogos} direction="left" />
            <LogoScroller
              logos={[...hospitalLogos].reverse()}
              direction="right"
            />
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-16 lg:py-20">
        <div className="container mx-auto space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Smarter Healthcare for Everyone
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                MediPass empowers both patients and healthcare providers with
                cutting-edge features designed for efficiency and peace of
                mind.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-2">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="h-full overflow-hidden transition-all hover:shadow-lg"
              >
                <CardHeader className="flex flex-row items-start gap-4">
                  {feature.icon}
                  <div className="grid gap-1">
                    <CardTitle className="font-headline text-xl">
                      {feature.title}
                    </CardTitle>
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
