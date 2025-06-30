import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext'

const SongContext = createContext(null);

export function Songprovider({children}) {
    const [songs, setSongs] = useState([]);
    const { username, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchSongs = async () => {
            if(!isAuthenticated || !username) 
                return;
        
        try {
            const res = await fetch(`http://localhost:5000/api/songs/${username}`);
            const data = await res.json();
            setSongs(data);
        } catch (error) {
            console.error("曲の取得に失敗しました", error);
        }
    };

    fetchSongs();
    }, [username, isAuthenticated]);

    const isDuplicateSong = (title, artist) => {
        return songs.find(song =>
            song.title === title && song.artist === artist
        ) !== undefined;
    }
    
    const addSong = async (songtitle, songartist, songcategory, songpriority, songurl) => {
        
        const newSong = {
        username,
        title: songtitle.trim(),
        artist: songartist.trim(),
        category: songcategory,
        priority: Number(songpriority),
        url: songurl?.trim() || '',
        memo: "",
        };

        try{
            const res = await fetch("http://localhost:5000/api/songs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newSong)
            });

            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "登録に失敗しました");
            }

            const data = await res.json();
            setSongs(prev => [...prev, data.song]);
        } catch (err) {
            console.error("曲の登録エラー", err);
            alert("曲の登録に失敗しました");
        }
    };

    const deleteSong = async (title, artist) => {
        try {
            const res = await fetch(`http://localhost:5000/api/songs/${username}/${encodeURIComponent(title)}/${encodeURIComponent(artist)}`, {
                method: 'DELETE',
            });

            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || '削除に失敗しました');
            }

            setSongs(prevSongs =>
                prevSongs.filter(song =>
                    !(song.title === title && song.artist === artist)
                )
            );
        } catch (err) {
            console.error("曲の削除エラー", err);
            alert("曲の削除に失敗しました");
        }
            
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