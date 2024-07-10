import mongoose from "mongoose";



export async function connectionDB() {

    try {
        // mongoose.connect(`${process.env.URL!}/${process.env.DB_NAME!}`)
        mongoose.connect(process.env.URL! + "/" + process.env.DB_NAME!)

        const connection = mongoose.connection; //connection provided by mongoose when mongoDB connected

        connection.on('connected', () => console.log('MongoDB connected'));

        connection.on('error', (err) => {
            console.log('mongoDB Connection Error :: connectionDB ' + err);
            process.exit();
        })

    } catch (error) {
        console.log("error in catch dbConfig :: dbConfig " + error)

    }

}