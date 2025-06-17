import { useSong } from "../context/SongContext";
import CategoryBlock from "../components/CategoryBlock";
import { Link } from "react-router-dom";

function SongList() {
    const {songs} = useSong();

    const OftenSing = songs.filter(song => song.category === "よく歌う");
    const WantToSing = songs.filter(song => song.category === "気になっている");
    const WantToMem = songs.filter(song => song.category === "これから覚えたい");

    return(
        <>
        <Link to="/home">ホームページに戻る</Link>
        <h2>登録曲一覧</h2>
        <CategoryBlock title="よく歌う曲" songs={OftenSing} />
        <CategoryBlock title="気になっている曲" songs={WantToSing} />
        <CategoryBlock title="これから覚えたい曲" songs={WantToMem} />
        </>
    )
}

export default SongList;