import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSong } from "../context/SongContext";
import CategoryBlock from "../components/CategoryBlock";

function Home() {
    const navigate = useNavigate();
    const { username, logout } = useAuth();
    const {songs} = useSong();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const puOftenSing = songs.filter(song => song.category === "よく歌う")
                             .sort((a, b) => a.priority - b.priority)
                             .slice(0, 3)
    const puWantToSing = songs.filter(song => song.category === "気になっている")
                              .sort((a, b) => a.priority - b.priority)
                              .slice(0, 3)
    const puWantToMem = songs.filter(song => song.category === 'これから覚えたい')
                             .sort((a, b) => a.priority - b.priority)
                             .slice(0, 3)

                             return(
        <>
        <h1>カラオケの曲記録アプリ</h1>
        <p>ようこそ{username}さん！</p>
        <button onClick={() => navigate('/add')}>曲の登録画面へ</button>
        <button onClick={() => navigate('/list')}>曲一覧へ</button>
        <button onClick={handleLogout} className="Logoutbtn">ログアウト</button>
        <div>
            <h2>各カテゴリのpickup</h2>
            <CategoryBlock title='歌いたい曲' songs={puOftenSing} />
            <CategoryBlock title='気になっている曲' songs={puWantToSing} />
            <CategoryBlock title='覚えたい曲' songs={puWantToMem} />
        </div>
        </>
    )
}

export default Home;