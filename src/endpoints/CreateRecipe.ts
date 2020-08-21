import { Request, Response } from "express";
import RecipesDatabase from "../data/RecipesDatabase";
import checkMissingParams from "../helpers/checkMissingParams";
import Authenticator from "../Services/Autenticator";
import IdGenerator from "../Services/IdGenerator";

export const createRecipe = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { authorization } = req.headers;
        const { title, description } = req.body;

        checkMissingParams(authorization, title, description);

        const userId = Authenticator.getData(authorization as string);

        const id = IdGenerator.generateId();

        await RecipesDatabase.createRecipe(id, title, description, userId.id);

        res.status(201).send({
            message: "Recipe was successfully created",
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};
