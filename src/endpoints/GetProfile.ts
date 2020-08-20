import { Request, Response } from "express";
import UserDatabase from "../data/UserDatabase";
import checkMissingParams from "../helpers/checkMissingParams";
import Authenticator from "../Services/Autenticator";

export const getProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { authorization } = req.headers;

        checkMissingParams(authorization);

        const id = Authenticator.getData(authorization as string);

        const user = await UserDatabase.getUserById(id.id);

        res.status(200).send({
            result: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};
