import { Request, Response } from "express";
import UserDatabase from "../data/UserDatabase";
import HashManager from "../Services/HashManager";
import Authenticator from "../Services/Autenticator";
import checkMissingParams from "../helpers/checkMissingParams";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        checkMissingParams(email, password);

        const user = await UserDatabase.getUserByEmail(email);

        const isPasswordCorrect = await HashManager.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            throw new Error("User or password incorrect");
        }
        const token = Authenticator.generateToken({ id: user.id });

        res.status(200).send({
            message: "User logged successfuly",
            token,
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};
