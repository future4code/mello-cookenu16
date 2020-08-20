import { Request, Response } from "express";
import { IdGenerator } from "../src/Services/IdGenerator";
import { HashManager } from "../src/Services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../src/Services/Autenticator";

export const Signup = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const name = req.body.nome;
        const password = req.body.password;


        if (!email || !name || !password) {
            throw new Error("Insert all required information");
        }

        if (email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, email, name, hashPassword);

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({ id });

        res.status(200).send({
            message: "User creator successfuly",
            token,
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};
