import { Hono } from "hono";
import { cors } from "hono/cors";
import foodCategoryRoute from "./routes/food-category.route.js";
import foodRoute from "./routes/food.route.js";
import userRoute from "./routes/user.route.js";

const app = new Hono();

app.use("/*", cors());

app.route("/category", foodCategoryRoute);
app.route("/food", foodRoute);
app.route("/user", userRoute);

export default app;
