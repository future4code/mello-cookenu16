import { BaseDatabase } from "./BaseDatabase";

class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "Users";

    public async createUser(
        id: string,
        email: string,
        name: string,
        password: string
    ): Promise<void> {
        await this.getConnection()
            .insert({
                id,
                email,
                name,
                password,
            })
            .into(UserDatabase.TABLE_NAME);
    }

    public async getUserByEmail(email: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email });

        return result[0];
    }

    public async getUserById(id: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ id });

        return result[0];
    }

    public async checkUserExistence(userId: string) {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ id: userId });

        if (result[0] === undefined) {
            throw new Error("This user does not exist");
        }
    }
}

export default new UserDatabase();
