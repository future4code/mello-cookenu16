import { Request, Response } from "express";
import FollowersDatabase from "../data/FollowersDatabase";
import UserDatabase from "../data/UserDatabase";
import checkMissingParams from "../helpers/checkMissingParams";
import Authenticator from "../Services/Autenticator";

export const unfollowUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { authorization } = req.headers;
        const { userToUnfollowId } = req.body;

        checkMissingParams(authorization);

        const user = Authenticator.getData(authorization as string);
        await UserDatabase.checkUserExistence(userToUnfollowId);

        if (
            !(await FollowersDatabase.checkFollowing(user.id, userToUnfollowId))
        ) {
            throw new Error("You do not follow this user");
        }

        await FollowersDatabase.unfollow(user.id, userToUnfollowId);

        res.status(200).send({
            message: "Unfollowed successfully",
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};
