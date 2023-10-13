import { useContext, useState } from "react";
import { NotesContext } from "../../context/notes.context";
import { Note } from "../note/note.component";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { NotePreview } from "../../components/notePreview/notepreview.component"
import { BulbLogo } from "../../assets/bulb";
import { FolderContainer } from "../foldercontainer/foldercontainer.component";
export const FALSE_STATE = {
    visible: false,
    obj: {}
}
const NoteContainer = ({ filter }) => {
    const [preview, setPreview] = useState(FALSE_STATE);
    const [folderFilter, setFolderFilter] = useState(null);
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

    if (folderFilter) notes = notes.filter(note => note.folder === folderFilter);


    const pinned = notes.filter((note) => note.pinned === true);
    pinned.sort((a, b) => b.pintime.toMillis() - a.pintime.toMillis())
    const unPinned = notes.filter((note) => note.pinned === false);
    unPinned.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis())
    const array = pinned.concat(unPinned).slice(indexOfFirstPost, indexOfLastPost)
    return (
        <section className="relative flex gap-8 h-full w-full px-4 md:px-10">
            <div className="flex flex-col w-full h-full mdl:w-[75%] xl:w-[52%]">

                <FolderContainer setFolderFilter={setFolderFilter} folderFilter={folderFilter} />
                <div className='h-full w-full'
                >

                    <div className="py-2 join md:py-3">
                        {
                            pageNumber.map((page) => <button key={page} className="join-item btn-sm bg-[#352F44] text-[#F5F5F5]" onClick={() => setCurrentPage(page)}>{page}</button>)
                        }
                    </div>
                    <div className="grid justify-start grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-5"
                    >
                        <AnimatePresence >
                            <LayoutGroup>
                                {array.map((note) => <Note key={note.id} note={note} setPreview={setPreview} preview={preview} />)}
                            </LayoutGroup>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {
                    preview.visible &&
                    (
                        <motion.div className="hidden xl:flex h-full w-[48%] items-center"
                            key='preview'
                            initial={{ y: -300, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 300, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <NotePreview note={preview} setPreview={setPreview} />
                        </motion.div>
                    )
                }
            </AnimatePresence>


        </section>
    )
};

export default NoteContainer;