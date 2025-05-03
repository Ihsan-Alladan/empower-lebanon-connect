
import React, { useState, useEffect } from "react";
import { Check, X, ChevronDown, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";

// Define phone number format specifications by country
type PhoneFormat = {
  code: string;
  flag: string;
  country: string;
  length: number;
  example: string;
};

const phoneFormats: PhoneFormat[] = [
  { code: "+961", flag: "🇱🇧", country: "Lebanon", length: 8, example: "71 123 456" },
  { code: "+1", flag: "🇺🇸", country: "United States", length: 10, example: "(555) 123-4567" },
  { code: "+44", flag: "🇬🇧", country: "United Kingdom", length: 10, example: "7911 123456" },
  { code: "+33", flag: "🇫🇷", country: "France", length: 9, example: "6 12 34 56 78" },
  { code: "+49", flag: "🇩🇪", country: "Germany", length: 11, example: "1512 3456789" },
  { code: "+971", flag: "🇦🇪", country: "UAE", length: 9, example: "50 123 4567" },
  { code: "+966", flag: "🇸🇦", country: "Saudi Arabia", length: 9, example: "51 234 5678" },
  { code: "+20", flag: "🇪🇬", country: "Egypt", length: 10, example: "10 1234 5678" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string, isValid: boolean, fullNumber: string) => void;
  className?: string;
  required?: boolean;
}

export function PhoneInput({ 
  value = "", 
  onChange, 
  className, 
  required = false 
}: PhoneInputProps) {
  const [selectedFormat, setSelectedFormat] = useState<PhoneFormat>(phoneFormats[0]);
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    const isNumberValid = cleanNumber.length === selectedFormat.length;
    setIsValid(isNumberValid);
    onChange(phoneNumber, isNumberValid, `${selectedFormat.code} ${phoneNumber}`);
  }, [phoneNumber, selectedFormat, onChange]);

  const handleCountryChange = (code: string) => {
    const format = phoneFormats.find(f => f.code === code) || phoneFormats[0];
    setSelectedFormat(format);
    // Clear the phone number when changing country to avoid validation conflicts
    setPhoneNumber("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Allow only numbers, spaces, and common phone separators
    const sanitized = input.replace(/[^\d\s()-+]/g, "");
    setPhoneNumber(sanitized);
    setTouched(true);
  };

  return (
    <div className={cn(
      "group relative w-full", 
      isMobile ? "flex flex-col space-y-2" : "flex items-center space-x-2",
      className
    )}>
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "min-w-[120px]", 
            isMobile && "w-full"
          )}
        >
          <Select
            value={selectedFormat.code}
            onValueChange={handleCountryChange}
          >
            <SelectTrigger 
              className="h-12 rounded-2xl border border-input bg-background shadow-sm focus:ring-1 focus:ring-ring"
            >
              <SelectValue placeholder="Select country">
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{selectedFormat.flag}</span>
                  <span>{selectedFormat.code}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              className="rounded-xl border border-input bg-white shadow-md"
              position="popper"
              side={isMobile ? "bottom" : "top"}
              align="start"
              sideOffset={5}
            >
              <SelectGroup>
                {phoneFormats.map((format) => (
                  <SelectItem
                    key={format.code}
                    value={format.code}
                    className="py-3 cursor-pointer hover:bg-muted rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">{format.flag}</span>
                      <span className="mr-2">{format.code}</span>
                      <span className="text-sm text-muted-foreground">{format.country}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex-1 relative"
        >
          <Input
            type="tel"
            inputMode="tel"
            pattern="[0-9\s\-\(\)]+"
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder={`e.g. ${selectedFormat.example}`}
            className={cn(
              "h-12 rounded-2xl pl-4 pr-10 border shadow-sm focus:ring-1 focus:ring-ring w-full text-base",
              touched && !isValid && phoneNumber !== "" ? "border-destructive focus:ring-destructive" : "",
              isValid ? "border-green-500 focus:ring-green-500" : ""
            )}
            onBlur={() => setTouched(true)}
            required={required}
          />
          
          <AnimatePresence>
            {touched && phoneNumber !== "" && (
              <motion.div 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                {isValid ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-destructive" />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  type="button"
                  className="absolute left-3 bottom-[-22px] text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="flex items-center text-xs">
                    <Info className="h-3 w-3 mr-1" />
                    <span>Format help</span>
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                className="bg-white rounded-xl p-3 shadow-lg border border-input max-w-xs"
                side="bottom"
                sideOffset={5}
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">Phone Number Format</p>
                  <p className="text-xs text-muted-foreground">Please enter a valid {selectedFormat.country} phone number</p>
                  <p className="text-xs text-muted-foreground">Example: {selectedFormat.example}</p>
                  <p className="text-xs text-muted-foreground">Required length: {selectedFormat.length} digits</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
