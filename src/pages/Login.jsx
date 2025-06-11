import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [inputname, setInputname] = useState('');
    const [inputpass, setInputpass] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        if(inputname.trim() === ''){
            alert("ユーザー名を入力してください");
            return;
        }
        else if(inputpass.trim() === ''){
            alert("パスワードを入力してください");
            return;
        }
        login(inputname, inputpass);
        navigate('/home');
    }

    return(
        <>
        <h2>ログインフォーム</h2>
        <input 
            type="text"
            placeholder="ユーザー名"
            value={inputname}
            onChange={(e) => setInputname(e.target.value)}
        /><br />
        <input
            type="password"
            placeholder="パスワード"
            value={inputpass}
            onChange={(e) => setInputpass(e.target.value)}
        /><br />
        <button onClick={handleLogin} className="loginbtn">ログイン</button>
        </>
    )
}

export default Login;