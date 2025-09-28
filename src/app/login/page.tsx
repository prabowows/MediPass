
'use client';

import Link from 'next/link';
import { useState } from 'react';
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
import { User, Hospital, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

const LoginForm = ({ userType }: { userType: 'Patient' | 'Hospital' }) => (
  <CardContent className="space-y-4">
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

export default function LoginPage() {
  const { login } = useAuth();
  const [isPatientLoading, setIsPatientLoading] = useState(false);
  const [isHospitalLoading, setIsHospitalLoading] = useState(false);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>, userType: 'Patient' | 'Hospital', path: string) => {
    e.preventDefault();
    if (userType === 'Patient') {
      setIsPatientLoading(true);
    } else {
      setIsHospitalLoading(true);
    }
    
    await login(userType, path);
    // No need to set loading to false as we will be redirected.
  }

  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <Tabs defaultValue="hospital" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hospital">
            <Hospital className="mr-2 h-4 w-4" />
            Hospital
          </TabsTrigger>
          <TabsTrigger value="patient">
            <User className="mr-2 h-4 w-4" />
            Patient
          </TabsTrigger>
        </TabsList>
        <TabsContent value="hospital">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">Hospital Login</CardTitle>
              <CardDescription>
                Access the hospital portal to view patient records.
              </CardDescription>
            </CardHeader>
            <LoginForm userType="Hospital" />
            <CardFooter className="flex-col gap-4">
              <Button className="w-full" onClick={(e) => handleLogin(e, 'Hospital', '/hospital/dashboard')} disabled={isHospitalLoading}>
                {isHospitalLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
              <div className="text-center text-sm">
                Need to register your hospital?{' '}
                <Link href="/register" className="underline">
                  Register
                </Link>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="patient">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">Patient Login</CardTitle>
              <CardDescription>
                Access your medical passport and notifications.
              </CardDescription>
            </CardHeader>
            <LoginForm userType="Patient" />
            <CardFooter className="flex-col gap-4">
              <Button className="w-full" onClick={(e) => handleLogin(e, 'Patient', '/patient/dashboard')} disabled={isPatientLoading}>
                 {isPatientLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="underline">
                  Register
                </Link>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
