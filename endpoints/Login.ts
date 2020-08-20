import {Request, Response} from "express";
import { UserDatabase } from "../data/UserDatabase";

export const login = async (req: Request, res: Response)=> {
    const email = req.body.email;
    const passwordType = req.body.password;
    const userDataBase = new UserDatabase();
    

try {
    
} catch (error) {
    
}

}