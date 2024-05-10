import { dbQuery } from "../db/db.js";

class Groups {
    static async selectAllFromGroups() {
        const query = 'SELECT * FROM actionsgroups';
        const { rows } = await dbQuery(query);
        return rows;
    }

    static async SelectOneFromGroups(groupId) {
        const query = 'SELECT * FROM actionsgroups WHERE group_id = $1';
        const { rows } = await dbQuery(query, [groupId]);
        return rows[0];
    }
}

export default Groups;
