import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { Signup } from "./endpoints/Signup";
import { login } from "./endpoints/Login";
import { getProfile } from "./endpoints/GetProfile";
import { getUserById } from "./endpoints/GetUserById";
import { createRecipe } from "./endpoints/CreateRecipe";
import { getRecipeById } from "./endpoints/GetRecipeById";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/user/signup", Signup);
app.post("/login", login);
app.post("/recipe", createRecipe);
app.get("/user/profile", getProfile);
app.get("/user/:id", getUserById);
app.get("/recipe/:id", getRecipeById);

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
