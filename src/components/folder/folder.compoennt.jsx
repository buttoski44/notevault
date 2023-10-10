import { CrossLogo } from "../../assets/cross";

export const Folder = () => {
    return (
        <button className='px-2 border-solid border-2 border-[#352F44] rounded-lg flex gap-1 text-[#352F44]'>
            <div className=" h-full w-4 flex justify-center items-center">
                <CrossLogo />
            </div>
            <div className="text-sm font-semibold">
                <p>
                    voaishd
                </p>
            </div>
        </button>
    )
};