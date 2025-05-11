
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
import { CreditCard, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const DonationCheckout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { causeId } = useParams<{ causeId: string }>();
  const { addToCart } = useCart();
  
  const cause = location.state?.cause as DonationCause;
  const [amount, setAmount] = useState(cause?.suggestedAmount || 50);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  
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
    setIsProcessing(true);
    
    // Allow the donation to be added to cart
    if (cause) {
      addToCart({
        productId: `donation-${causeId}`,
        quantity: 1,
        name: cause.title,
        description: `Donation to ${cause.title}`,
        price: amount,
        imageUrl: cause.imageUrl
      });
      
      toast.success('Donation added to cart', {
        description: 'You can now complete your purchase along with other items.',
      });
      
      // Navigate to cart
      setTimeout(() => {
        navigate('/cart');
      }, 1500);
      return;
    }
    
    // Simulated payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      handleSuccessfulDonation();
    }, 2000);
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
                                    placeholder="Your name"
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
                                    placeholder="Your email address"
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
                          
                          <div className="flex flex-col sm:flex-row gap-3 mb-4">
                            <Button
                              type="button"
                              variant={paymentMethod === 'card' ? "default" : "outline"}
                              className={`flex-1 flex items-center justify-center gap-2 ${
                                paymentMethod === 'card' ? "bg-empower-gold hover:bg-empower-gold/90" : ""
                              }`}
                              onClick={() => setPaymentMethod('card')}
                            >
                              <CreditCard size={18} />
                              Credit/Debit Card
                            </Button>
                            
                            <Button
                              type="button"
                              variant={paymentMethod === 'paypal' ? "default" : "outline"}
                              className={`flex-1 flex items-center justify-center gap-2 ${
                                paymentMethod === 'paypal' ? "bg-empower-gold hover:bg-empower-gold/90" : ""
                              }`}
                              onClick={() => setPaymentMethod('paypal')}
                            >
                              <span className="font-bold text-blue-600">Pay</span>
                              <span className="font-bold text-blue-800">Pal</span>
                            </Button>
                          </div>
                          
                          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                            {paymentMethod === 'card' ? (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="card-number">Card Number</Label>
                                  <Input
                                    id="card-number"
                                    placeholder="1234 5678 9012 3456"
                                    className="mt-1"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input
                                      id="expiry"
                                      placeholder="MM/YY"
                                      className="mt-1"
                                    />
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input
                                      id="cvc"
                                      placeholder="123"
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                                
                                <div>
                                  <Label htmlFor="cardholder">Cardholder Name</Label>
                                  <Input
                                    id="cardholder"
                                    placeholder="Name on card"
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-2">
                                <p className="mb-2">You will be redirected to PayPal to complete your payment.</p>
                                <div className="inline-block bg-blue-100 rounded-md px-4 py-2">
                                  <span className="font-bold text-lg">
                                    <span className="text-blue-600">Pay</span>
                                    <span className="text-blue-800">Pal</span>
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center mt-4">
                            <Checkbox id="terms" className="mr-2" />
                            <Label htmlFor="terms" className="text-sm text-gray-600">
                              I agree to the <a href="/terms" className="text-empower-terracotta hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-empower-terracotta hover:underline">Privacy Policy</a>
                            </Label>
                          </div>
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90 text-white py-6 text-lg font-medium flex items-center justify-center gap-2"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Check size={20} />
                              Complete Donation (${amount})
                            </>
                          )}
                        </Button>
                        
                        <div className="flex justify-center mt-4">
                          <Button
                            type="button"
                            variant="link"
                            className="text-sm text-empower-terracotta"
                            onClick={() => {
                              addToCart({
                                productId: `donation-${causeId}`,
                                quantity: 1,
                                name: cause.title,
                                description: `Donation to ${cause.title}`,
                                price: amount,
                                imageUrl: cause.imageUrl
                              });
                              toast.success('Added to cart!');
                              navigate('/cart');
                            }}
                          >
                            Add to cart instead
                          </Button>
                        </div>
                        
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
                          <div className="text-xs text-gray-500 mt-1 text-right">
                            100% goes to the cause
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
