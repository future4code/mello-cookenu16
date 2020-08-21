import { BaseDatabase } from "./BaseDatabase";
import moment from "moment";

class RecipesDatabase extends BaseDatabase {
    private static TABLE_NAME = "Recipes";

    public async createRecipe(
        id: string,
        title: string,
        description: string,
        creator: string,
        date = moment(new Date()).format("YYYY/MM/DD")
    ): Promise<void> {
        await this.getConnection()
            .insert({
                id,
                date,
                title,
                description,
                creator,
            })
            .into(RecipesDatabase.TABLE_NAME);
    }

    public async getRecipeById(id: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(RecipesDatabase.TABLE_NAME)
            .where({ id });

        return result[0];
    }
}

export default new RecipesDatabase();
