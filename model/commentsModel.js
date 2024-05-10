import { dbQuery } from "../db/db.js";

class Comments {
    static async createPostComments(commentMsg, postId, userId) {
        const query = 'INSERT INTO comments (comment_msg, post_id, user_id) VALUES ($1, $2, $3)';
        const values = [commentMsg, postId, userId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async deleteComments(postId) {
        const query = 'DELETE FROM comments WHERE post_id = $1';
        const values = [postId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async deleteUserCommentOnly(commentId) {
        const query = 'DELETE FROM comments WHERE comment_id = $1';
        const values = [commentId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async updateUserComment(commentId, commentUpdate) {
        const query = 'UPDATE comments SET comment_msg = $1 WHERE comment_id = $2';
        const values = [commentUpdate, commentId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }
}

export default Comments;
