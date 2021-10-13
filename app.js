const express = require("express");
const app = express();

require("dotenv/config");
const cors = require("cors");

const errorHandler = require('./helpers/error-handler')
const authJwt = require("./helpers/jwt")
const bodyParser = require("body-parser")
const morgan = require("morgan"); // morgan used for logging api requests
// morgan shows status ,req url,time taken,method
const mongoose = require("mongoose");
const api = process.env.API_URL;

const productsRouter = require("./routers/products")
const categoriesRouter = require("./routers/categories");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");

// another way use bodyparser
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json())
// app.use(express.json()) : used to let the backend know the frontend is sending json data
app.use(morgan("tiny"))
app.use(authJwt);
app.use(errorHandler)
app.use("/public/uploads", express.static(__dirname + '/public/uploads/'))

// routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, ordersRouter)

mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: "shop-database"
})
    .then(() => {
        console.log("DB connection is ready...")
    })
    .catch((err) => {
        console.log(err)
    })

let port = process.env.PORT || 8000;
app.listen(port, () => {

    console.log(`server is listening at port ${port}`)
})