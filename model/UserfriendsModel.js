import { dbQuery } from "../db/db.js";

class Friends {
    static async createFriends(user1Id, user2Id, status = true) {
        const query = 'INSERT INTO friendships(user1_id, user2_id, friendship_status) VALUES ($1, $2, $3)';
        const values = [user1Id, user2Id, status];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async selectFriendsPair(user1Id, user2Id) {
        const query = 'SELECT * FROM friendships WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)';
        const values = [user1Id, user2Id];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async getAllUsersFriends(userId) {
        const query = 'SELECT user_id FROM friendships f JOIN users u ON u.user_id = CASE WHEN f.user1_id = $1 THEN f.user2_id ELSE f.user1_id END WHERE f.user1_id = $1 OR f.user2_id = $1';
        const values = [userId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async deleteUsersFromFriends(user1Id, user2Id) {
        const query = 'DELETE FROM friendships WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)';
        const values = [user1Id, user2Id];
        const { rows } = await dbQuery(query, values);
        return rows;
    }
}

export default Friends;
