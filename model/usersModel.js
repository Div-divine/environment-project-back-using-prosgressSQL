import { dbQuery } from "../db/db.js";
import bcrypt from 'bcrypt';
import { promisify } from 'util';

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);

class Users {
    static async createUser(name, pwd, email, statusId) {
        try {
            // Generate a salt
            const salt = await genSalt(10);

            // Hash the password using the salt
            const hashedPassword = await hash(pwd, salt);

            // Insert the user into the database
            const query = 'INSERT INTO users (user_name, user_pwd, user_email, status_id) VALUES ($1, $2, $3, $4)';
            const values = [name, hashedPassword, email, statusId];
            const [result, fields] = await dbQuery(query, values);

            console.log('User created successfully');
        } catch (err) {
            // Handle errors
            console.error('Error creating user:', err);
        }
    }

    static async checkUserExist(email) {
        const query = 'SELECT * FROM users WHERE user_email = $1';
        const values = [email];
        const [rows] = await dbQuery(query, values);
        return rows[0];
    }

    static async getUserById(userId){
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const values = [userId];
        const [row] = await dbQuery(query, values);
        return row[0];
    }

    static async getAllUsers(userId){
        const query = 'SELECT user_id, user_name FROM users WHERE user_id != $1 ORDER BY user_created DESC';
        const values = [userId];
        const [rows] = await dbQuery(query, values);
        return rows;
    }

    static async getOnlyFourUsers(userId){
        const query = 'SELECT user_id, user_name FROM users WHERE user_id != $1 ORDER BY user_created DESC LIMIT 4';
        const values = [userId];
        const [rows] = await dbQuery(query, values);
        return rows;
    }
}

export default Users;
