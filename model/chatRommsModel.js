import { dbQuery } from "../db/db.js";
import { v4 as uuidv4 } from "uuid";

class ChatRoom {
    static async createChatRoom(user1Id, user2Id){
        const chatroomId = uuidv4();  // Generate a uuid for chatrooms
        const query = 'INSERT INTO chatrooms(chatroom_id, user1_id, user2_id) VALUES($1, $2, $3)';
        const values = [chatroomId, user1Id, user2Id];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async checkUsersExists(user1Id, user2Id){
        const query = 'SELECT id FROM chatrooms WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $3 AND user2_id = $4)';
        const values = [user1Id, user2Id, user2Id, user1Id];
        const { rows } = await dbQuery(query, values);
        return rows[0];
    }
    
    static async getChatRoomId(user1Id, user2Id){
        const query = 'SELECT chatroom_id FROM chatrooms WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $3 AND user2_id = $4)';
        const values = [user1Id, user2Id, user2Id, user1Id];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async insertMessages(message, user1Id, user2Id, chatroomId, msgRead = false){
        const query = 'INSERT INTO messages(msg_content, sender_id, receiver_id, chatroom_id, msg_read) VALUES($1, $2, $3, $4, $5)';
        const values = [message, user1Id, user2Id, chatroomId, msgRead];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async getAllMsgs(user1Id, user2Id){
        const query = 'SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $3 AND receiver_id = $4) ORDER BY msg_created';
        const values = [user1Id, user2Id, user2Id, user1Id];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async updateMsgReadStatusById(msgId, chatroomId, received = true){
        const query = 'UPDATE messages SET msg_read = $1 WHERE msg_id IN ($2) AND chatroom_id = $3';
        const values = [received, msgId, chatroomId];
        const { rows } = await dbQuery(query, values);
        return rows;
    }

    static async getAllFromUnreadMsgs(receiverId, msgState = false){
        const query = 'SELECT sender.*, receiver.*, messages.* FROM messages JOIN users AS sender ON sender.user_id = messages.sender_id JOIN users AS receiver ON receiver.user_id = messages.receiver_id WHERE messages.receiver_id = $1 AND messages.msg_read = $2';
        const values = [receiverId, msgState];
        const { rows } = await dbQuery(query, values);
        return rows;
    }
}

export default ChatRoom;
