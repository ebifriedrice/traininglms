import express from "express";
import { PORT } from "./config.js";
import routes from "./routes.js";

const app = express();

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})