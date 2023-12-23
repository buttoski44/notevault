import { motion } from "framer-motion";

export const AddLogo = () => {
   return (
      <motion.svg
         initial={{ rotate: 90, opacity: 0.3 }}
         animate={{ rotate: 0, opacity: 1 }}
         exit={{ rotate: 90, opacity: 0.3 }}
         xmlns="http://www.w3.org/2000/svg"
         width="30"
         height="30"
         fill="#000"
         version="1.1"
         viewBox="0 0 491.415 491.415"
         xmlSpace="preserve"
      >
         <path d="M147.315 315.859c-1.3 1.2-.8 5.6.3 8 2.2 4.7 6.7 6 11.3 5.8 15.1-.5 27.8-6.9 38.4-15.7 15.8-13.3 32.1-26.1 47.2-40.2.1.1.3.2.4.3 2.6 3.2 5.2 6.4 7.9 9.5 17.2 19.6 35.2 38.3 56.4 53.7 6 4.4 13.6 5.5 19.6-1.4 5.5-6.2 6.1-14.2 1.5-20.2-8.4-10.8-16.7-21.8-26.5-31.3-12-11.6-24.7-22.5-37.3-33.5 1.2-1.4 2.4-2.7 3.5-4.1 3.2-2.6 6.4-5.2 9.5-7.9 19.6-17.2 38.3-35.2 53.7-56.4 4.4-6 5.5-13.6-1.4-19.6-6.2-5.5-14.2-6.1-20.2-1.5-10.8 8.4-21.8 16.7-31.3 26.5-12 12.4-23.2 25.4-34.5 38.4-19.8-28.2-47.4-49.4-70.1-75-1.2-1.3-5.6-.8-8 .3-4.7 2.2-6 6.7-5.8 11.3.5 15.1 6.9 27.8 15.7 38.4 13.4 15.9 26.3 32.3 40.5 47.5-26.2 19.5-46.5 45.5-70.8 67.1z"></path>
      </motion.svg>

   )
};
