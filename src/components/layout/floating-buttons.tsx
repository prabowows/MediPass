'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    fill="currentColor"
  >
    <path
      d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.044-.53-.044-.315 0-.765.11-1.057.332-.29.22-.99.945-.99 2.396s1.01 2.77 1.13 2.947c.12.177 1.485 2.572 3.61 3.587 2.123 1.016 2.48.973 2.875.93.398-.043 1.25-.512 1.424-1.288.175-.777.175-1.438.118-1.565-.058-.128-.214-.174-.48-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05.006c-6.55 0-11.885 5.335-11.885 11.884 0 2.162.57 4.295 1.693 6.155L.004 32l8.2-2.154a11.86 11.86 0 0 0 5.683 1.448h.005c6.55 0 11.885-5.335 11.885-11.884a11.854 11.854 0 0 0-3.415-8.413Z"
    />
  </svg>
);


export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  
  const phoneNumber = "6281234567890";
  const message = "Hello! I have a question about MediPass.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
        <Button
            size="icon"
            className={cn(
            'rounded-full h-12 w-12 bg-primary text-primary-foreground shadow-lg transition-opacity hover:bg-primary/90',
            isVisible ? 'opacity-100' : 'opacity-0'
            )}
            onClick={scrollToTop}
        >
            <ArrowUp className="h-6 w-6" />
            <span className="sr-only">Go to top</span>
        </Button>

         <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild size="icon" className="h-14 w-14 rounded-full shadow-lg" style={{backgroundColor: '#25D366', color: 'white'}}>
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-8 w-8"/>
                <span className="sr-only">Contact on WhatsApp</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            Contact us on WhatsApp
          </TooltipContent>
        </Tooltip>

      </div>
    </TooltipProvider>
  );
}
