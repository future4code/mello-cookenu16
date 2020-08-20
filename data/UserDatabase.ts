import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "Users";

    public async createUser(id: string, email: string, nome: string, password: string): Promise<void>{
        await this.getConnection()
        .insert({
            id, 
            email, 
            nome, 
            password
        }).into(UserDatabase.TABLE_NAME)

    }

    public async getUserByEmail(email: string): Promise<any>{
        const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where(email)

        return result[0]

    }

    public async getUserById(id: string): Promise<any>{
        const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({id})

        return result[0]

    }

}