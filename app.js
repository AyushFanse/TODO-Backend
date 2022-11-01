const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const app = express();
const createError = require("http-errors");

//^--------------------------* DOTENV *--------------------------^//

const dotenv = require("dotenv");
dotenv.config();

//^--------------------------* APIs Path *--------------------------^//
const indexRouter = require("./routes/Index");
const Tasks = require("./routes/Tasks");
const UsersRouter = require("./routes/Users");
const RegisterRouter = require("./routes/Register");

//^--------------------------* DB CONNECTIONS *--------------------------^//

const ConnectDB = require("./Database/MongoDB");
ConnectDB();

//^--------------------------* VIEW ENGIN *--------------------------^//

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//&--------------------------* ROUTERS *--------------------------&//

app.use("/", indexRouter);
app.use("/task", Tasks);
app.use("/user", UsersRouter);
app.use("/auth", RegisterRouter);

//!------------------* ERRORS HANDLER *------------------!//

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

//*--------------------------* PORT *--------------------------*//

var port = process.env.PORT;

app.set("port", port);
app.listen(port, () =>
    console.log(`Server is stated on http://localhost:${port}`)
);

module.exports = app;