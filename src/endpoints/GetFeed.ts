import { Request, Response } from "express";
import FollowersDatabase from "../data/FollowersDatabase";

import checkMissingParams from "../helpers/checkMissingParams";
import Authenticator from "../Services/Autenticator";

export const getFeed = async (req: Request, res: Response): Promise<void> => {
    try {
        const { authorization } = req.headers;

        checkMissingParams(authorization);

        const user = Authenticator.getData(authorization as string);

        const feed = await FollowersDatabase.getFeed(user.id);

        res.status(200).send({
            results: feed,
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};
