import encrypt from "encryptjs";
import User from "../Model/User.js";
import { idGenerator } from "generate-custom-id";
import axios from "axios";

export const register = async (req,res) =>{
    try {
        const {name, email, password, confirmPassword} = req.body;

        const response = await User.find({email}).exec();
        
        if(response.length) return res.send("You're already Registered.");
        let secretkey='accessToken';
        const id = idGenerator("token");
        let accessToken = id;
        let encryptPass =encrypt.encrypt(password,secretkey,256);
        const user = new User({
            name,
            email,
            password:encryptPass,
            access_token:accessToken
        });
        
        await user.save();
        // res.json({ access_token: accessToken });
        // return;
        setTimeout(async () => {
            await User.updateOne({ email }, { $unset: { access_token: 1 } });
        }, 1 * 60 * 1000); 
        return res.send("Registration Successful.!");
    } catch (error) {
        return res.send(error);
    }
}

export const regenerateToken = async (req,res) =>{
    try {
        const {email, password} = req.body;
        let secretkey='accessToken';
        const token = idGenerator("token");
        const db = await User.find({email}).exec();
        const dbPass = db[0].password;
        const decryptPass = encrypt.decrypt(dbPass,secretkey,256);
        
        if(password != decryptPass) return res.send("password does not match");
        
        if(db[0].access_token) return res.send("Access token already generated.");

        await User.findOneAndUpdate({email},{access_token:token}).exec();
        setTimeout(async () => {
            await User.updateOne({ email }, { $unset: { access_token: 1 } });
        }, 1 * 60 * 1000); 
        return res.send(token);
    } catch (error) {
        return res.send(error);
    }
}

export const accessToData = async (req,res) =>{
    try {
        const{email, password} = req.body;
        const response = await User.find({email}).exec();
        // console.log(response);
        let secretkey='accessToken';
        const dbPass = response[0].password;
        const decryptPass = encrypt.decrypt(dbPass,secretkey,256);

        if(email == response[0].email && password == decryptPass){
            if(!response[0].access_token) return res.send("Kindly generate the Access Token and try again..!");
            return res.send("You can now access the Data..");
        }else{
            return res.send("Credentials does not match");
        }
    } catch (error) {
        return res.send(error);
    }
}


export const getMovies = async (req,res) =>{
    try {
        const{email, password, movieId} = req.body;
        const response  = await User.find({email}).exec();
        const key = "k_033sfh2p";
        const movie = await axios.get(`https://imdb-api.com/en/API/Posters/${key}/${movieId}`);
        // console.log(movie.data);
         return res.send(movie.data);
    } catch (error) {
        return res.send(error);
    }
}