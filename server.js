const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const config = require('config');

app.use(express.json());

const db = config.get("mongoURI");

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log(err))

const port = process.env.PORT || 5000;

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/items', require('./routes/api/items'));  

if(process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        })
}

app.listen(port, () => console.log(`Server started on port ${port}`));

