import { useParams, Link, useNavigate } from "react-router-dom";
import { useSong } from "../context/SongContext";
import { useState } from "react";

function SongDetail() {
    const {title, artist} = useParams();
    const {songs, deleteSong, updateSongPriority, updateSongUrl} = useSong();
    const navigate = useNavigate();
    
    const song = songs.find(
        (s) => s.title === title && s.artist === artist
    );
    
    const [newPriority, setNewPriority] = useState(song?.priority || '');
    const [newUrl, setNewUrl] = useState(song.url || '');

    if(!song) {
        return <p>曲が見つかりませんでした。</p>
    }

    const handleDelete = () => {
        const confirmed = window.confirm("この曲を削除しますか？");
        if(confirmed){
            deleteSong(song.title, song.artist);
            alert('削除されました');
            navigate('/list');
        }
    }

    const handlePriorityUpdate = () => {
        if(newPriority === ''){
            alert('優先度を入力してください');
            return;
        }
        updateSongPriority(song.title, song.artist, newPriority);
        alert('優先度を更新しました');
    };

    const handleUrlUpdate = () => {
        updateSongUrl(song.title, song.artist, newUrl);
        alert('歌詞URLを更新しました');
    }

    return (
        <div>
            <Link to='/list'>曲一覧に戻る</Link>
            <h1>曲の詳細ページ</h1>
            <p>タイトル：{song.title}</p>
            <p>アーティスト：{song.artist}</p>
            <p>カテゴリ:{song.category}</p>
            {song.url && (
                <p>
                    歌詞を見る：<a href={song.url} target="_blank" rel="noopener noreferrer">リンク</a>
                </p>
            )}
            <div>
                <label>優先度の変更：</label>
                <input
                    type='number'
                    value={newPriority}
                    min='1'
                    onChange={(e) => setNewPriority(e.target.value)}
                /> 
                <button onClick={handlePriorityUpdate}>更新</button>
            </div>
            <br />
            <div>
                <label>URLの変更：</label>
                <input
                    type="url"
                    placeholder="新しい歌詞のURL"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                />
                <button onClick={handleUrlUpdate}>更新</button>
            </div>
            <button onClick={handleDelete}>曲の削除</button>
        </div>
    );
}

export default SongDetail;