import {Request, Response} from "express";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../src/Services/HashManager";
import { Authenticator } from "../src/Services/Autenticator";

export const login = async (req: Request, res: Response)=> {

try {
    const email = req.body.email;
    const password = req.body.password;

    const userDataBase = new UserDatabase();
    const user = await userDataBase.getUserByEmail(email);

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(password, user.password)

    if(!isPasswordCorrect) {
        throw new Error ("User or passord incorrect")
    }
    const authenticator = new Authenticator();
    const token = authenticator.generateToken({id: user.id})

    res.status(200).send({
        message: "User logged successfuly",
        token
    })

    
} catch (error) {
    res.status(400).send({
        message: error.message
    })
}
};