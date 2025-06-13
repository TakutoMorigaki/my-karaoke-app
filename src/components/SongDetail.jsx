import { useParams, Link } from "react-router-dom";
import { useSong } from "../context/SongContext";

function SongDetail() {
    const {title, artist} = useParams();
    const {songs} = useSong();

    const song = songs.find(
        (s) => s.title === title && s.artist === artist
    );

    if(!song) {
        return <p>曲が見つかりませんでした。</p>
    }

    return (
        <div>
            <Link to='/list'>曲一覧に戻る</Link>
            <h1>曲の詳細ページ</h1>
            <p>タイトル：{song.title}</p>
            <p>アーティスト：{song.artist}</p>
            <p>カテゴリ:{song.category}</p>
            <p>優先度:{song.priority}</p>
        </div>
    );
}

export default SongDetail;