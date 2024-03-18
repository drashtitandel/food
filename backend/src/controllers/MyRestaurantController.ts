import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose, { mongo } from "mongoose";

const createMyRestaurant = async (req: Request, res:Response)=> {
    try {
         const existingRestaurant = await Restaurant.findOne({user: req.userId});

        if(existingRestaurant){
           return res
           .status(409)
           .json ({ message: "User restaurant already exists "});
         }

        const image = req.file as Express.Multer.File;
        console.log('req.body',req)
        const base64Image = Buffer.from(image.buffer).toString("base64");
        const dataURI = `data:${image.mimetype};base64,${base64Image}`;

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = uploadResponse.ur1;
        restaurant.user = new mongoose.Types.ObjectId(String(req.userId));
        restaurant.lastUpdated = new Date();
        await restaurant.save();


        res.status(201).send(restaurant);
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong "});
    }
}

export default {
    createMyRestaurant,
}