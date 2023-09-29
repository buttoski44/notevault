import { useContext, useState } from "react";
import { NotesContext } from "../../context/notes.context";
import { Note } from "../note/note.component";
import { motion } from "framer-motion";
const NoteContainer = ({ filter }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageNumber = [];
    const indexOfLastPost = currentPage * 6;
    const indexOfFirstPost = indexOfLastPost - 6;

    let notes = useContext(NotesContext);
    for (let i = 1; i <= Math.ceil(notes.length / 6); i++) {
        pageNumber.push(i)
    }

    notes = notes.filter(note =>
        (note.title.toLowerCase().includes(filter.toLowerCase()))
    );

    const pinned = notes.filter((note) => note.pinned === true);
    pinned.sort((a, b) => b.pintime.toMillis() - a.pintime.toMillis())
    const unPinned = notes.filter((note) => note.pinned === false);
    unPinned.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis())
    const array = pinned.concat(unPinned).slice(indexOfFirstPost, indexOfLastPost)

    return (
        <motion.section className='h-full w-full md:w-auto bg-gradient-to-r from-[#F5F5F5] px-4 md:px-12 py-1 md:py-4'
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
        >
            <div className="join py-2 md:py-4">
                {
                    pageNumber.map((page) => <button className="join-item btn btn-sm" onClick={() => setCurrentPage(page)}>{page}</button>)
                }
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2  gap-1 md:gap-5 justify-around"
            >
                {array.map((note) => <Note key={note.id} note={note} />)}
            </div>
        </motion.section>
    )
};

export default NoteContainer;