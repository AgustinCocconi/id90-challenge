import { Airline } from "./airline.interface";

export interface LoginFormData {
    airline: Airline | null;
    username: string;
    password: string;
    remember_me: boolean;
}