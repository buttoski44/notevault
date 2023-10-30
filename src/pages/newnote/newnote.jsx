import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDocument } from "../../firebase/firebase.uitls";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { DeletLogo } from "../../assets/delet";
import { BackLogo } from "../../assets/back";
import { TextArea } from "../../components/textarea/textarea";
export const INITIAL_VALUE = {
    title: "",
    tagline: "",
    body: "",
    folder: "",
    timestamp: Timestamp.now(),
    pinned: false,
    pintime: null,
};

export const Newnote = () => {
    const ref = useRef(INITIAL_VALUE);
    const navigate = useNavigate();
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

    const handleChange = (e) => {
        ref.current.timestamp = Timestamp.now();
        ref.current = { ...ref.current, [e.target.id]: e.currentTarget.textContent };
    }

    return (
        <motion.section className="relative min-h-screen sm:px-16 mdl:px-32 bg-[#F5F5F5] text-black"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div
            >
                <button
                    className="absolute top-0 sm:top-8 left-0 sm:left-2 mdl:left-4 gap-4 px-2 btn-circle sm:bg-[rgb(229,231,240)] hover:bg-[rgb(213,214,219)] flex justify-center items-center"
                    onClick={() => navigate("/")}
                >
                    <BackLogo />
                </button>
                <div className="absolute top-0 right-0 flex flex-col gap-4 sm:top-8 sm:right-2 mdl:right-8">
                    <button
                        className="btn-circle sm:bg-[#FAF0E6] hover:bg-[#f7e7d7]  flex justify-center items-center"
                        onClick={handleDelet}
                    >
                        <DeletLogo />
                    </button>
                </div>
            </div>
            <div className={`min-h-screen py-8 sm:py-5 px-8 bg-[#B9B4C7]`}
            >
                <TextArea
                    placeholder="Title"
                    id="title"
                    style="text-2xl xs:text-4xl md:text-6xl py-4 font-bold"
                    handleChange={handleChange}
                />
                <TextArea
                    placeholder="Tagline"
                    id="tagline"
                    style="text-md xs:text-xl font-semibold"
                    handleChange={handleChange}
                />
                <p className="pt-4 text-xs font-semibold md:text-sm">24 june</p>
                <div className="h-[2px] w-full bg-black rounded-full opacity-[0.7] my-2"></div>
                <TextArea
                    placeholder="Write Here..."
                    id="body"
                    style="w-full h-full py-4 text-sm font-medium"
                    handleChange={handleChange}
                    content={ref.current.body}
                />
            </div>
        </motion.section>
    )
};