import { Navbar } from "../../components/navbar/navbar.component";
import { lazy, Suspense, useState, useContext } from "react";
import { NotesContext } from "../../context/notes.context";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { AddLogo } from "../../assets/add.jsx";
import { CheckLogo } from "../../assets/check";
import { Loader } from "../../components/loader/loader.component";
// import { Folder } from "../../components/folder/folder.compoennt";
const NoteContainer = lazy(() => import("../../components/notescontainer/notescontainer.component"));

export const Dashboard = () => {
   const { saved } = useContext(NotesContext);
   const [filter, setFilter] = useState("");
   // const [s, setS] = useState(false);
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
         <button className="btn-md btn-circle bg-[#a19cb3] hover:bg-[#a5a0b4] absolute bottom-6 md:bottom-12 right-3 md:right-12 flex justify-center items-center z-10 text-[#3f3850] hover:text-black"
            onClick={() => navigate("/new")}
         >
            <AddLogo />
         </button>
         {/* <button className="btn-md tn-circle bg-[#a19cb3] hover:bg-[#a5a0b4] absolute bottom-6 md:bottom-12 right-3 md:right-24 flex justify-center items-center z-10 text-[#3f3850] hover:text-black"
            onClick={() => setS(!s)}
         >
            b
         </button> */}
         <AnimatePresence>
            {
               saved &&
               <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-1 flex justify-center items-center gap-2 absolute bottom-6 md:bottom-12 right-3 md:right-36 z-10 text-[#B9B4C7] cursor-default">

                  <button

                     className="h-10 w-10 flex justify-center items-center cursor-default"
                  >
                     <CheckLogo />
                  </button>
                  <p className="text-sm font-bold">Saved</p>
               </motion.span>
            }
         </AnimatePresence>
      </motion.section>
   )
};




{/* <div className="w-full overflow-scroll flex gap-2 px-4 md:px-12 py-1 md:pt-4 no-scrollbar">
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
   </div> */}