import { useContext, createContext, useState } from "react";

const songContext = createContext(null);

export function Songprovider({children}) {
    const [songs, setSongs] = useState([]);

    const addSong = (songTitle, songArtist, songCategory) => {
        
        const newSong = {
        title: songTitle.trim(),
        artist: songArtist.trim(),
        songCategory
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