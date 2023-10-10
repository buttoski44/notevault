import { useContext, useState } from "react";
import { NotesContext } from "../../context/notes.context";
import { Note } from "../note/note.component";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { NotePreview } from "../../components/notePreview/notepreview.component"
const NoteContainer = ({ filter }) => {
    const [preview, setPreview] = useState(null);

    const [currentPage, setCurrentPage] = useState(1)
    const pageNumber = [];
    const indexOfLastPost = currentPage * 6;
    const indexOfFirstPost = indexOfLastPost - 6;

    let { notes } = useContext(NotesContext);
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
        <section className="flex gap-8 h-full w-full px-4 md:px-10">
            <div className='h-full w-full sm:w-auto'
            >
                <div className="py-2 join md:py-4 ">
                    {
                        pageNumber.map((page) => <button key={page} className="join-item btn-sm bg-[#352F44] text-[#F5F5F5]" onClick={() => setCurrentPage(page)}>{page}</button>)
                    }
                </div>
                <div className="grid justify-start grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-5"
                >
                    <AnimatePresence >
                        <LayoutGroup>
                            {array.map((note) => <Note key={note.id} note={note} setPreview={setPreview} />)}
                        </LayoutGroup>
                    </AnimatePresence>
                </div>
            </div>
            <div className="hidden xl:flex h-full w-1/2 items-center">
                {
                    preview &&
                    <NotePreview note={preview} setPreview={setPreview} />
                }
            </div>
        </section>
    )
};

export default NoteContainer;