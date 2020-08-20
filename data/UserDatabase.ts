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
}