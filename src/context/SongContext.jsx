import { useContext, createContext, useState } from "react";

const SongContext = createContext(null);

export function Songprovider({children}) {
    const [songs, setSongs] = useState([]);

    const isDuplicateSong = (title, artist) => {
        return songs.find(song =>
            song.title === title && song.artist === artist
        ) !== undefined;
    }
    
    const addSong = (songtitle, songartist, songcategory, songpriority, songurl) => {
        
        const newSong = {
        title: songtitle.trim(),
        artist: songartist.trim(),
        category: songcategory,
        priority: Number(songpriority),
        url: songurl.trim(),
        memo: ""
        };

        setSongs(prevSongs => [...prevSongs, newSong]);
    };

    const deleteSong = (title, artist) => {
        setSongs(prevSongs =>
            prevSongs.filter(song =>
                !(song.title === title && song.artist === artist)
            )
        );
    };

    const updateSongPriority = (title, artist, newPriority) => {
        setSongs(prevSongs => 
            prevSongs.map(song =>
                song.title === title && song.artist === artist ?
                {...song, priority: Number(newPriority)}
                : song
            )
        );
    }

    const updateSongUrl = (title, artist, newUrl) => {
        setSongs(prevSongs => 
            prevSongs.map(song => 
                song.title === title && song.artist === artist
                ? {...song, url: newUrl}
                : song
            )
        );
    };

    const updateSongMemo = (title, artist, newMemo) => {
        setSongs(prevSongs => 
            prevSongs.map(song => 
                song.title === title && song.artist === artist
                ? {...song, memo: newMemo}
                : song
            )
        )
    }


    return(
        <SongContext.Provider 
            value={{ songs, addSong, isDuplicateSong, deleteSong,
                     updateSongPriority, updateSongUrl, updateSongMemo }}>
            {children}
        </SongContext.Provider>
    );
}

export function useSong() {
    return useContext(SongContext);
}