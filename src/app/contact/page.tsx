import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          We&apos;re here to help. Reach out with any questions or concerns.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-8">
            <h2 className="font-headline text-2xl font-semibold">Contact Information</h2>
            <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <h3 className="font-semibold text-foreground">Our Office</h3>
                        <p>123 Health St, Wellness City, 12345</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <h3 className="font-semibold text-foreground">Email Us</h3>
                        <p>support@medipass.com</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <h3 className="font-semibold text-foreground">Call Us</h3>
                        <p>+1 (234) 567-890</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
