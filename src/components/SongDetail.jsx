import { useParams, Link, useNavigate } from "react-router-dom";
import { useSong } from "../context/SongContext";

function SongDetail() {
    const {title, artist} = useParams();
    const {songs} = useSong();
    const navigate = useNavigate();
    const {deleteSong} = useSong();

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
            <Link to='/list'>曲一覧に戻る</Link>
            <h1>曲の詳細ページ</h1>
            <p>タイトル：{song.title}</p>
            <p>アーティスト：{song.artist}</p>
            <p>カテゴリ:{song.category}</p>
            <p>優先度:{song.priority}</p>
            <button onClick={handleDelete}>曲の削除</button>
        </div>
    );
}

export default SongDetail;