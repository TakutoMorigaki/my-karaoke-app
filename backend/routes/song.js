const express = require('express');
const Song = require('../models/Song');

const router = express.Router();

router.post('/', async (req, res) => {
    const {username, title, artist, category, priority, url, memo} = req.body;

    if (!username || !title || !artist || !category || priority === undefined){
        return res.status(400).json({message: '必要な情報が不足しています'})
    }

    try {
        const newSong = new Song({
            username,
            title: title.trim(),
            artist: artist.trim(),
            category,
            priority: Number(priority),
            url: url?.trim() || '',
            memo: memo?.trim() || ''
        });

        await newSong.save();
        res.status(201).json({message: '曲を登録しました', song: newSong});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'サーバーエラーが発生しました'});
    }
});

module.exports = router;

router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const songs = await Song.find({ username });
        res.status(200).json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'サーバーエラーが発生しました'});
    }
});

router.delete('/:username/:title/:artist', async (req, res) => {
    const { username, title, artist } = req.params;

    try {
        const deleted = await Song.findOneAndDelete({ username, title, artist });
        if(!deleted) {
            return res.status(404).json({ message: '曲が見つかりません'});
        }
        res.json({ message: '曲を削除しました'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '削除中にエラーが発生しました'});
    }
});