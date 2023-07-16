import http from "./http-common";
import { Message } from "../models/Message";

export default class {
    public static getMessages(): Promise<Message[]> {
        return new Promise((resolve, reject) => {
            http.get("/api/messages")
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response);
                });
        });
    }

    public static createMessage(
        message: Omit<Omit<Omit<Message, "id">, "created_at">, "updated_at">
    ): Promise<Message> {
        return new Promise((resolve, reject) => {
            http.post("/api/messages", message)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response);
                });
        });
    }
}
