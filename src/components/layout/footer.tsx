import Link from 'next/link';
import Logo from '@/components/icons/logo';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <p className="font-headline text-lg font-semibold">MediPassport</p>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} MediPassport. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="/contact"
            className="text-sm hover:underline underline-offset-4"
          >
            Contact
          </Link>
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
