import { useState } from "react";
import { useSong } from "../context/SongContext";
import { Link } from "react-router-dom";

function Add() {
   const [inputtitle, setInputtitle] = useState('');
   const [inputartist, setInputartist] = useState('');
   const [inputcategory, setInputcategory] = useState('これから覚えたい');
   const [inputpriority, setInputpriority] = useState('');
   const [inputurl, setInputUrl] = useState('');
   const {addSong} = useSong();
   const {isDuplicateSong} = useSong();

   const handleAddSong = () => {
        if(inputpriority === ''){
            alert('優先度の選択をお願いします')
            return;
        }
        if(inputtitle.trim() === '' || inputartist.trim() === ''){
            alert('アーティスト名と、曲名は必ず入力してください')
            return;
        }

        if(isDuplicateSong(inputtitle, inputartist)){
            alert('同じ曲は追加できません');
            alert('優先度の変更、カテゴリの変更は曲詳細ページからお願いします');
            return;
        }
        
        addSong(inputtitle, inputartist, inputcategory, inputpriority, inputurl);
        
        setInputtitle('');
        setInputartist('');
        setInputcategory('これから覚えたい');
        setInputpriority('');
        setInputUrl('');
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
            <input
                type="number"
                placeholder="優先度(1が最高、数が大きほど低)"
                value={inputpriority}
                onChange={(e) => setInputpriority(Number(e.target.value))}
                min="1"
            /><br />
            <select
                value={inputcategory}
                onChange={(e) => setInputcategory(e.target.value)}
            >
                <option value="よく歌う">よく歌う</option>
                <option value="気になっている">気になっている</option>
                <option value="これから覚えたい">これから覚えたい</option>
            </select><br />
            <input 
                type="url"
                placeholder="歌詞のあるwebサイトのURL(任意)"
                value={inputurl}
                onChange={(e) => setInputUrl(e.target.value)}
            /><br />
            <button onClick={handleAddSong} className="addbtn">曲を登録</button>
        </>
    )
}

export default Add;