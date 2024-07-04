import mongoose from "mongoose";
import process from "process";

export async function connectionDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!)

        const connection = mongoose.connection; //connection provided by mongoose when mongoDB connected

        connection.on('connected', () => console.log('MongoDB connected'));

        connection.on('error', (err) => {
            console.log('mongoDB Connection Error :: connectionDB '+ err);
            process.exit();
            // process.exitCode=48;
        })

    } catch (error) {
        console.log("error in catch dbConfig :: dbConfig ", error)

    }

}