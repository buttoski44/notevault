import { Logo } from "../../assets/logo"
import { BulbLogo } from "../../assets/bulb";
import { motion } from "framer-motion";
export const Navbar = ({ handleInpurFilter }) => {
    return (
        <div className="navbar py-4 px-4 md:pl-6 md:pr-12 bg-[#352F44] z-50">
            <div className="navbar-start">
                <Logo />
            </div>
            <div className="navbar-end gap-4">
                <div className="hidden xl:flex items-center">
                    <button className="flex items-center justify-center h-12 w-12 peer"
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        exit={{ x: 100 }}
                    >
                        <BulbLogo />
                    </button>
                    <div className="w-0 h-0 opacity-0 overflow-clip flex transition-w transition-h duration-150 ease-[cubic-bezier(1,1,0.7,0.5)] items-center rounded-lg peer-focus:w-60 peer-focus:h-12 peer-focus:opacity-100"
                    >
                        <p className="p-2 text-[#f5f5f5] text-xs font-semibold underline decoration-wavy decoration-[#e7c30f] text-right decoration-2 tracking-wide underline-offset-4">Right click on The note for preview !</p>
                    </div>
                </div>
                <input type="text" placeholder="Search" className="input input-md w-full max-w-xs text-lg font-semibold bg-[#F5F5F5] placeholder:opacity-[0.8]" onChange={handleInpurFilter} />
            </div>
        </div >
    )
};