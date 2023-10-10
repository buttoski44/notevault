import { motion } from "framer-motion";
export const CrossLogo = () => {
   return (
      <motion.svg
         initial={{ rotate: 90, opacity: 0.3 }}
         animate={{ rotate: 0, opacity: 1 }}
         exit={{ rotate: 90, opacity: 0.3 }}
         xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></motion.svg>
   )
};