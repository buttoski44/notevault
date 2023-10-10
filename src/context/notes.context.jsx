import { createContext, useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.uitls";
export const NotesContext = createContext();

export const NotesContextProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [saved, setSaved] = useState(false);

    if (saved) setTimeout(() => setSaved(false), 3000)
    useEffect(() => {
        try {
            const unsub = onSnapshot(collection(db, "Notes"), (snapShot) => {
                const data = snapShot.docs.map((snap) => (
                    snap.data()
                ))
                setNotes(data);
            });
            return (() => unsub())
        } catch (error) {
            console.error(error)
        }
    }, [])
    return <NotesContext.Provider value={{ notes, saved, setSaved }}>{children}</NotesContext.Provider>

}