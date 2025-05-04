
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Book, 
  Clock, 
  PlayCircle, 
  Hammer, 
  BookOpen, 
  Mix, 
  Award, 
  UserCircle, 
  BarChart,
  Loader,
  CheckCircle,
  Brush,
  Code,
  HeartHandshake,
  Palette,
  HelpCircle,
} from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import ColorfulConfetti from './ColorfulConfetti';

interface QuestionnaireModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  interest: z.string().min(1, { message: "Please select an interest" }),
  otherInterest: z.string().optional(),
  hours: z.string().min(1, { message: "Please select your available hours" }),
  learningStyle: z.string().min(1, { message: "Please select a learning style" }),
  certification: z.string().min(1, { message: "Please select yes or no" }),
  purpose: z.string().min(1, { message: "Please select a purpose" }),
  experience: z.string().min(1, { message: "Please select your experience level" }),
});

type FormValues = z.infer<typeof formSchema>;

// Step configurations with content and animations
const steps = [
  {
    id: "interest",
    title: "What are you most interested in learning?",
    icon: <Book className="w-8 h-8 text-[#D946EF]" />,
  },
  {
    id: "hours",
    title: "How many hours can you commit each week?",
    icon: <Clock className="w-8 h-8 text-[#D946EF]" />,
  },
  {
    id: "learningStyle",
    title: "What's your preferred learning style?",
    icon: <PlayCircle className="w-8 h-8 text-[#D946EF]" />,
  },
  {
    id: "certification",
    title: "Do you want a certification after completing the course?",
    icon: <Award className="w-8 h-8 text-[#D946EF]" />,
  },
  {
    id: "purpose",
    title: "Are you looking to learn for personal growth or career advancement?",
    icon: <HeartHandshake className="w-8 h-8 text-[#D946EF]" />,
  },
  {
    id: "experience",
    title: "What is your current level of experience in your area of interest?",
    icon: <BarChart className="w-8 h-8 text-[#D946EF]" />,
  },
];

const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: "",
      otherInterest: "",
      hours: "",
      learningStyle: "",
      certification: "",
      purpose: "",
      experience: "",
    },
  });

  // Get errors to determine if current step is valid
  const errors = form.formState.errors;
  const currentStepId = steps[currentStep]?.id;
  const isCurrentStepValid = !errors[currentStepId as keyof FormValues];

  const handleNext = () => {
    const currentStepId = steps[currentStep].id;
    
    // Validate current step
    form.trigger(currentStepId as keyof FormValues).then((isValid) => {
      if (isValid) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          handleSubmit();
        }
      }
    });
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const formData = form.getValues();
      console.log("Form submitted with data:", formData);
      
      setIsSubmitting(false);
      setIsCompleted(true);
      setShowConfetti(true);
      
      toast({
        title: "Preferences saved!",
        description: "We've recorded your preferences and will use them to recommend courses for you.",
      });
      
      // Hide confetti after a few seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }, 1500);
  };

  const resetForm = () => {
    form.reset();
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <>
      {showConfetti && <ColorfulConfetti />}
      
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl bg-gradient-to-br from-white to-purple-50 border-none shadow-lg">
          <div className="py-2">
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <Loader className="w-16 h-16 text-[#D946EF] animate-spin mb-4" />
                  <p className="text-lg font-medium text-gray-700">Finding perfect courses for you...</p>
                </motion.div>
              ) : isCompleted ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Perfect Match Found!</h2>
                  <p className="text-lg mb-6 text-gray-600 max-w-md">
                    Based on your preferences, we've found courses that match your learning style and goals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => onOpenChange(false)} 
                      className="bg-empower-terracotta hover:bg-empower-terracotta/90 text-white"
                    >
                      View Recommendations
                    </Button>
                    <Button 
                      onClick={resetForm} 
                      variant="outline"
                    >
                      Start Over
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`step-${currentStep}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                >
                  <DialogHeader className="mb-5">
                    <div className="flex items-center justify-center mb-2">
                      {steps[currentStep].icon}
                    </div>
                    <DialogTitle className="text-2xl font-semibold text-center">
                      {steps[currentStep].title}
                    </DialogTitle>
                  </DialogHeader>

                  <Form {...form}>
                    <form className="space-y-4">
                      <AnimatePresence mode="wait">
                        {currentStep === 0 && (
                          <motion.div
                            key="interest-step"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                          >
                            <FormField
                              control={form.control}
                              name="interest"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormControl>
                                    <RadioGroup 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                      className="space-y-3"
                                    >
                                      <div className="flex flex-col space-y-3">
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="handmade" id="handmade" />
                                          <Brush className="w-5 h-5 text-[#D946EF]" />
                                          <Label htmlFor="handmade" className="flex-1 cursor-pointer">
                                            Handmade crafts
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="technology" id="technology" />
                                          <Code className="w-5 h-5 text-[#D946EF]" />
                                          <Label htmlFor="technology" className="flex-1 cursor-pointer">
                                            Technology & coding
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="marketing" id="marketing" />
                                          <BarChart className="w-5 h-5 text-[#D946EF]" />
                                          <Label htmlFor="marketing" className="flex-1 cursor-pointer">
                                            Marketing & entrepreneurship
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="design" id="design" />
                                          <Palette className="w-5 h-5 text-[#D946EF]" />
                                          <Label htmlFor="design" className="flex-1 cursor-pointer">
                                            Design & creativity
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="other" id="other" />
                                          <HelpCircle className="w-5 h-5 text-[#D946EF]" />
                                          <Label htmlFor="other" className="flex-1 cursor-pointer">
                                            Other
                                          </Label>
                                        </div>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                  {form.watch("interest") === "other" && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="pt-2"
                                    >
                                      <FormField
                                        control={form.control}
                                        name="otherInterest"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <Input placeholder="Please specify your interest" {...field} />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </motion.div>
                                  )}
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {currentStep === 1 && (
                          <motion.div
                            key="hours-step"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <FormField
                              control={form.control}
                              name="hours"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormControl>
                                    <RadioGroup 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                      className="space-y-3"
                                    >
                                      <div className="flex flex-col space-y-3">
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="less-than-2" id="less-than-2" />
                                          <Label htmlFor="less-than-2" className="flex-1 cursor-pointer">
                                            Less than 2 hours
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="2-to-5" id="2-to-5" />
                                          <Label htmlFor="2-to-5" className="flex-1 cursor-pointer">
                                            2–5 hours
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="more-than-5" id="more-than-5" />
                                          <Label htmlFor="more-than-5" className="flex-1 cursor-pointer">
                                            More than 5 hours
                                          </Label>
                                        </div>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {currentStep === 2 && (
                          <motion.div
                            key="learning-style-step"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <FormField
                              control={form.control}
                              name="learningStyle"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormControl>
                                    <RadioGroup 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                      className="space-y-3"
                                    >
                                      <div className="flex flex-col space-y-3">
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="videos" id="videos" />
                                          <Label htmlFor="videos" className="flex-1 cursor-pointer">
                                            Watching videos
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="hands-on" id="hands-on" />
                                          <Label htmlFor="hands-on" className="flex-1 cursor-pointer">
                                            Hands-on practice
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="reading" id="reading" />
                                          <Label htmlFor="reading" className="flex-1 cursor-pointer">
                                            Reading materials
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="mixed" id="mixed" />
                                          <Label htmlFor="mixed" className="flex-1 cursor-pointer">
                                            Mixed approach
                                          </Label>
                                        </div>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {currentStep === 3 && (
                          <motion.div
                            key="certification-step"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <FormField
                              control={form.control}
                              name="certification"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormControl>
                                    <RadioGroup 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                      className="space-y-3"
                                    >
                                      <div className="flex flex-col space-y-3">
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="yes" id="cert-yes" />
                                          <Label htmlFor="cert-yes" className="flex-1 cursor-pointer">
                                            Yes
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="no" id="cert-no" />
                                          <Label htmlFor="cert-no" className="flex-1 cursor-pointer">
                                            No
                                          </Label>
                                        </div>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {currentStep === 4 && (
                          <motion.div
                            key="purpose-step"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <FormField
                              control={form.control}
                              name="purpose"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormControl>
                                    <RadioGroup 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                      className="space-y-3"
                                    >
                                      <div className="flex flex-col space-y-3">
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="personal" id="personal" />
                                          <Label htmlFor="personal" className="flex-1 cursor-pointer">
                                            Personal growth
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="career" id="career" />
                                          <Label htmlFor="career" className="flex-1 cursor-pointer">
                                            Career-related
                                          </Label>
                                        </div>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {currentStep === 5 && (
                          <motion.div
                            key="experience-step"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <FormField
                              control={form.control}
                              name="experience"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormControl>
                                    <RadioGroup 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                      className="space-y-3"
                                    >
                                      <div className="flex flex-col space-y-3">
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="beginner" id="beginner" />
                                          <Label htmlFor="beginner" className="flex-1 cursor-pointer">
                                            Beginner
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="intermediate" id="intermediate" />
                                          <Label htmlFor="intermediate" className="flex-1 cursor-pointer">
                                            Intermediate
                                          </Label>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 rounded-lg border border-purple-100 p-3 hover:bg-purple-50 transition-colors">
                                          <RadioGroupItem value="advanced" id="advanced" />
                                          <Label htmlFor="advanced" className="flex-1 cursor-pointer">
                                            Advanced
                                          </Label>
                                        </div>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </Form>

                  {/* Progress indicator */}
                  <div className="flex justify-center mt-6 mb-4">
                    <div className="flex space-x-2">
                      {steps.map((_, index) => (
                        <motion.div
                          key={`step-dot-${index}`}
                          className={`h-2 rounded-full ${
                            index === currentStep
                              ? "bg-[#D946EF] w-8"
                              : index < currentStep
                              ? "bg-[#D946EF]/70 w-2"
                              : "bg-gray-200 w-2"
                          }`}
                          initial={{ width: index === currentStep ? "8px" : "8px" }}
                          animate={{ 
                            width: index === currentStep ? "32px" : "8px",
                            backgroundColor: index <= currentStep ? "#D946EF" : "#e5e7eb" 
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#D946EF] hover:bg-[#D946EF]/90"
                      disabled={!isCurrentStepValid}
                    >
                      {currentStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestionnaireModal;
