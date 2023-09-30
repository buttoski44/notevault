import { useNavigate } from "react-router-dom";
import { deletDocument, updateDocument } from "../../firebase/firebase.uitls";
import { Timestamp } from "firebase/firestore";
import { COLORS } from "../../pages/newnote/newnote";
import { motion } from "framer-motion";
import { CrossLogo } from "../../assets/cross.jsx";
import { PinLogo } from "../../assets/pin.jsx";
let btn_active = "btn-active";
export const Note = ({ note }) => {
    const { title, tagline, timestamp, id, pinned, color } = note;
    const timeArr = timestamp.toDate().toDateString().split(' ');
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`${id}`)
    }
    const handleDelet = () => {
        deletDocument(id, "Notes");
    }

    const handlePin = () => {
        if (pinned) {
            updateDocument({ ...note, pinned: false, pintime: null }, id)
        } else {
            updateDocument({ ...note, pinned: true, pintime: Timestamp.now() }, id)
        }
    }

    return (
        <motion.div className={`w-48 md:w-52 h-48 md:h-52 shadow-xl p-4 rounded-xl cursor-pointer flex justify-between ${COLORS[color]}`}
            initial={{ opacity: 0.5, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="flex flex-col justify-between w-full h-full gap-2" onClick={handleClick}>
                <h2 className="text-lg font-semibold text-black ">{title ? title : <div className="opacity-[0]">""</div>}</h2>
                <p className="w-full h-full overflow-hidden ">{tagline}
                </p><p className="text-xs opacity-[0.6]">{"" + timeArr[2] + " " + timeArr[1] + ", " + timeArr[3]}</p>
            </div>
            <div className="flex flex-col gap-1 pl-1 ">
                <button
                    className=" btn-circle hover:bg-[#FAF0E6] btn-xs flex justify-center items-center"
                    onClick={handleDelet}
                >
                    <CrossLogo />
                </button>
                <button
                    className={`btn-circle hover:bg-[#FAF0E6] btn-xs flex justify-center items-center ${pinned ? "bg-[#FAF0E6]" : null}`}
                    onClick={handlePin}
                >
                    <PinLogo />
                </button>
            </div>
        </motion.div>
    )
};  