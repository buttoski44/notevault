import { motion } from "framer-motion";
export const Loader = ({ type }) => {
    const loader = [1, 2, 3, 4, 5, 6]
    if (type === "fullnote") return (
        <motion.section className="w-full relative h-screen md:px-32 bg-[#F5F5F5] text-black"
            initial={{ x: 0, opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
        >
            <div className="w-full h-screen py-5 px-8 bg-[#F5F5F5] flex flex-col gap-4 animate-pulse"
            >
                <div className="absolute flex flex-col gap-4 px-2 top-8 md:top-10 right-4 md:right-12">
                    <div
                        className="btn-circle bg-[#B9B4C7]"
                    >
                    </div>
                    <div className="btn-circle bg-[#B9B4C7]">
                    </div>
                </div>
                <div className="w-1/2 h-12 outline-0 bg-[#B9B4C7] rounded-md"></div>
                <div className="w-full h-8 bg-[#B9B4C7] rounded-md outline-0"></div>
                <p className="w-1/6 h-4 bg-[#B9B4C7] rounded-md "></p>
                <div className="h-[2px] w-full bg-[#B9B4C7] rounded-full"></div>
                <div className="w-full h-full rounded-md bg-[#B9B4C7]"></div>
            </div>
        </motion.section>
    )

    return (
        <motion.section className=" h-full w-full bg-[#F5F5F5] px-4 md:px-12 py-1 md:pt-10"
            initial={{ x: 0, opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
        >
            <div className="pt-2 w-[5%] h-8 rounded-md  bg-[#B9B4C7] animate-pulse mb-4 ">
            </div>
            <div className="grid justify-start w-1/2 grid-cols-2 gap-1 md:grid-cols-3 md:gap-5 ">
                {loader.map((box) => <div
                    className="w-48 md:w-52 h-48 md:h-52 shadow-xl p-4 rounded-xl flex justify-between border-solid border-[0.1rem] border-[#d5d2dd] animate-pulse"
                >
                    <div className="flex flex-col w-full h-full gap-4 bg-stone-100 ">
                        <div className="w-full h-8 bg-[#B9B4C7] rounded-md"></div>
                        <div className="w-full h-6 bg-[#B9B4C7] rounded-md"></div>
                        <div className="w-1/2 h-4 bg-[#B9B4C7] rounded-md"></div>
                    </div>
                </div>)}
            </div>
        </motion.section>
    )
};