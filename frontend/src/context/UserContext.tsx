import { createContext, useState } from "react";
import User from "../model/User";

export interface UserType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
