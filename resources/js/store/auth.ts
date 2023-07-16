import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { User } from "../client/models/User";
import UserService from "../client/services/UserService";
import AuthService from "../client/services/AuthService";
import router from "../router";
export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        isAuthenticated: Cookies.get("is_authenticated") === "true",
        user: null as User | null,
    }),
    getters: {
        loggedIn: (state) => state.isAuthenticated,
        me: (state) => state.user,
    },
    actions: {
        setIsAuthenticated(isAuthenticated: boolean) {
            this.isAuthenticated = isAuthenticated;
            if (isAuthenticated) {
                Cookies.set("is_authenticated", isAuthenticated);
            } else {
                Cookies.remove("is_authenticated");
            }
        },
        getUserMe() {
            UserService.getAuthUser().then((user) => this.setUserMe(user));
        },
        setUserMe(user: User | null) {
            this.user = user;
        },
        logout() {
            AuthService.logout()
                .then(() => {
                    this.setIsAuthenticated(false);
                    this.setUserMe(null);
                    router.push({ name: "login" });
                })
                .catch((error) => {
                    console.log("error logging out");
                });
        },
    },
});
