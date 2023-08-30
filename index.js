const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');

const password = encodeURIComponent("Shashank09#");
mongoose.connect(`mongodb+srv://shashank:${password}@cluster0.vknvzqo.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connected");
    })
    .catch(err => {
        console.log("error in connecting db");
        console.log(err);
    })

app.set('view engine', 'ejs');
//app.set('views','views');

app.use(express.urlencoded({ extended: true }));

const careerRouter = require('./server/routes/router');

app.use('/images', express.static(path.resolve(__dirname, "images")));
app.use('/css', express.static(path.resolve(__dirname, "css")));
app.use('/', careerRouter);

app.listen(5000, () => {
    console.log("Server setup");
})