import http from "./http-common";
import { LoginUser } from "../models/LoginUser";

export default class {
    public static login(loginUser: LoginUser): Promise<any> {
        return http.get("/sanctum/csrf-cookie").then(() => {
            return http.post("/login", loginUser);
        });
    }
    public static logout(): Promise<any> {
        return http.post("/logout");
    }
}
