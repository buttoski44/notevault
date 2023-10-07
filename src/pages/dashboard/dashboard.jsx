import { Navbar } from "../../components/navbar/navbar.component";
import { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { AddLogo } from "../../assets/add.jsx";
import { Loader } from "../../components/loader/loader.component";
const NoteContainer = lazy(() => import("../../components/notescontainer/notescontainer.component"));

export const Dashboard = () => {
   const [filter, setFilter] = useState("");
   const handleInpurFilter = (e) => {
      setFilter(e.target.value)
   }
   const navigate = useNavigate();
   return (

      <motion.section className='h-screen bg-[#F5F5F5] relative flex flex-col items-start text-black'
         initial={{ y: -300, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         exit={{ y: 300, opacity: 0 }}
         transition={{ duration: 0.3 }}>
         <Navbar handleInpurFilter={handleInpurFilter} />
         <Suspense fallback={<Loader />}>
            <NoteContainer filter={filter} />
         </Suspense>
         <motion.button className="btn-md btn-circle bg-[#a19cb3] hover:bg-[#a5a0b4] absolute bottom-6 md:bottom-12 right-3 md:right-12 flex justify-center items-center z-10 text-[#3f3850] hover:text-black"
            onClick={() => navigate("/new")}
         >
            <AddLogo />
         </motion.button>
      </motion.section>
   )
};