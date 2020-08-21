import { Request, Response } from "express";
import FollowersDatabase from "../data/FollowersDatabase";
import UserDatabase from "../data/UserDatabase";
import checkMissingParams from "../helpers/checkMissingParams";
import Authenticator from "../Services/Autenticator";

export const followUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { authorization } = req.headers;
        const { userToFollowId } = req.body;

        checkMissingParams(authorization);

        const user = Authenticator.getData(authorization as string);
        await FollowersDatabase.getFeed(user.id);
        await UserDatabase.checkUserExistence(userToFollowId);

        if (await FollowersDatabase.checkFollowing(user.id, userToFollowId)) {
            throw new Error("You already follow this user");
        }

        await FollowersDatabase.followUser(user.id, userToFollowId);

        res.status(200).send({
            message: "Followed successfully",
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};
