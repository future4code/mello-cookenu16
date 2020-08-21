import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { Signup } from "./endpoints/Signup";
import { login } from "./endpoints/Login";
import { getProfile } from "./endpoints/GetProfile";
import { getUserById } from "./endpoints/GetUserById";
import { createRecipe } from "./endpoints/CreateRecipe";
import { getRecipeById } from "./endpoints/GetRecipeById";
import { followUser } from "./endpoints/FollowUser";
import { unfollowUser } from "./endpoints/UnfollowUser";
import { getFeed } from "./endpoints/GetFeed";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/user/signup", Signup);
app.get("/user/profile", getProfile);
app.get("/user/feed", getFeed);
app.post("/user/follow", followUser);
app.post("/user/unfollow", unfollowUser);
app.get("/user/:id", getUserById);
app.get("/recipe/:id", getRecipeById);
app.post("/recipe", createRecipe);
app.post("/login", login);

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
