
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
  XCircle,
  CheckCircle2,
  Database,
  ShieldCheck,
  Search,
  LogIn,
  LightbulbOff,
  BrainCircuit
} from 'lucide-react';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    name: 'RS Sentosa Bogor',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjT-WGpvy0OJ0H1sRrPLlNHFTDahAf_pKs9D9LegcYJlh_amvADDyqx1S1aBGoH2GQU4JMpqGmDpAJmnHoVlTh6omGDOZq6MUFBHixLGm5kEFife_unSztT6J2HhGLQ92JZ07nooFV_OleRqARvG4VFOaoV_eZ6bDDhbh7GBpOInZ_mBL-FECLrB_os/w420-h280-p-k-no-nu/rs%20sentosa%20bogor.jpg',
  },
  {
    name: 'RS Sentosa Bogor',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjT-WGpvy0OJ0H1sRrPLlNHFTDahAf_pKs9D9LegcYJlh_amvADDyqx1S1aBGoH2GQU4JMpqGmDpAJmnHoVlTh6omGDOZq6MUFBHixLGm5kEFife_unSztT6J2HhGLQ92JZ07nooFV_OleRqARvG4VFOaoV_eZ6bDDhbh7GBpOInZ_mBL-FECLrB_os/w420-h280-p-k-no-nu/rs%20sentosa%20bogor.jpg',
  },
  {
    name: 'RS Sansani',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQBwiznd2zVnCEzErilRGGCp6h-Yk4AGpW49t_PQwd277Gy-UXSThVWptJpUUMquJcVgYau3mBI4TrVwFyxkK0kVNoc2qI6wv3f7qvNRkTZ0Ec6pJKvTpIF8dLiiUav6gsJA19rqqWNhJPNCsFqlcyPKpTu_VNEu20Uor4mcAYgI-GBz0JNlO9xwkJ/w420-h280-p-k-no-nu/rs%20sansani.jpg',
  },
  {
    name: 'RS Hasyim Asyari',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsd-IKDdGs9iHH0InsJw8LZ8wACIrmT51jxWZLHdrmWH7ophM_jbbLDJHfGvZ-CF7sShtoPRMY4YfAyCqROCmNFotDpoMODgU61nuswfboRBvFZ1HZTbLCT6Xe7M52tMOy7YSogXWyeToxye8yOYr6kCT439BeK_cQ8N5HYYzkChzkJGqHvZHqH9qF/w420-h280-p-k-no-nu/rs%20HASYIM%20ASYARI.jpg',
  },
  {
    name: 'RS Paramedika Bekasi',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitB_INiDQG-0VuIcza7zNq-JRlYo_Je6wAlhDRxPHnGtZfzlsGATT_oj2K7st7oq7B2NDPI4cWm_dzaN6K9pDESbVFSJKsGvSK0Bdzcg9PfKuLBNzZ5eD-IM374EK_XJfpMgze9KsN-qlHYeD_3mzeQZ7b7Tn6BcZFsNqRBKVL65ty3T338DjP_YNEGDs/w420-h280-p-k-no-nu/logo%20RUMAH%20SAKIT%20paramedika%20bekasi.jpg',
  },
  {
    name: 'RS JIH Solo',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_gL0WBD--GHwPXXmDE87wbbAPrj5hTxwp_9SNWT4mCyv5eTd2JXh-Ond5GH3fFidBWU9q3Y7ICJ3vnvBlZA_ficXySGbcXImHdfPAvdK9bupLg6nO0oYrEDen_8-6s4N75PJxJost4ddT0RJYQ3fYEvOZNnLtdM0F6uWSteT4bXbNWXz0NgZNPAXq/w420-h280-p-k-no-nu/rs%20jih%20solo.jpg',
  },
  {
    name: 'RS Mitra Husada',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjy_ZCSsQHIEITz0h7_QcHUX_6cL-1cBCdR9Ki4n7MYmwqpawkFyAe9jqg-13Py8QNa3QxP0RkwL9zr--j7w98beWiyFDLxQOXRwi4UCnIZFdot6uJl5h7qL9SwraDXPkeFP4_zldEvTEwWGyk1mO7_EolHGxvhHo-jw0BBoBFv5MctznHEvHYXnPpE/w420-h280-p-k-no-nu/rs%20mitra%20husdad.jpg',
  },
  {
    name: 'RS Sumber Hurip',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgg_xxL_rJ_ifVl0dESUmgYwa7WEAo7x3SUMvwikPkC2jagItOM-51p67p4nfHeJLOT89OJyeGw-psjjHK6l2XLPdsPHsVzfYOGtgB-yRg8Nj1JhpU6i_kgnxEH0-Kgs7H1hTbBdz3-gAZ64wU0W6dWAfdIsNVMcUj0sv3p21GmK6Kftb0G7BoJ7e2Y/w420-h280-p-k-no-nu/rs%20sumber%20hurip.jpg',
  },
  {
    name: 'RS Tugu Ibu',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5Ru5E-OsPQ6sifkyNNynJBwayQNi7SQYotAgdjbrzgF1RgoojdpDQHNGkObJMkvqjzV2aOg1-wl_9YCUjBLDevc6c9Sc6P2Up0wkipyR5m_9_iLiCp7gBPwDsynwLWxm473hubhK0bc4_Ppb8Wbwy1atEoongL_L3RmiKgFLqTKyJytpa0l9gKp2T/w420-h280-p-k-no-nu/1%20rs%20tugu%20ibu.jpg',
  },
  {
    name: 'RS Surya Insani',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7zKOI2KnBdoPzuG4hRfHFdGvlUSU6BqlIhOvLsmbxxjbVzmMlxsuZwAE7ebGXcklhCtKmz8vK2AInXOxhc7HT4gmj2KXJGtBPe3M6Gf4fpKqeq2R14k-htbqykVVQVpopOK6OjM7KTpYuyH9XPDtagexPbtdYc7XQsUocUt1DLRLpj0xYAOsoJEXI/w420-h280-p-k-no-nu/rs%20surya%20insani.jpg',
  },
];

const testimonials = [
  {
    name: 'Sarah L.',
    title: 'MediPass User',
    avatar: 'https://picsum.photos/seed/patient-1/200/200',
    avatarHint: 'smiling woman',
    quote:
      '“MediPass has been a lifesaver. It simplifies managing my entire medical history. When I need to share my records with a new doctor, everything is instantly accessible from the app—my conditions, past consultations, and medication list. It\'s incredibly convenient and gives me peace of mind.”',
  },
  {
    name: 'Dr. Johnathan Lee',
    title: 'General Practitioner',
    avatar: 'https://picsum.photos/seed/doctor-1/200/200',
    avatarHint: 'male doctor',
    quote:
      '“As a physician, getting a complete patient history quickly is crucial, especially in emergencies. MediPass\'s QR code system gives me instant access to verified medical data, allowing me to make faster, more informed decisions. It’s a huge step forward for patient safety and continuity of care.”',
  },
  {
    name: 'Mark T.',
    title: 'Caregiver for Parent',
    avatar: 'https://picsum.photos/seed/caregiver-1/200/200',
    avatarHint: 'middle-aged man',
    quote:
      '“Managing my elderly father\'s health was a constant challenge, with records scattered across multiple clinics. MediPass consolidated everything into one place. The AI notifications for medication reminders and relevant health tips are invaluable. It has truly empowered me as a caregiver.”',
  },
  {
    name: 'Maria G.',
    title: 'Hospital Administrator',
    avatar: 'https://picsum.photos/seed/admin-1/200/200',
    avatarHint: 'woman administrator',
    quote:
      '“Integrating MediPass into our workflow has been seamless. The QR code system dramatically reduces patient check-in times and minimizes administrative errors. Our staff can access vital information instantly, leading to more efficient and safer patient care. It’s a win-win for both the hospital and our patients.”',
  },
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
          <div key={index} className="w-40 flex-shrink-0">
            <div className="flex h-24 items-center justify-center rounded-lg">
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
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col">
      <section className="w-full bg-white pt-16 md:pt-20 lg:pt-24">
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
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/login">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </Link>
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

      <section className="w-full bg-white py-12 md:py-16">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Trusted by Leading Healthcare Providers
            </h3>
          </div>
          <div className="relative flex flex-col overflow-hidden">
            <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent"></div>
            <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent"></div>
            <LogoScroller logos={hospitalLogos} direction="left" />
            <LogoScroller
              logos={[...hospitalLogos].reverse()}
              direction="right"
            />
          </div>
        </div>
      </section>

      <section id="features" className="w-full bg-white pt-0 pb-12 md:pb-16 lg:pb-20">
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
          <div className="mx-auto grid items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4">
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

      <section className="w-full bg-white pb-12 md:pb-20 lg:pb-24">
        <div className="container mx-auto">
          <Tabs defaultValue="with" className="w-full">
            <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="with">With MediPass</TabsTrigger>
              <TabsTrigger value="without">Without MediPass</TabsTrigger>
            </TabsList>
            <TabsContent value="without" className="mt-10">
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                <div className="order-2 md:order-1">
                  <h3 className="mb-6 font-headline text-3xl font-bold">
                    Scattered Data, Difficult Access
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <XCircle className="mt-1 h-6 w-6 flex-shrink-0 text-destructive" />
                      <div>
                        <h4 className="font-semibold">Fragmented Documents</h4>
                        <p className="text-muted-foreground">
                          Administration slows down due to searching for physical documents. Data is also prone to loss or damage.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <XCircle className="mt-1 h-6 w-6 flex-shrink-0 text-destructive" />
                      <div>
                        <h4 className="font-semibold">
                          Information is Dispersed
                        </h4>
                        <p className="text-muted-foreground">
                          Medical history is spread across various hospitals and is difficult to consolidate into a single, comprehensive view.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <LightbulbOff className="mt-1 h-6 w-6 flex-shrink-0 text-destructive" />
                      <div>
                        <h4 className="font-semibold">
                          No Proactive Insights
                        </h4>
                        <p className="text-muted-foreground">
                          You receive generic health information that may not apply to your specific conditions or medications, leading to missed opportunities.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <Card className="overflow-hidden shadow-lg">
                    <Image
                      src="https://www.talenta.co/wp-content/uploads/2022/02/img-ilustrasi-5.png"
                      alt="Illustration of scattered medical data issues"
                      width={600}
                      height={400}
                      data-ai-hint="confused person cluttered desk"
                      className="mx-auto"
                    />
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="with" className="mt-10">
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                <div className="[perspective:1000px] group">
                  <Card className="overflow-hidden shadow-lg transition-transform duration-500 group-hover:rotate-y-0 [transform:rotateY(-15deg)]">
                    <Image
                      src="https://gcdnb.pbrd.co/images/atESRyGJUcWp.jpg?o=1"
                      alt="Illustration of organized medical data with MediPass"
                      width={600}
                      height={400}
                      data-ai-hint="organized data digital health"
                      className="mx-auto"
                    />
                  </Card>
                </div>
                <div className="">
                  <h3 className="mb-6 font-headline text-3xl font-bold">
                    Centralized Data, Easy Access
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                      <div>
                        <h4 className="font-semibold">
                          Centralized Medical Resume
                        </h4>
                        <p className="text-muted-foreground">
                          All your medical history, from allergies to consultation history, is gathered in one digital platform.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                      <div>
                        <h4 className="font-semibold">
                          Quick Access with QR Code
                        </h4>
                        <p className="text-muted-foreground">
                          Medical staff can access your data quickly and securely just by scanning a QR code, which is vital in emergencies.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <BrainCircuit className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                      <div>
                        <h4 className="font-semibold">
                          Personalized AI Insights
                        </h4>
                        <p className="text-muted-foreground">
                          Receive intelligent notifications about health promotions, medication updates, and recommendations relevant to your profile.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Hear from real patients and doctors who have transformed their healthcare experience.
            </p>
          </div>
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="bg-white p-6 md:p-8 flex flex-col h-full">
                      <CardContent className="flex flex-col items-center text-center flex-1 p-0">
                        <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <p className="text-base italic text-foreground mb-4">
                          {testimonial.quote}
                        </p>
                      </CardContent>
                      <div className="mt-auto text-center">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}

    
    

    

    
