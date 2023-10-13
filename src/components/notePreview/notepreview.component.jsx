import { motion } from "framer-motion";
import { CrossLogo } from "../../assets/cross";
import { Loader } from "../../components/loader/loader.component";
import { FALSE_STATE } from "../notescontainer/notescontainer.component";
export const NotePreview = ({ note, setPreview }) => {
    const timeArr = note.obj.timestamp.toDate().toDateString().split(' ');

    if (!note) {
        return <Loader type="fullnote" />
    }

    return (
        <motion.section className="relative w-full z-10 h-full bg-[#F5F5F5] text-black"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <button
                className="absolute top-8 right-8 btn-circle btn-sm sm:bg-[#FAF0E6] hover:bg-[#f7e7d7]  flex justify-center items-center"
                onClick={() => setPreview(FALSE_STATE)}
            >
                <CrossLogo />
            </button>
            <div className="h-full py-5 px-8 bg-[#B9B4C7]"
            >
                <p
                    before="Empty"
                    spellCheck="false"
                    className="text-6xl py-4 font-bold outline-0 empty:opacity-[0.2] empty:before:content-[attr(before)]"
                >{note.obj.title}</p>
                <p
                    before="Empty"
                    spellCheck="false"
                    className="text-md font-semibold outline-0 empty:opacity-[0.2] empty:before:content-[attr(before)]"
                >{note.obj.tagline}</p>
                <p
                    className="pt-4 text-xs font-semibold md:text-sm"
                >{timeArr && (timeArr[0] + ". " + timeArr[2] + " " + timeArr[1] + ", " + timeArr[3] + ".")}</p>
                <div className="h-[2px] w-full bg-black rounded-full opacity-[0.7] my-2"></div>
                <p
                    before="Empty"
                    spellCheck="false"
                    className="w-full py-4 text-sm font-medium outline-0 empty:opacity-[0.2] empty:before:content-[attr(before)]"
                >{note.obj.body}</p>
            </div>
        </motion.section>
    )
};