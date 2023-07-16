import http from "./http-common";
import { User } from "../models/User";

export default class {
    public static getAuthUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            http.get("/api/me").then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        });
    }
}
