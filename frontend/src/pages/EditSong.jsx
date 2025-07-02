import { useParams, useNavigate } from "react-router-dom";
import { useSong } from "../context/SongContext";
import { useState, useEffect } from "react";

function EditSong() {
    const { title, artist } = useParams();
    const { songs, updateSong } = useSong();
    const navigate = useNavigate();

    const [ category, setCategory ] = useState();
    const [ priority, setPriority ] = useState(1);
    const [ url, setUrl ] = useState('');
    const [ memo, setMemo ] = useState('');

    useEffect(() => {
        const song = songs.find(
            s => s.title === title && s.artist === artist
        );

        if (song) {
            setCategory(song.category);
            setPriority(song.priority);
            setUrl(song.url || '');
            setMemo(song.memo || '');
        }
    }, [songs, title, artist]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateSong(title, artist, {
            category,
            priority: Number(priority),
            url,
            memo
        });
        navigate("/list");
    };

    return(
        <>
            <h2>曲情報の編集</h2>
            <form onSubmit={handleSubmit}>
                <label>カテゴリ：</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="よく歌う">よく歌う</option>
                    <option value="気になっている">気になっている</option>
                    <option value="これから覚えたい">これから覚えたい</option>
                </select>
                <br />

                <label>優先度：</label>
                <input
                    type='number'
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    min='1'
                />
                <br />

                <label>歌詞サイトのURL：</label>
                <input
                    type='text'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <br />

                <label>備考</label>
                <input
                    type='text'
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                />
                <br />

                <button type="submit">更新</button>
            </form>
        </>
    );
}

export default EditSong;