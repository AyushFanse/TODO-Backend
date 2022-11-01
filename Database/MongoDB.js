const mongoose = require("mongoose");

module.exports = async () => {
    try {
        mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("Connected to database.");
    } catch (error) {
        console.log("Could not connect to database.", error);
        process.exit();
    }
};
