import { BaseDatabase } from "./BaseDatabase";

class FollowersDatabase extends BaseDatabase {
    private static TABLE_NAME = "Followers";

    public async followUser(
        follower: string,
        userIdToFollow: string
    ): Promise<void> {
        await this.getConnection()
            .insert({ follower, userIdToFollow })
            .into(FollowersDatabase.TABLE_NAME);
    }

    public async checkFollowing(
        follower: string,
        userIdToFollow: string
    ): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(FollowersDatabase.TABLE_NAME)
            .where({ follower, userIdToFollow });

        if (result[0] === undefined) {
            return false;
        } else {
            return true;
        }
    }

    public async unfollow(
        follower: string,
        userIdToUnfollow: string
    ): Promise<any> {
        if (this.checkFollowing(follower, userIdToUnfollow)) {
            await this.getConnection()
                .delete()
                .from(FollowersDatabase.TABLE_NAME)
                .where({ follower, userIdToFollow: userIdToUnfollow });
        } else {
            throw new Error("You do not follow this user");
        }
    }

    public async getFeed(userId: string) {
        const result = await this.getConnection().raw(`
    SELECT
        f.userIdToFollow as user,
        u.name,
        r.id as recipeId,
        r.title,
        r.description,
        r.date
    FROM Recipes r
        JOIN Followers f ON r.creator = f.userIdToFollow
        JOIN Users u ON f.userIdToFollow = u.id
    WHERE f.follower = "${userId}"
    ORDER BY date DESC;`);

        return result[0];
    }
}

export default new FollowersDatabase();
