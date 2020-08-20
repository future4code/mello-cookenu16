import { Request, Response } from "express";
import IdGenerator from "../Services/IdGenerator";
import HashManager from "../Services/HashManager";
import UserDatabase from "../data/UserDatabase";
import Authenticator from "../Services/Autenticator";
import checkMissingParams from "../helpers/checkMissingParams";

export const Signup = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;

        checkMissingParams(email, name, password);

        if (email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)) {
            throw new Error("Invalid email");
        }

        const id = IdGenerator.generateId();

        const hashPassword = await HashManager.hash(password);

        await UserDatabase.createUser(id, email, name, hashPassword);

        const token = Authenticator.generateToken({ id });

        res.status(201).send({
            message: "User creator successfuly",
            token,
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};
