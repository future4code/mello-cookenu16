import { Request, Response } from "express";
import RecipesDatabase from "../data/RecipesDatabase";
import checkMissingParams from "../helpers/checkMissingParams";
import Authenticator from "../Services/Autenticator";

export const getRecipeById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { authorization } = req.headers;
        const { id } = req.params;

        checkMissingParams(authorization);

        Authenticator.getData(authorization as string);

        const recipe = await RecipesDatabase.getRecipeById(id);

        res.status(200).send({
            result: {
                recipe: recipe.id,
                title: recipe.title,
                description: recipe.description,
                createdAt: recipe.date,
            },
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};
