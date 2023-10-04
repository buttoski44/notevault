import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDocument } from "../../firebase/firebase.uitls";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { DeletLogo } from "../../assets/delet";
import { PaintLogo } from "../../assets/paint";
import { BackLogo } from "../../assets/back";

export const INITIAL_VALUE = {
    title: "",
    tagline: "",
    body: "",
    timestamp: Timestamp.now(),
    pinned: false,
    pintime: null,
    color: "default",
};

export const COLORS = {
    default: "bg-stone-100",
    oragne: "bg-[#FFA500]",
    yellow: "bg-[#ffde22]",
    indigo: "bg-[#352F44]",
    violet: "bg-[#EE82EE]",
}

export const colors = ["default", "oragne", "yellow", "indigo", "violet"]

export const Newnote = () => {
    const ref = useRef(INITIAL_VALUE);
    const navigate = useNavigate();
    const [color, setColor] = useState(COLORS.default)
    useEffect(() => {
        return () => {
            if (ref.current.title.length !== 0 || ref.current.tagline.length !== 0 || ref.current.body.length !== 0) {
                addDocument(ref.current, "Notes")
            }
        }
    }, [])

    const handleDelet = () => {
        ref.current = INITIAL_VALUE;
        navigate("/");
    }

    const handleColor = (colour) => {
        ref.current = { ...ref.current, color: colour }
        setColor(colour)
    }

    const handleChange = (e) => {
        ref.current.timestamp = Timestamp.now();
        ref.current = { ...ref.current, [e.target.id]: e.currentTarget.textContent };
    }

    return (
        <section className="relative min-h-screen sm:px-16 mdl:px-32 bg-[#F5F5F5] text-black"

        >
            <motion.div
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
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -300, opacity: 0 }}
            >
                <h1
                    before="Title"
                    contentEditable="true"
                    spellCheck="false"
                    className="outline-0 text-2xl xs:text-4xl md:text-6xl py-4 empty:opacity-[0.2] empty:before:content-[attr(before)] font-bold"
                    id="title"
                    onInput={handleChange}
                ></h1>
                <h3
                    before="Tagline"
                    contentEditable="true"
                    spellCheck="false"
                    className="outline-0 text-md xs:text-xl empty:opacity-[0.2] empty:before:content-[attr(before)] font-semibold"
                    id="tagline"
                    onInput={handleChange}
                ></h3>
                <p className="pt-4 text-xs md:text-sm font-semibold">24 june</p>
                <div className="h-[2px] w-full bg-black rounded-full opacity-[0.7] my-2"></div>
                <p before="Write Here" contentEditable="true" spellCheck="false" className="outline-0 py-4 text-sm empty:opacity-[0.2] empty:before:content-[attr(before)] font-medium" onInput={handleChange} id="body" ></p>
            </motion.div>
        </section>
    )
};