import { Navbar } from "../../components/navbar/navbar.component";
import { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader/loader.component";
const NoteContainer = lazy(() => import("../../components/notescontainer/notescontainer.component"));

export const Dashboard = () => {
   const [filter, setFilter] = useState("");
   const handleInpurFilter = (e) => {
      setFilter(e.target.value)
   }
   const navigate = useNavigate();
   return (
      <section className='h-screen bg-[#F5F5F5] relative flex flex-col items-start text-black pattern'>
         <Navbar handleInpurFilter={handleInpurFilter} />
         <Suspense fallback={<Loader />}>
            <NoteContainer filter={filter} />
         </Suspense>
         <button className="btn-sm btn-circle bg-[rgb(229,231,240)] hover:bg-[rgb(213,214,219)] absolute top-[5.4rem] md:bottom-12 right-6 md:right-12 flex justify-center items-center"
            onClick={() => navigate("new")}
         >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12H12M12 12H18M12 12V18M12 12V6" /></svg>
         </button>
      </section>
   )
};