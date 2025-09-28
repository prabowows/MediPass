'use client';

import Link from 'next/link';
import { Menu, LogOut } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

const navLinks = [
  { href: '/', label: 'Home', requiredAuth: false },
  { href: '/patient/dashboard', label: 'Patient Dashboard', requiredAuth: true, userType: 'Patient' },
  { href: '/hospital/dashboard', label: 'Hospital Dashboard', requiredAuth: true, userType: 'Hospital' },
  { href: '/contact', label: 'Contact Us', requiredAuth: false },
];

const Header = () => {
  const pathname = usePathname();
  const { isLoggedIn, userType, logout } = useAuth();

  const getVisibleNavLinks = () => {
    if (isLoggedIn) {
        return navLinks.filter(link => link.requiredAuth && link.userType === userType);
    }
    return navLinks.filter(link => !link.requiredAuth);
  };

  const visibleNavLinks = getVisibleNavLinks();

  const renderNavLinks = (isMobile = false) =>
    visibleNavLinks.map((link) => {
      const isActive = pathname === link.href;
      
      const linkEl = (
        <Link
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            isActive ? 'text-primary' : 'text-muted-foreground',
            isMobile && 'block py-2 text-lg'
          )}
        >
          {link.label}
        </Link>
      );

      if (isMobile) {
        return (
          <SheetClose key={link.href} asChild>
            {linkEl}
          </SheetClose>
        );
      }
      return (
        <div key={link.href}>
          {linkEl}
        </div>
      );

    });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline font-bold">MediPass</span>
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          {renderNavLinks()}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {!isLoggedIn ? (
            <>
              {/* Login and Register buttons removed as they are on the main page hero */}
            </>
          ) : (
             <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="grid gap-4 py-6">
                <Link href="/" className="mb-4 flex items-center space-x-2">
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="font-headline font-bold">MediPass</span>
                </Link>
                {renderNavLinks(true)}
                 {isLoggedIn && (
                  <>
                    <Button variant="ghost" onClick={() => {
                      logout();
                      // We might need to manually close the sheet on mobile
                      // Depending on SheetClose behavior
                    }}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
