const express = require('express');
const app = express();
const Admin = require('./models/admin');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://127.0.0.1:27017/genie', { useNewUrlParser: true, useUnifiedTopology: true })
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





































// const express = require('express');
// const mongoose = require('mongoose');
// const dbConfig = require('./config/db.config');
// const path = require('path');
// const auth = require('./middlewares/auth');
// const errors = require('./middlewares/errors');

// const { unless } = require('express-unless');

// const app = express();


// app.set('view engine', 'ejs')
// app.use(express.static(__dirname));

// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(
//     () => {
//         console.log("Database connected");
//     },
//     (error) => {
//         console.log("Database cannot be connected :" + error);
//     }
// )



// app.use(express.json());

//const publicRoutes = ['./server/routes/router/home_head'];


// auth.authenticateToken.unless = unless;
// app.use(
//     auth.authenticateToken.unless({
//         path: [

//             // { url: "/admin_login", methods: ["POST"] },
//             // { url: 'http://localhost:5000/admin_register', methods: ["POST"] },
//             // { url: "/views/" }
//             '/admin_register',
//             '/admin_login',
//             '/home_head'

//         ]
//     })
// );


// const careerRouter = require('./server/routes/router');

// app.use('/images', express.static(path.resolve(__dirname, "images")));
// app.use('/css', express.static(path.resolve(__dirname, "css")));
// app.use('/', careerRouter);


// app.listen(process.env.port || 5000, function () {
//     console.log("Ready");
// });



















/*


const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')

const connectDB = require('./server/database/connect')


const app = express()

app.use(express.urlencoded({ extended: false }))

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))

//connection to mongo db
connectDB()



app.use(cookieParser())

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

const careerRouter = require('./server/routes/router')

app.use('/images', express.static(path.resolve(__dirname, "images")))
app.use('/css', express.static(path.resolve(__dirname, "css")))
app.use('/', careerRouter)

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.HOST}`)
})

*/