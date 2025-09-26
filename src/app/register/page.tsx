'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Hospital } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

const RegisterForm = ({ userType }: { userType: 'Patient' | 'Hospital' }) => (
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor={`${userType.toLowerCase()}-name`}>{userType === 'Patient' ? 'Full Name' : 'Hospital Name'}</Label>
      <Input id={`${userType.toLowerCase()}-name`} placeholder={userType === 'Patient' ? 'John Doe' : 'General Hospital'} required />
    </div>
    <div className="space-y-2">
      <Label htmlFor={`${userType.toLowerCase()}-email`}>Email</Label>
      <Input
        id={`${userType.toLowerCase()}-email`}
        type="email"
        placeholder="m@example.com"
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor={`${userType.toLowerCase()}-password`}>Password</Label>
      <Input id={`${userType.toLowerCase()}-password`} type="password" required />
    </div>
  </CardContent>
);

export default function RegisterPage() {
  const { login } = useAuth();

  const handleRegister = (userType: 'Patient' | 'Hospital', path: string) => {
    login(userType, path);
  }

  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <Tabs defaultValue="patient" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="patient">
            <User className="mr-2 h-4 w-4" />
            Patient
          </TabsTrigger>
          <TabsTrigger value="hospital">
            <Hospital className="mr-2 h-4 w-4" />
            Hospital
          </TabsTrigger>
        </TabsList>
        <TabsContent value="patient">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">Create Patient Account</CardTitle>
              <CardDescription>
                Start your journey to organized health records.
              </CardDescription>
            </CardHeader>
            <RegisterForm userType="Patient" />
            <CardFooter className="flex-col gap-4">
              <Button className="w-full" onClick={() => handleRegister('Patient', '/patient/dashboard')}>Create Account</Button>
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="hospital">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">Register Hospital</CardTitle>
              <CardDescription>
                Join the network to provide seamless care.
              </CardDescription>
            </CardHeader>
            <RegisterForm userType="Hospital" />
            <CardFooter className="flex-col gap-4">
              <Button className="w-full" onClick={() => handleRegister('Hospital', '/hospital/dashboard')}>Register Hospital</Button>
              <div className="text-center text-sm">
                Already registered?{' '}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
