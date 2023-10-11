import { useNavigate } from "react-router-dom";
import { deletDocument, updateDocument } from "../../firebase/firebase.uitls";
import { Timestamp } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { CrossLogo } from "../../assets/cross.jsx";
import { MoreLogo } from "../../assets/more";
import { PinLogo } from "../../assets/pin.jsx";
import { DeletLogo } from "../../assets/delet";
import { useState } from "react"
export const Note = ({ note, preview, setPreview }) => {
    const [more, setMore] = useState(false);
    const { title, tagline, timestamp, id, pinned } = note;
    const timeArr = timestamp.toDate().toDateString().split(' ');
    const navigate = useNavigate();
    const handleClick = (e) => {
        if (e.type === 'click') {
            navigate(`${id}`)
        } else if (e.type === 'contextmenu') {
            preview.obj = note;
            setPreview({
                ...preview, visible: true
            })
        }
    }
    const handleDelet = () => {
        deletDocument(id, "Notes");
        setPreview({
            visible: false,
            obj: {}
        });
    }

    const handleMore = () => {
        setMore(!more)
    }

    const handleBlur = () => {
        setMore(false)
    }

    const handlePin = () => {
        if (pinned) {
            updateDocument({ ...note, pinned: false, pintime: null }, id)
        } else {
            updateDocument({ ...note, pinned: true, pintime: Timestamp.now() }, id)
        }
        setMore(false)
    }

    return (

        <motion.div className={`relative w-full sm:w-48 md:w-52 h-40 sm:h-48 md:h-52 shadow-xl p-4 rounded-xl cursor-pointer overflow-clip border-solid border-2 border-[#B9B4C7] bg-[#d5d2dd]`}
            layout
            initial={{ opacity: 0.5, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.2, scale: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onBlur={handleBlur}
        >
            <AnimatePresence>
                {more &&
                    <motion.div className="absolute z-10 top-0 left-0 w-full h-full bg-[#f5f5f5]/50 backdrop-blur-sm p-4 flex items-center justify-center gap-2"
                        key="cover"
                        initial={{ opacity: 0.5, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0.5, y: 200 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center justify-center w-10 h-10 hover:bg-[#B9B4C7] rounded-md border-solid border-2 border-[#B9B4C7] transition-colors duration-75"
                            onClick={handleDelet}
                        >
                            <DeletLogo />
                        </div>
                        <div className="flex items-center justify-center h-10 w-10 hover:bg-[#B9B4C7] rounded-md border-solid border-2 border-[#B9B4C7] transition-colors duration-75"
                            onClick={handlePin}
                        >
                            <PinLogo />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            <div className="flex justify-between w-full h-full">
                <div className="flex flex-col justify-between w-full h-full gap-2"
                    onClick={handleClick}
                    onContextMenu={handleClick}
                >
                    <h2 className="text-ellipsis overflow-hidden w-full h-[25%] font-bold text-black text-md sm:text-lg">{title ? title : <div className="opacity-[0]">""</div>}</h2>
                    <p className="w-full h-full overflow-hidden text-xs font-semibold text-ellipsis sm:text-sm ">{tagline}
                    </p><p className="font-bold text-xs/3 sm:text-xs">{"" + timeArr[2] + " " + timeArr[1] + ", " + timeArr[3]}</p>
                </div>
                <div className="flex flex-col gap-1 pl-1 ">
                    <button
                        className={`relative btn-circle ${more ? "hover:bg-[#B9B4C7]" : "hover:bg-[#f5f5f5]"} btn-xs flex justify-center items-center z-20`}
                        onClick={handleMore}
                    >
                        <AnimatePresence>
                            {more ? <CrossLogo /> : <MoreLogo />}
                        </AnimatePresence>
                    </button>
                    {
                        pinned &&
                        <div
                            className="btn-circle btn-xs flex justify-center items-center bg-[#B9B4C7]"
                            onClick={handlePin}
                        >
                            <PinLogo />
                        </div>
                    }
                </div>
            </div>
        </motion.div>
    )
};  