const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
})

if(!username || !password){
    return res.status(400).json({message: 'そのユーザー名は既に使われています'})
}

const hashedPassword = await bcrypt(password, 10);

const newUser = new User({ username, password: hashedPassword})