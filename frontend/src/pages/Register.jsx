import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
    const [ inputname, setInputname ] = useState('');
    const [ inputpass, setInputpass ] = useState('');
    const {register} = useAuth();
    const navigate = useNavigate();

    const handleRegister = async () => {
        if(inputname.trim() === '') {
            alert('ユーザー名を記入してください');
            return;
        }
        if(inputpass.trim() === '') {
            alert('パスワードを記入してください');
            return;
        }

        const result = confirm("このユーザー名とパスワードでよろしいですか？");
        if(!result)    return;

        await register(inputname, inputpass);
        
        const isLogin = localStorage.getItem("isAuthenticated") === "true";
        if(isLogin){
            navigate("/home");
        }
    }

    return(
        <>
            <div>
                <Link to='/'>ログインページ</Link> 
            </div>
            <h2>登録ページ</h2>

            <input
                type='text'
                placeholder="ユーザー名"
                value={inputname}
                onChange={(e) => setInputname(e.target.value)}
            /><br />

            <input
                type='text'
                placeholder="パスワード"
                value={inputpass}
                onChange={(e) => setInputpass(e.target.value)}
            /><br />

            <button onClick={handleRegister}>新規登録</button>
        </>
    )
}

export default Register;