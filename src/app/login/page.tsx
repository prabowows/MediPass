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
              <CardTitle className="font-headline text-2xl">Patient Login</CardTitle>
              <CardDescription>
                Access your medical passport and notifications.
              </CardDescription>
            </CardHeader>
            <LoginForm userType="Patient" />
            <CardFooter className="flex-col gap-4">
              <Button className="w-full" asChild>
                <Link href="/patient/dashboard">Login</Link>
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
              <Button className="w-full" asChild>
                <Link href="/hospital/dashboard">Login</Link>
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
      </Tabs>
    </div>
  );
}
