
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface DonationCause {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  currentAmount: number;
  goalAmount: number;
  suggestedAmount: number;
}

interface DonationCauseCardProps {
  cause: DonationCause;
}

const DonationCauseCard: React.FC<DonationCauseCardProps> = ({ cause }) => {
  const navigate = useNavigate();
  const progressPercentage = Math.min(Math.round((cause.currentAmount / cause.goalAmount) * 100), 100);
  
  const handleDonateClick = () => {
    navigate(`/donate/checkout/${cause.id}`, { 
      state: { 
        cause: cause 
      } 
    });
  };
  
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 overflow-hidden">
          <img 
            src={cause.imageUrl} 
            alt={cause.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
        
        <CardContent className="p-5">
          <h3 className="text-xl font-semibold text-empower-brown mb-2">{cause.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{cause.description}</p>
          
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium">${cause.currentAmount.toLocaleString()}</span>
            <span className="text-gray-500">Goal: ${cause.goalAmount.toLocaleString()}</span>
          </div>
          
          <Progress value={progressPercentage} className="h-2 bg-gray-200" />
          <div className="text-right text-xs text-gray-500 mt-1">{progressPercentage}% Funded</div>
        </CardContent>
        
        <CardFooter className="border-t p-5 bg-empower-ivory/10">
          <Button 
            onClick={handleDonateClick}
            className="w-full bg-empower-gold hover:bg-empower-gold/90 text-white"
          >
            Donate ${cause.suggestedAmount}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DonationCauseCard;
