import { useContext, createContext, useState } from "react";

const songContext = createContext(null);

export function Songprovider({children}) {
    const [songs, setSongs] = useState([]);

    const addSong = (title, artist, category) => {
        
        const newSong = {
        title: title.trim(),
        artist: artist.trim(),
        category
        };

        setSongs(prevSongs => [...prevSongs, newSong]);
    };
    

    return(
        <songContext.Provider value={{ songs, addSong}}>
            {children}
        </songContext.Provider>
    )
}

export function useSong() {
    return useContext(songContext);
}