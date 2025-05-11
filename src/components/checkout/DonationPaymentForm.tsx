
import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface DonationPaymentFormProps {
  amount: number;
  isProcessing: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const DonationPaymentForm: React.FC<DonationPaymentFormProps> = ({ 
  amount, 
  isProcessing,
  onSubmit
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
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
            <span className="mr-1">Complete Donation</span>
            <span className="font-semibold">${amount}</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default DonationPaymentForm;
