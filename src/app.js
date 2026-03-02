import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import { mongoConnect } from './configuraciones/database.js';
import sessionRouter from './routes/sessions.routes.js';
import cookieRouter from './routes/cookie.routes.js';

const app = express();


// Middlewares incorporados de Express
app.use(express.json()); // Formatea los cuerpos json de peticiones entrantes.
app.use(express.urlencoded({extended: true})); // Formatea query params de URLs para peticiones entrantes.


app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/entrega1",
        ttl: 60 * 10 
    }),
    secret:"abcd1234",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 600000,
        httpOnly: true,
    }
}))
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionRouter);


const PORT = 8080;

mongoConnect().then(()=> {console.log ("conectado a la BD entrega1  ");
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});
});