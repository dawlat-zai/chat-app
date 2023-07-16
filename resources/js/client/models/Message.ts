import { User } from "./User";

export type Message = {
    id: number;
    user?: User;
    message: string;
    created_at: string;
    updated_at: string;
};
