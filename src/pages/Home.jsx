import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
    const navigate = useNavigate();
    const { username, logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return(
        <>
        <h1>ホームページﾃﾞｽ</h1>
        <p>ようこそ{username}さん！</p>
        <button onClick={() => navigate('/add')}>曲の登録画面へ</button>
        <button onClick={handleLogout} className="Logoutbtn">ログアウト</button>
        </>
    )
}

export default Home;