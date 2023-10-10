import { Logo } from "../../assets/logo"

export const Navbar = ({ handleInpurFilter }) => {
    return (
        <div className="navbar py-4 px-4 md:pl-6 md:pr-12 bg-[#352F44] z-50">
            <div className="navbar-start">
                <Logo />
            </div>
            <div className="navbar-end">
                <input type="text" placeholder="Search" className="input input-md w-full max-w-xs text-lg font-semibold bg-[#B9B4C7] placeholder:text-[#F5F5F5] placeholder:opacity-[0.8]" onChange={handleInpurFilter} />
            </div>
        </div >
    )
};