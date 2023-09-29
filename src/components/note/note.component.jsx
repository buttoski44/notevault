import { useNavigate } from "react-router-dom";
import { deletDocument, updateDocument } from "../../firebase/firebase.uitls";
import { Timestamp } from "firebase/firestore";
import { COLORS } from "../../pages/newnote/newnote";
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
        <div className={`w-48 md:w-52 h-48 md:h-52 shadow-xl p-4 rounded-xl cursor-pointer flex justify-between ${COLORS[color]}`}>
            <div className="w-full h-full flex flex-col justify-between gap-2" onClick={handleClick}>
                <h2 className="text-black text-lg font-semibold ">{title ? title : <div className="opacity-[0]">""</div>}</h2>
                <p className="w-full h-full overflow-hidden ">{tagline}
                </p><p className="text-xs opacity-[0.6]">{"" + timeArr[2] + " " + timeArr[1] + ", " + timeArr[3]}</p>
            </div>
            <div className=" flex flex-col gap-1 pl-1">
                <button
                    className=" btn-circle hover:bg-[#FAF0E6] btn-xs flex justify-center items-center"
                    onClick={handleDelet}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <button
                    className={`btn-circle hover:bg-[#FAF0E6] btn-xs flex justify-center items-center ${pinned ? "bg-[#FAF0E6]" : null}`}
                    onClick={handlePin}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" id="pin" x="0" y="0" enableBackground="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve"><path id="path5" stroke="none" d="M21.164 6.027a1.52 1.52 0 0 0-.375.028c-.48.094-.86.401-1.045.841a4.038 4.038 0 0 0-.163 2.663l-1.996 1.994a6.981 6.981 0 0 0-7.322.406 1.455 1.455 0 0 0-.615 1.07c-.04.45.12.891.437 1.21l2.454 2.454-6.444 8.479a.501.501 0 0 0 .399.803.506.506 0 0 0 .302-.104l8.479-6.443 2.453 2.453a1.518 1.518 0 0 0 1.209.44 1.456 1.456 0 0 0 1.07-.618 6.984 6.984 0 0 0 .408-7.322l2.014-2.014a4.026 4.026 0 0 0 2.615-.174 1.4 1.4 0 0 0 .838-1.043 1.524 1.524 0 0 0-.416-1.375l-3.302-3.304a1.523 1.523 0 0 0-1-.444zm-.184 1.01a.53.53 0 0 1 .475.143l3.302 3.302a.534.534 0 0 1 .145.475.415.415 0 0 1-.244.314 3.05 3.05 0 0 1-2.202.057.5.5 0 0 0-.521.12l-2.498 2.497a.501.501 0 0 0-.072.618 5.985 5.985 0 0 1-.178 6.57.457.457 0 0 1-.338.191.517.517 0 0 1-.414-.15l-2.709-2.71c-.015-.02-.023-.044-.041-.062l-2.12-2.12c-.017-.019-.042-.025-.062-.04l-2.71-2.71a.518.518 0 0 1-.149-.415.455.455 0 0 1 .191-.338 5.964 5.964 0 0 1 3.416-1.072c1.09 0 2.186.299 3.155.897a.5.5 0 0 0 .615-.073l2.482-2.482a.5.5 0 0 0 .118-.526 3.046 3.046 0 0 1 .043-2.238.422.422 0 0 1 .316-.248zm-7.727 10.367 1.309 1.309-5.451 4.142 4.142-5.45z"></path></svg>
                </button>
            </div>
        </div>
    )
};  