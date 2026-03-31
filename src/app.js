import express from 'express';
import cookieParser from 'cookie-parser';
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import passport from "passport";
import "./configuraciones/passport.js";
import userRouter from './routes/userRouter.js';
import productRouter from "./routes/products.routes.js";
import { mongoConnect } from './configuraciones/database.js';
import sessionRouter from './routes/sessions.routes.js';
import cookieRouter from './routes/cookie.routes.js';
import cartRouter from "./routes/carts.routes.js";

const app = express();
dotenv.config();
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/products", productRouter);
app.use(cookieParser());

console.log(process.env.MONGO_URL);

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 60 * 10 
    }),
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 600000,
        httpOnly: true,
    }
}));


app.use('/api/users', userRouter); 
app.use('/api/sessions', sessionRouter); 
app.use("/api/carts", cartRouter);
const PORT = 8080;

mongoConnect().then(()=> {console.log ("conectado a la BD eentrega final "); 
    app.listen(PORT, () => {
         console.log(`Start Server in Port ${PORT}`);
         }); 
        });