import { dbQuery } from "../db/db.js";

class Count {
    static async getNbrOfUsers() {
        const query = 'SELECT COUNT(*) AS nbr FROM users';
        const { rows } = await dbQuery(query);
        return rows[0];
    }
}

export default Count;
