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

      <section className='h-screen bg-[#F5F5F5] relative flex flex-col items-start text-black pattern'
         initial={{ x: 0, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         exit={{ x: -300, opacity: 0 }}
      >
         <Navbar handleInpurFilter={handleInpurFilter} />
         {/* <Loader /> */}
         <Suspense fallback={<Loader />}>
            <NoteContainer filter={filter} />
         </Suspense>
         <motion.button className="btn-sm md:btn-md btn-circle bg-[#a19cb3] hover:bg-[#a5a0b4] absolute top-[5.4rem] md:top-auto md:bottom-12 right-6 md:right-12 flex justify-center items-center -z-1 text-[#3f3850] hover:text-black"
            onClick={() => navigate("/new")}
         >
            <AddLogo />
         </motion.button>
      </section>
   )
};