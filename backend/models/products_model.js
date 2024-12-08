import mongoose, {model, Schema} from "mongoose";


const productSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        }
    },{
        timestamps:true // createdAt,updatedAt
    }
);





const Product = model("Product",productSchema);


export {Product};
