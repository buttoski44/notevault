import { useContext, useState } from "react";
import { NotesContext } from "../../context/notes.context";
import { Note } from "../note/note.component";

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
        <section className='h-full w-full sm:w-auto bg-gradient-to-r from-[#F5F5F5] px-4 md:px-12 py-1 md:py-4'
        >
            <div className="py-2 join md:py-4 ">
                {
                    pageNumber.map((page) => <button key={page} className="join-item btn-sm bg-[#352F44] text-[#F5F5F5]" onClick={() => setCurrentPage(page)}>{page}</button>)
                }
            </div>
            <div className="grid  grid-cols-2  sm:grid-cols-3 gap-1 sm:gap-5 justify-start"
            >
                {array.map((note) => <Note key={note.id} note={note} />)}
            </div>
        </section>
    )
};

export default NoteContainer;