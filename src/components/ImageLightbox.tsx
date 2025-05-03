
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageLightboxProps {
  thumbnailSrc: string;
  fullSrc?: string;
  alt: string;
  className?: string;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ 
  thumbnailSrc, 
  fullSrc, 
  alt, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const imageSrc = fullSrc || thumbnailSrc;
  
  return (
    <>
      <motion.div 
        className={`cursor-pointer ${className}`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <img src={thumbnailSrc} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.button
              className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/40 rounded-full p-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
            >
              <X size={24} />
            </motion.button>
            
            <motion.div
              className="relative max-w-4xl max-h-[80vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={imageSrc} 
                alt={alt} 
                className="max-h-[80vh] max-w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageLightbox;
