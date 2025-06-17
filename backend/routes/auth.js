const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({message: '名前とパスワードを入力してください'});
    }

    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(409).json({message: 'そのユーザー名は既に使われています'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            username,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: 'ユーザー登録に成功しました'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'サーバーエラーが発生しました'});
    }
});

module.exports = router;