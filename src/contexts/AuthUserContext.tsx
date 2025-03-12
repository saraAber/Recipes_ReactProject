import React, { ReactNode, createContext, useContext, useState } from "react";


// ממשק שמגדיר את סוגי הנתונים
export interface SignInFormInputs {
    username: string;
    email: string;
    password: string;
}

// טיפוס לקונטקסט
// טיפוס לקונטקסט
export interface AuthContextType {
    user: SignInFormInputs | null;
    isLoggedIn: boolean;
    saveUser: (user: SignInFormInputs) => void;
    clearUser: () => void;
}


// יצירת הקונטקסט
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
    children: ReactNode;
}

// ספק גישה לנתוני המשתמש
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<SignInFormInputs | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!user);

    const saveUser = (user: SignInFormInputs) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsLoggedIn(true);
    };

    const clearUser = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, saveUser, clearUser  }}>
            {children}
        </AuthContext.Provider>
    );
};

// הוק לשימוש בקונטקסט
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
