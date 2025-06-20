import { useParams, Link, useNavigate } from "react-router-dom";
import { useSong } from "../context/SongContext";
import { useState } from "react";

function SongDetail() {
    const {title, artist} = useParams();
    const {songs, deleteSong, updateSongPriority, updateSongUrl, updateSongMemo} = useSong();
    const navigate = useNavigate();
    
    const song = songs.find(
        (s) => s.title === title && s.artist === artist
    );
    
    const [newPriority, setNewPriority] = useState(song?.priority || '');
    const [newUrl, setNewUrl] = useState(song.url || '');
    const [newMemo, setMemo] = useState(song.memo || '');

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

    const handleMemoUpdate = () => {
        updateSongMemo(song.title, song.artist, newMemo);
        alert('備考を保存しました');
    }

    return (
        <div>
            <div>
                <Link to='/home'>ホームページに戻る</Link> |{" "}
                <Link to='/list'>曲一覧に戻る</Link>
            </div>
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
                    placeholder="優先度(1が最高、数が大きほど低)"
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
            </div><br />
            <div>
                <label>備考：</label>
                <textarea
                    rows="4"
                    cols="40"
                    value={newMemo}
                    onChange={(e) => setMemo(e.target.value)}
                />
                <button onClick={handleMemoUpdate}>備考を保存</button>
            </div><br />
            <button onClick={handleDelete}>曲の削除</button>
        </div>
    );
}

export default SongDetail;