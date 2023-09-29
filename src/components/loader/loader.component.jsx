import { motion } from "framer-motion";
export const Loader = () => {
    return (
        <motion.section className="h-full w-full flex justify-center bg-[#F5F5F5]  items-center"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
        >
            <div className=' loading loading-dots loading-lg text-[#5C5470]'>
            </div>
        </motion.section>
    )
};