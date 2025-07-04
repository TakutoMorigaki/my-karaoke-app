import { useParams, Link, useNavigate } from "react-router-dom";
import { useSong } from "../context/SongContext";

function SongDetail() {
    const {title, artist} = useParams();
    const {songs, deleteSong } = useSong();
    const navigate = useNavigate();
    
    const song = songs.find(
        (s) => s.title === title && s.artist === artist
    );

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
                <label>優先度：{song.priority}</label>
            </div>
            <br />
            
            <div>
                <label>備考</label>
                <p>{song.memo}</p>
            </div>
            
            <button onClick={handleDelete}>曲の削除</button>
            <br />
            <br />

            <div>
                <Link to={`/edit/${encodeURIComponent(song.title)}/${encodeURIComponent(song.artist)}`}>
                    編集
                </Link>
            </div>
        </div>
    );
}

export default SongDetail;