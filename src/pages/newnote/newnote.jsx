import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDocument } from "../../firebase/firebase.uitls";
import { Timestamp } from "firebase/firestore";

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
    yellow: "bg-[#FFFF00]",
    indigo: "bg-[#4B0082]",
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
        <section className="relative min-h-screen md:px-32 bg-[#F5F5F5] text-black">
            <div className={`min-h-screen py-5 px-8 ${COLORS[ref.current.color]}`}>
                <h1
                    before="Title..."
                    contentEditable="true"
                    spellCheck="false"
                    className="outline-0 text-2xl md:text-6xl py-4 empty:opacity-[0.2] empty:before:content-[attr(before)]"
                    id="title"
                    onInput={handleChange}
                ></h1>
                <h3
                    before="Tagline..."
                    contentEditable="true"
                    spellCheck="false"
                    className="outline-0 text-xl empty:opacity-[0.2] empty:before:content-[attr(before)]"
                    id="tagline"
                    onInput={handleChange}
                ></h3>
                <p className="pt-4 text-sm">24 june</p>
                <div className="absolute top-8 md:top-10 right-4 md:right-12 flex flex-col gap-4 px-2">
                    <button
                        className="btn-circle bg-[rgb(229,231,240)] hover:bg-[rgb(213,214,219)]  flex justify-center items-center"
                        onClick={handleDelet}
                    >
                        <svg className="w-6 h-6" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="800px" height="800px" viewBox="0 0 482.428 482.429"
                            xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
			c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
			h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
			C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
			C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
			c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
			c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
			V115.744z"/>
                                    <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
                                    <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
                                    <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
                                </g>
                            </g>
                        </svg>
                    </button>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <label tabIndex={0} className="btn-circle bg-[rgb(229,231,240)] hover:bg-[rgb(213,214,219)]  flex justify-center items-center p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="800px" height="50px"
                                viewBox="0 0 482.428 482.429"
                                xmlSpace="preserve"
                            >
                                <path
                                    fill="none"
                                    stroke="#000"
                                    strokeMiterlimit="10"
                                    strokeWidth="20"
                                    d="M419.1 337.45a3.94 3.94 0 00-6.1 0c-10.5 12.4-45 46.55-45 77.66 0 27 21.5 48.89 48 48.89h0c26.5 0 48-22 48-48.89 0-31.11-34.3-65.26-44.9-77.66zM387 287.9L155.61 58.36a36 36 0 00-51 0l-5.15 5.15a36 36 0 000 51l52.89 52.89 57-57L56.33 263.2a28 28 0 00.3 40l131.2 126a28.05 28.05 0 0038.9-.1c37.8-36.6 118.3-114.5 126.7-122.9 5.8-5.8 18.2-7.1 28.7-7.1h.3a6.53 6.53 0 004.57-11.2z"
                                ></path>
                            </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] shadow flex flex-col gap-2 p-2 bg-stone-100 rounded-s-2xl rounded-2xl w-12 mt-2">
                            {colors.map((color) => <li className={`w-full rounded-sm ${COLORS[color]}`} onClick={() => handleColor(color)}><div className="opacity-[0]">l</div></li>)}
                        </ul>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-gray-400 rounded-full opacity-[0.3] my-2"></div>
                <p before="Write Here..." contentEditable="true" spellCheck="false" className="outline-0 py-4 empty:opacity-[0.2] empty:before:content-[attr(before)]" onInput={handleChange} id="body" ></p>
            </div>
        </section>
    )
};