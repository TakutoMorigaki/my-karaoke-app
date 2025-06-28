require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/song');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connected'))
.catch((err) => console.error('connect error', err));

app.get('/', (req, res) => {
    res.send('backend is working');
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});