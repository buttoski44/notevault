import { CrossLogo } from "../../assets/cross";

export const Folder = ({ name, handleDelet, setFolderFilter }) => {


    return (
        <div className='px-1 border-solid border-2 border-[#B9B4C7] rounded-lg flex gap-1 text-[#352F44] items-center'

        > {
                setFolderFilter &&
                <button className="h-full w-4 flex justify-center items-center join-item"
                    id="delet"
                    onClick={(e) => handleDelet(e, name)}
                >
                    <CrossLogo />
                </button>
            }
            <div className="text-sm font-semibold flex justify-center items-center h-full cursor-pointer"
                onClick={() => setFolderFilter && setFolderFilter(name)}
            >
                <p className="h-full p-1">
                    {name}
                </p>
            </div>
        </div>
    )
};