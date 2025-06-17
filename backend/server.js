const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connected'))
.catch((err) => console.error('connect error', err));

app.get('/', (req, res) => {
    res.send('backend is working');
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});