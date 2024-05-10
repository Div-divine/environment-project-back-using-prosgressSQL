import { dbQuery } from "../db/db.js";

class UsersGroups {
    static async addUserGroups(userId, groupId) {
        const query = 'INSERT INTO users_actionsgroups(user_id, group_id) VALUES ($1, $2)';
        const values = [userId, groupId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async CheckUserAlreadyExistsInAGroup(userId, groupId) {
        const query = 'SELECT COUNT(*) AS count FROM users_actionsgroups WHERE user_id = $1 AND group_id = $2';
        const values = [userId, groupId];
        const { rows } = await dbQuery(query, values);
        console.log(rows[0]);
        return rows[0];
    }

    static async selectUserWithGroups(userId) {
        const query = `SELECT COALESCE(users_actionsgroups.user_id, users.user_id) AS user_id,
                            users_actionsgroups.group_id AS user_group_id,
                            users.*,  actionsgroups.*
                       FROM users
                       LEFT JOIN users_actionsgroups ON users.user_id = users_actionsgroups.user_id
                       LEFT JOIN actionsgroups ON users_actionsgroups.group_id = actionsgroups.group_id
                      WHERE users.user_id = $1`;
        const values = [userId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async SelectAllUsers(userId) {
        const query = 'SELECT * FROM users WHERE user_id != $1';
        const values = [userId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async SelectAllUsersWithGroupsExceptOne(userId) {
        const query = `SELECT * 
                         FROM actionsgroups 
                         JOIN users_actionsgroups ON actionsgroups.group_id = users_actionsgroups.group_id 
                         JOIN users ON users_actionsgroups.user_id = users.user_id 
                        WHERE users.user_id != $1`;
        const values = [userId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async selectAllUsersOfAgroup(groupId) {
        const query = `SELECT users.user_name, users.user_img 
                         FROM actionsgroups 
                         JOIN users_actionsgroups ON actionsgroups.group_id = users_actionsgroups.group_id 
                         JOIN users ON users_actionsgroups.user_id = users.user_id 
                        WHERE actionsgroups.group_id = $1`;
        const values = [groupId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }
}

export default UsersGroups;
