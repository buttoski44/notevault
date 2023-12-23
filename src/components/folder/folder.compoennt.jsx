import { AddLogo } from "../../assets/add";

export const Folder = ({ name, handleDelet, setFolderFilter }) => {


    return (
        <div className='px-1 border-solid border-2 border-[#B9B4C7] rounded-lg flex gap-1 text-[#352F44] items-center'

        > {
                setFolderFilter &&
                <button className="flex items-center justify-center w-4 h-full join-item"
                    id="delet"
                    onClick={(e) => handleDelet(e, name)}
                >
                    <AddLogo />
                </button>
            }
            <div className="flex items-center justify-center h-full text-sm font-semibold cursor-pointer"
                onClick={() => setFolderFilter && setFolderFilter(name)}
            >
                <p className="h-full p-1">
                    {name}
                </p>
            </div>
        </div>
    )
};