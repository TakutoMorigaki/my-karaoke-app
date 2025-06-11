import { useState } from "react";
import { useSong } from "../context/SongContext";
import { Link } from "react-router-dom";

function Add() {
   const [inputtitle, setInputtitle] = useState('');
   const [inputartist, setInputartist] = useState('');
   const [inputcategory, setInputcategory] = useState('これから覚えたい');
   const {addSong} = useSong();
   

   const handleAddSong = () => {
        if(inputtitle.trim() === '' || inputartist.trim() === ''){
            alert('アーティスト名と、曲名は必ず入力してください')
            return;
        }
        addSong(inputtitle, inputartist, inputcategory)

        setInputtitle('');
        setInputartist('');
        setInputcategory('これから覚えたい');
   }
   
   return(
        <>
        <Link to="/home">ホームページに戻る</Link>
        <h1>曲の登録</h1>
        <input 
            type="text"
            placeholder="曲名"
            value={inputtitle}
            onChange={(e) => setInputtitle(e.target.value)}
            /><br />
            <input
                type="text"
                placeholder="アーティストまたはボカロP名"
                value={inputartist}
                onChange={(e) => setInputartist(e.target.value)}
                /><br />
            <select
                value={inputcategory}
                onChange={(e) => setInputcategory(e.target.value)}
            >
                <option value="歌いたい">歌いたい</option>
                <option value="よく歌う">よく歌う</option>
                <option value="これから覚えたい">これから覚えたい</option>
            </select><br />
            <button onClick={handleAddSong} className="addbtn">曲を登録</button>
        </>
    )
}

export default Add;