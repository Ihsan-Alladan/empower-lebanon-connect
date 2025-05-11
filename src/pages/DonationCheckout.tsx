
import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { DonationCause } from '@/components/donations/DonationCauseCard';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const DonationCheckout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { causeId } = useParams<{ causeId: string }>();
  
  const cause = location.state?.cause as DonationCause;
  const [amount, setAmount] = useState(cause?.suggestedAmount || 50);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  
  const handleSuccessfulDonation = () => {
    // Create confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    toast.success('Thank you for your donation!', {
      description: 'Your support makes a difference in our community.',
    });
    
    // Navigate back to main donation page after a short delay
    setTimeout(() => {
      navigate('/donate');
    }, 3000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with a payment processor
    // For now, we'll just simulate a successful donation
    handleSuccessfulDonation();
  };
  
  if (!cause) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-empower-brown mb-4">Cause not found</h2>
            <Button onClick={() => navigate('/donate')}>Return to Donations</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageTransition route={location.pathname}>
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h1 
                className="text-3xl font-bold text-empower-brown mb-2 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Support {cause.title}
              </motion.h1>
              
              <motion.div
                className="w-20 h-1 bg-empower-terracotta mx-auto mb-8"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold text-empower-brown mb-2">Donation Amount</h2>
                          
                          <div className="flex flex-wrap gap-3 mb-4">
                            {[25, 50, 100, 250].map((value) => (
                              <Button
                                key={value}
                                type="button"
                                variant={amount === value ? "default" : "outline"}
                                className={amount === value ? "bg-empower-terracotta hover:bg-empower-terracotta/90" : ""}
                                onClick={() => setAmount(value)}
                              >
                                ${value}
                              </Button>
                            ))}
                            
                            <Button
                              type="button"
                              variant={![25, 50, 100, 250].includes(amount) ? "default" : "outline"}
                              className={![25, 50, 100, 250].includes(amount) ? "bg-empower-terracotta hover:bg-empower-terracotta/90" : ""}
                              onClick={() => setAmount(amount)}
                            >
                              Custom
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            <Slider
                              value={[amount]}
                              min={5}
                              max={500}
                              step={5}
                              onValueChange={(values) => setAmount(values[0])}
                              className="py-4"
                            />
                            
                            <div className="flex items-center">
                              <Label htmlFor="custom-amount" className="mr-2">$</Label>
                              <Input
                                id="custom-amount"
                                type="number"
                                min={1}
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="max-w-[150px]"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold text-empower-brown mb-2">Your Information</h2>
                          
                          <div className="flex items-center mb-4">
                            <Checkbox
                              id="anonymous"
                              checked={isAnonymous}
                              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                              className="mr-2"
                            />
                            <Label htmlFor="anonymous" className="cursor-pointer">Make my donation anonymous</Label>
                          </div>
                          
                          {!isAnonymous && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 gap-4">
                                <div>
                                  <Label htmlFor="name">Name (Optional)</Label>
                                  <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                                
                                <div>
                                  <Label htmlFor="email">Email (Optional)</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <Checkbox
                                  id="updates"
                                  checked={receiveUpdates}
                                  onCheckedChange={(checked) => setReceiveUpdates(checked as boolean)}
                                  className="mr-2"
                                />
                                <Label htmlFor="updates" className="cursor-pointer">
                                  Receive updates about this cause
                                </Label>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold text-empower-brown mb-2">Payment Method</h2>
                          <p className="text-gray-500 mb-4">
                            This is a demonstration. In a live application, you would integrate with a payment processor.
                          </p>
                          {/* Payment method inputs would go here */}
                          <div className="p-4 border border-gray-200 rounded-md bg-gray-50 text-center">
                            [Payment Method Integration]
                          </div>
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full bg-empower-gold hover:bg-empower-gold/90 text-white py-6 text-lg font-medium"
                        >
                          Donate ${amount}
                        </Button>
                        
                        <p className="text-center text-sm text-gray-500 mt-4">
                          Your donation is secure and tax-deductible. You will receive a receipt by email.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="sticky top-6">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-empower-brown mb-3">Donation Summary</h3>
                      
                      <div className="mb-4">
                        <img 
                          src={cause.imageUrl} 
                          alt={cause.title} 
                          className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <h4 className="font-medium">{cause.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{cause.description}</p>
                        
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current Progress</span>
                          <span className="font-medium">${cause.currentAmount.toLocaleString()} of ${cause.goalAmount.toLocaleString()}</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-empower-terracotta h-full" 
                            style={{ width: `${Math.min(Math.round((cause.currentAmount / cause.goalAmount) * 100), 100)}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Your Donation</span>
                          <span className="font-semibold">${amount}</span>
                        </div>
                        
                        <div className="border-t border-dashed pt-3 mt-3">
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${amount}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default DonationCheckout;
