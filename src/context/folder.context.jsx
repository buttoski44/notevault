import { createContext, useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.uitls";
export const FolderContext = createContext();

export const FolderContextProvider = ({ children }) => {
    const [folder, setFolder] = useState([]);

    useEffect(() => {
        try {
            const unsub = onSnapshot(collection(db, "Folders"), (snapShot) => {
                const data = snapShot.docs.map((snap) => (
                    snap.data()
                ))
                setFolder(data[0]);
            });
            return (() => unsub())
        } catch (error) {
            console.error(error)
        }
    }, [])
    return <FolderContext.Provider value={folder}>{children}</FolderContext.Provider>

}