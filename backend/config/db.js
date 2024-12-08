import mongoose from "mongoose";


export const db_connection = async ()=>{
try{
    const conn = await mongoose.connect(process.env.mongodb_url);  
    console.log(`MongoDB Connected to ${conn.connection.host}`);
   
    process.on("SIGINT",async()=>{
        console.log("\nGracefully shutting down...");
        await mongoose.disconnect();
        console.log("MongoDB connection closed.");
        process.exit(0); //Exit the process
    })
}catch(error){
console.log(error.message);
process.exit(1);
}
    
   
}


