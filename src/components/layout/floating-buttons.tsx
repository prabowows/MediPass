'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.48 1.34 5l-1.4 5.13 5.26-1.38c1.45.81 3.09 1.25 4.71 1.25h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.9-9.91-9.9zM17.16 14.2c-.28-.14-1.62-.79-1.87-.88-.25-.09-.43-.14-.62.14-.18.28-.71.88-.87 1.06-.16.18-.32.2-.6.11-.28-.09-1.19-.44-2.27-1.4-.84-.75-1.4-1.68-1.57-1.96-.16-.28-.01-.43.12-.56.12-.12.28-.32.42-.48.14-.16.18-.28.28-.47s.04-.37-.02-.51c-.07-.14-.62-1.49-.84-2.04-.23-.55-.46-.48-.62-.48-.16 0-.34 0-.52 0-.18 0-.48.07-.72.35-.24.28-.93.9-1.13 2.15-.2 1.25.75 2.63.85 2.81.1.18 1.63 2.48 3.96 3.49 2.33 1.01 2.33.67 2.76.61.43-.06 1.4-.57 1.6-1.1.2-.53.2-1 .14-1.1-.06-.11-.23-.17-.51-.31z" />
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
