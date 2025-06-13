import { useParams, Link } from "react-router-dom";

function SongDetail() {
    const {title, artist} = useParams();

    return (
        <div>
            <Link to='/list'>曲一覧に戻る</Link>
            <h1>曲の詳細ページ</h1>
            <p>タイトル：{title}</p>
            <p>アーティスト：{artist}</p>
        </div>
    );
}

export default SongDetail;