import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotesContext } from "../../context/notes.context";
import { deletDocument, updateDocument } from "../../firebase/firebase.uitls";
import { INITIAL_VALUE, COLORS, colors } from "../newnote/newnote";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { BackLogo } from "../../assets/back";
import { PaintLogo } from "../../assets/paint";
import { DeletLogo } from "../../assets/delet";
import { Loader } from "../../components/loader/loader.component";

const Fullnote = () => {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const notes = useContext(NotesContext);
    const [note, setNote] = useState(() => notes.find(n => n.id === noteId));
    const timeArr = note ? note.timestamp.toDate().toDateString().split(' ') : null;
    const ref = useRef(INITIAL_VALUE);
    if (note) ref.current = note;
    const timeout = useRef();
    useEffect(() => {
        if (!note) {
            notes.forEach(data => {
                if (data.id === noteId) {
                    setNote(data)
                }
            });
        }
        return () => {
            if (note) {
                clearTimeout(timeout.current);
                if (ref.current.title.length !== 0 || ref.current.tagline.length !== 0 || ref.current.body.length !== 0) {
                    updateDocument(ref.current, noteId)
                } else if (ref.current.title.length === 0 && ref.current.tagline.length === 0 && ref.current.body.length === 0) {
                    deletDocument(noteId, "Notes");
                }
            }
        }
    }, [notes]);

    const handleDelet = () => {
        ref.current = INITIAL_VALUE;
        navigate("/");
    }

    const handleChange = (e) => {
        ref.current.timestamp = Timestamp.now()
        ref.current = { ...ref.current, [e.target.id]: e.currentTarget.textContent };
        debounce();
    }

    const handleColor = (colour) => {
        ref.current = { ...ref.current, color: colour }
        setNote({ ...note, color: colour })
        debounce();
    }

    const debounce = () => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            updateDocument(ref.current, noteId);
        }, 2000)
    }

    if (notes.length === 0) {
        return <Loader type="fullnote" />
    }

    return (
        <section className="relative min-h-screen sm:px-16 mdl:px-32 bg-[#F5F5F5] text-black"

        >   <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}

        >

                <button
                    className="absolute top-0 sm:top-8 left-0 sm:left-2 mdl:left-4 gap-4 px-2 btn-circle sm:bg-[rgb(229,231,240)] hover:bg-[rgb(213,214,219)] flex justify-center items-center"
                    onClick={() => navigate("/")}
                >
                    <BackLogo />
                </button>
                <div className="absolute flex flex-col gap-4 top-0 sm:top-8 right-0 sm:right-2 mdl:right-8">
                    <button
                        className="btn-circle sm:bg-[#FAF0E6] hover:bg-[#f7e7d7]  flex justify-center items-center"
                        onClick={handleDelet}
                    >
                        <DeletLogo />
                    </button>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <label tabIndex={0} className="btn-circle sm:bg-[rgb(229,231,240)] hover:bg-[rgb(213,214,219)] flex justify-center items-center p-2">
                            <PaintLogo />
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] shadow flex flex-col gap-2 p-2 bg-stone-100 rounded-s-2xl rounded-2xl w-12 mt-2">
                            {colors.map((color) => <li key={color} className={`w-full rounded-sm ${COLORS[color]}`} onClick={() => handleColor(color)}><div className="opacity-[0]">l</div></li>)}
                        </ul>
                    </div>
                </div>
            </motion.div>
            <motion.div className={`min-h-screen py-8 sm:py-5 px-8 ${COLORS[ref.current.color]}`}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
            >
                <h2
                    before="Title"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    id="title"
                    spellCheck="false"
                    className="outline-0 text-2xl xs:text-4xl md:text-6xl py-4 font-bold empty:opacity-[0.2] empty:before:content-[attr(before)]"
                    onInput={handleChange}>{ref.current.title}</h2>
                <h3
                    before="Tagline"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    spellCheck="false"
                    id="tagline"
                    className="outline-0 text-md xs:text-xl placeholder:opacity-[0.2] font-semibold"
                    onInput={handleChange}>{ref.current.tagline}</h3>
                <p
                    className="pt-4 text-xs md:text-sm font-semibold"
                >{timeArr && (timeArr[0] + ". " + timeArr[2] + " " + timeArr[1] + ", " + timeArr[3] + ".")}</p>
                <div className="h-[2px] w-full bg-black rounded-full opacity-[0.7] my-2"></div>
                <p
                    before="Write Here..."
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    spellCheck="false"
                    className="w-full h-full outline-0 py-4 text-sm font-medium empty:opacity-[0.2] empty:before:content-[attr(before)]"
                    onInput={handleChange}
                    id="body"
                >{ref.current.body}</p>
            </motion.div>
        </section>
    )
};

export default Fullnote;