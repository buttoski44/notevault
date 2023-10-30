import { useNavigate } from "react-router-dom";
import { deletDocument, updateDocument } from "../../firebase/firebase.uitls";
import { Timestamp } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { MoreLogo } from "../../assets/more";
import { PinLogo } from "../../assets/pin.jsx";
import { DeletLogo } from "../../assets/delet";
import { useContext, useState, useMemo } from "react"
import { FALSE_STATE } from "../notescontainer/notescontainer.component";
import { AddToFolder } from "../../assets/addToFolder"
import { FolderContext } from "../../context/folder.context";
import { AddLogo } from "../../assets/add";
export const Note = ({ note, preview, setPreview }) => {
    const folder = useContext(FolderContext);
    const [more, setMore] = useState(false);
    const [menu, setMenu] = useState(false);
    const { title, tagline, timestamp, id, pinned } = useMemo(() => note, [note])
    const timeArr = useMemo(() => timestamp.toDate().toDateString().split(' '), [timestamp])
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
        setPreview(FALSE_STATE);
    }

    const handleMore = () => {
        if (menu) setMenu(false)
        setMore(!more)
    }

    const handleMenu = () => {
        if (more) setMore(false)
        setMenu(!menu)
    }

    const handleBlur = () => {
        setMore(false)
    }

    const handlesetFolder = (name) => {
        updateDocument({ ...note, folder: name }, id, "Notes")
    }

    const handlePin = () => {
        if (pinned) {
            updateDocument({ ...note, pinned: false, pintime: null }, id, "Notes")
        } else {
            updateDocument({ ...note, pinned: true, pintime: Timestamp.now() }, id, "Notes")
        }
        setMore(false)
    }

    const handleSelectMenu = (name) => {
        handlesetFolder(name)
        setMenu(!menu)
    }

    return (

        <motion.div className="relative w-full sm:w-48 md:w-52 h-40 sm:h-48 md:h-52 shadow-xl p-4 rounded-xl cursor-pointer overflow-clip border-solid border-2 border-[#B9B4C7] bg-[#d5d2dd] z-10"
            layout
            initial={{ opacity: 0.5, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.2, scale: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
        // onBlur={handleBlur}
        >
            <AnimatePresence>
                {more &&
                    <motion.div className="absolute top-0 left-0 w-full h-full bg-[#f5f5f5]/50 backdrop-blur-sm p-4 flex items-center justify-center gap-2 z-30"
                        key="cover1"
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
                        <div className="flex items-center justify-center h-10 w-10 p-1 hover:bg-[#B9B4C7] rounded-md border-solid border-2 border-[#B9B4C7] transition-colors duration-75 "
                            onClick={handlePin}
                        >
                            <PinLogo />
                        </div>
                    </motion.div>
                }
                {menu &&
                    <motion.div className="absolute z-30 top-0 left-0 w-full h-full backdrop-blur-sm"
                        key="cover2"
                        initial={{ opacity: 0.5, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0.5, y: 200 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ul className=" w-[75%] h-full overflow-scroll no-scrollbar shadow bg-[#f5f5f5]/50 backdrop-blur-sm p-2">
                            <li key="no" className="px-1 py-2 text-sm font-bold hover:bg-[#B9B4C7]/20 rounded-md" onClick={() => handleSelectMenu("")}>default</li>
                            {folder.folderNames.map((name) => <li key={name} className="px-1 py-2 text-sm font-semibold hover:bg-[#B9B4C7]/50 rounded-md"
                                onClick={() => handleSelectMenu(name)}
                            >{name}</li>)}
                        </ul>
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
                        className={`relative btn-circle ${more ? "hover:bg-[#B9B4C7]" : "hover:bg-[#f5f5f5]"} btn-xs flex justify-center items-center z-50`}
                        onClick={handleMore}
                    >
                        <AnimatePresence>
                            {more ? <AddLogo /> : <MoreLogo />}
                        </AnimatePresence>
                    </button>
                    <button
                        className={`relative btn-circle ${more ? "hover:bg-[#B9B4C7]" : "hover:bg-[#f5f5f5]"} btn-xs flex justify-center items-center z-50 `}
                        onClick={handleMenu}
                    >
                        <AnimatePresence>
                            {menu ? <AddLogo /> : <AddToFolder />}
                        </AnimatePresence>

                    </button>
                    {
                        pinned &&
                        <div
                            className="btn-circle btn-xs flex justify-center items-center bg-[#B9B4C7] p-[0.15rem]"
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