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
        if (notes) {
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
        <section className="relative min-h-screen md:px-32 bg-[#F5F5F5] text-black"

        >   <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}

        >

                <button
                    className="absolute top-8 md:top-10 left-4 md:left-12 gap-4 px-2 btn-circle bg-[rgb(229,231,240)] hover:bg-[rgb(213,214,219)] flex justify-center items-center"
                    onClick={() => navigate("/")}
                >
                    <BackLogo />
                </button>
                <div className="absolute flex flex-col gap-4 px-2 top-8 md:top-10 right-4 md:right-12">
                    <button
                        className="btn-circle bg-[#FAF0E6] hover:bg-[#f7e7d7]  flex justify-center items-center"
                        onClick={handleDelet}
                    >
                        <DeletLogo />
                    </button>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <label tabIndex={0} className="btn-circle bg-[rgb(229,231,240)] hover:bg-[rgb(213,214,219)] flex justify-center items-center p-2">
                            <PaintLogo />
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] shadow flex flex-col gap-2 p-2 bg-stone-100 rounded-s-2xl rounded-2xl w-12 mt-2">
                            {colors.map((color) => <li key={color} className={`w-full rounded-sm ${COLORS[color]}`} onClick={() => handleColor(color)}><div className="opacity-[0]">l</div></li>)}
                        </ul>
                    </div>
                </div>
            </motion.div>
            <motion.div className={`min-h-screen py-5 px-8 ${COLORS[ref.current.color]}`}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
            >
                <h1
                    before="Title"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    spellCheck="false"
                    className="outline-0 text-2xl md:text-6xl py-4 empty:opacity-[0.2] empty:before:content-[attr(before)] font-bold"
                    id="title"
                    onInput={handleChange}>{ref.current.title}</h1>
                <h3
                    before="Tagline"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    spellCheck="false"
                    className="outline-0 text-xl  empty:opacity-[0.2] empty:before:content-[attr(before)] font-semibold"
                    id="tagline"
                    onInput={handleChange}>{ref.current.tagline}</h3>
                <p
                    className="pt-4 text-sm font-semibold"
                >{timeArr && (timeArr[0] + ". " + timeArr[2] + " " + timeArr[1] + ", " + timeArr[3] + ".")}</p>
                <div className="h-[2px] w-full bg-black rounded-full opacity-[0.7] my-2"></div>
                <p
                    before="Write Here..."
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    spellCheck="false"
                    className="outline-0 py-4 empty:opacity-[0.2] empty:before:content-[attr(before)] font-medium"
                    onInput={handleChange}
                    id="body">{ref.current.body}</p>
            </motion.div>
        </section>
    )
};

export default Fullnote;