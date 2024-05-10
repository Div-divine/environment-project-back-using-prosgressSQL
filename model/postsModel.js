import { dbQuery } from "../db/db.js";

class Posts {
    static async insertUserDataIntoPost(postContent, groupId, userId, incognito = false) {
        const query = 'INSERT INTO posts (post_content, group_id, user_id, incognito) VALUES ($1, $2, $3, $4)';
        const values = [postContent, groupId, userId, incognito];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async selectAllPostWithUser(groupId) {
        const query = 'SELECT * FROM posts JOIN users ON posts.user_id = users.user_id WHERE group_id = $1 ORDER BY post_created DESC';
        const values = [groupId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async insertUserDataIntoPostIncognito(postContent, groupId, userId, incognito = true) {
        const query = 'INSERT INTO posts (post_content, group_id, user_id, incognito) VALUES ($1, $2, $3, $4)';
        const values = [postContent, groupId, userId, incognito];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async selectAllPostComments(postId) {
        const query = 'SELECT * FROM comments JOIN users ON comments.user_id = users.user_id WHERE post_id = $1';
        const values = [postId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async deletePosts(postId) {
        const query = 'DELETE FROM posts WHERE post_id = $1';
        const values = [postId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async updateUserPost(postId, postContent) {
        const query = 'UPDATE posts SET post_content = $1 WHERE post_id = $2';
        const values = [postContent, postId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }
}

export default Posts;
