
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        description: "An email address is required to subscribe.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you for subscribing!",
      description: "You'll now receive our latest updates and news.",
    });
    setEmail('');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-empower-terracotta/10 to-empower-olive/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4 text-empower-brown">
            Stay Connected With Our Mission!
          </h2>
          <p className="text-empower-brown mb-8">
            Join our newsletter to receive updates on new courses, products, events, and ways to contribute to our cause.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit"
              className="bg-empower-gold hover:bg-empower-gold/90 text-empower-brown font-medium hover-zoom"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-empower-brown/70 mt-4">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
