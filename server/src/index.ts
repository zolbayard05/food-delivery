import { Hono } from "hono";
import { cors } from "hono/cors";
import foodCategoryRoute from "./routes/food-category.route.js";

const app = new Hono();

app.use("/*", cors());

app.route("/category", foodCategoryRoute);

export default app;
