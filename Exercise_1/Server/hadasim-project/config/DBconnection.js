import mongoose from "mongoose";
import fs from "fs";

export const connectTodb = () => {
    try {
        const username = fs.readFileSync(
            "/run/secrets/mongo_username",
            "utf8"
        ).trim();

        const password = fs.readFileSync(
            "/run/secrets/mongo_password",
            "utf8"
        ).trim();

        const mongoURI =
            `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@mongo:27017/hadasim?authSource=admin`;

        mongoose.connect(mongoURI)
            .then(suc => {
                console.log(
                    "mongodb connected on host " + suc.connection.host
                );
            })
            .catch(err => {
                console.log(err);
                console.log("cannot connect mongodb");
                process.exit(1);
            });

    } catch (err) {
        console.log("cannot read Docker secrets");
        console.log(err);
        process.exit(1);
    }
};