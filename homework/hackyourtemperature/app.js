import express from "express";
import exphbs from "express-handlebars";
import weatherRoutes from "./routers/weather.js";
import wrongPathRoute from "./routers/wrongPath.js";
import apiWeatherRoutes from "./routers/api/api_weather.js";

const app = express();

app.use(express.json());

//set view engine
app.engine("handlebars", exphbs()); //{ defaultLayout: false }
app.set("view engine", "handlebars");

//we need to configure that we are using the url
app.use(express.urlencoded({ extended: true }));

//set router
app.use("/", weatherRoutes);
app.use("/api/weather", apiWeatherRoutes);
app.use(wrongPathRoute);

export default app;
