import {
    createRouter,
    createWebHistory,
    RouteLocationNormalized,
} from "vue-router";
import { useAuthStore } from "../store";

const AuthGuard = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: Function
) => {
    const authStore = useAuthStore();
    if (authStore.loggedIn) {
        // get auth user (me) if null
        if (authStore.me === null) {
            await authStore.getUserMe();
        }
        // forward the user to the requested route
        next();
    } else {
        next({ name: "login" });
    }
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "login",
            component: () => import("../components/LoginComponent.vue"),
        },
        {
            path: "/chat",
            name: "chat",
            component: () => import("../components/ChatComponent.vue"),
            beforeEnter: AuthGuard,
        },
    ],
});

export default router;
