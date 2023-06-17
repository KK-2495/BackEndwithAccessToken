import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./Route/AllRoute.js";

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1', router);


mongoose.connect('mongodb+srv://Krish24:Krish%402495@cluster0.s8xz5ha.mongodb.net/Backend_AccessToken?retryWrites=true&w=majority')
.then(()=>console.log("DB Connected"))
.catch((err)=> console.log("DB error --> ",err));

app.listen(8000, ()=>console.log("connected on port"));

