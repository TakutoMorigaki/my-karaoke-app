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

    const updateSong = async (title, artist, updateFields) => {
        try {
            const res = await fetch(`http://localhost:5000/api/songs/${username}/${encodeURIComponent(title)}/${encodeURIComponent(artist)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateFields)
            });

            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "更新に失敗しました");
            }

            const data = await res.json();

            setSongs(prevSongs =>
                prevSongs.map(song =>
                    song.title === title && song.artist === artist
                    ? data.song
                    : song
                )
            )
        } catch (err) {
            console.error("曲情報の更新エラー", err);
            alert("曲情報の更新に失敗しました");
        }
    }

    return(
        <SongContext.Provider value={{ songs, addSong, isDuplicateSong, deleteSong, updateSong}}>
            {children}
        </SongContext.Provider>
    );
}

export function useSong() {
    return useContext(SongContext);
}