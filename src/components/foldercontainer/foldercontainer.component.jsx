import { Folder } from "../folder/folder.compoennt";
import { FolderLogo } from "../../assets/folders";
import { AddLogo } from "../../assets/add";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { FolderContext } from "../../context/folder.context";
import { updateDocument, addDocument } from "../../firebase/firebase.uitls";
export const FolderContainer = ({ setFolderFilter, folderFilter }) => {
    let folder = useContext(FolderContext);
    const [showInput, setShowInput] = useState(false);
    const ref = useRef("");
    const handleUpdate = (e, name) => {
        switch (e.currentTarget.id) {
            case "add":
                if (ref.current !== "") {
                    folder.folderNames.push(ref.current);
                    updateDocument(folder, folder.id, "Folders")
                    ref.current = "";
                    setShowInput(!showInput)
                }
                break;
            case "delet":
                const newFolderArray = folder.folderNames.filter((folderName) => folderName !== name)
                updateDocument({ ...folder, folderNames: newFolderArray }, folder.id, "Folders")
                break;

            default:
                break;
        }
    }

    const handleshowInput = () => {
        ref.current = ""
        setShowInput(!showInput)
    }

    const handleChange = (e) => {
        ref.current = e.target.value;
    }
    return (
        <section className="flex items-center gap-3 pt-3 xl:w-full h-14">
            <AnimatePresence>
                {
                    showInput ?
                        <motion.div className="cursor-pointer join"
                        >
                            <input type="text" onChange={handleChange} className="input input-sm input-bordered border-[#B9B4C7] border-2 bg-[#f5f5f5] w-full font-semibold join-item" />
                            <button className="bg-[#B9B4C7] join-item"
                                id="add"
                                onClick={handleUpdate}
                            > <AddLogo /></button>
                        </motion.div> :
                        <motion.div className="flex items-center gap-2 overflow-scroll no-scrollbar ">
                            {
                                folderFilter ?
                                    <Folder key={folderFilter} name={folderFilter} cross="false" /> :

                                    folder.folderNames?.map((name) => <Folder key={name} name={name} handleDelet={handleUpdate} setFolderFilter={setFolderFilter} />
                                    )
                            }
                        </motion.div>

                }
            </AnimatePresence>
            {folderFilter ?
                <button className="bg-red-300 rounded-full"
                    onClick={() => setFolderFilter(null)}
                >
                    <AddLogo />
                </button> :
                showInput ?
                    <button className="bg-red-300 rounded-full"
                        onClick={handleshowInput}
                    >
                        <FolderLogo />
                    </button> :
                    <button className="rotate-45 bg-green-100 rounded-full"
                        onClick={handleshowInput}
                    >
                        <AddLogo />
                    </button>
            }
        </section>
    )
};