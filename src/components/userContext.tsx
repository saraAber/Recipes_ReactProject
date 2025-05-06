import { createContext, ReactNode, useState, useEffect } from "react";
import { user } from "./Types";

// טיפוס לקונטקסט
interface UserContextType {
  myUser: user | null;
  setMyUser: (user: user | null) => void;
}

// יצירת הקונטקסט עם ערכים דיפולטיביים
export const UserContext = createContext<UserContextType>({
  myUser: null,
  setMyUser: () => {},
});

// קומפוננטת הפרוביידר
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [myUser, setMyUser] = useState<user | null>(null);

  // בעת טעינת הקומפוננטה נטען מה-localStorage אם יש נתונים תקינים
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      try {
        const parsed = JSON.parse(stored);
        setMyUser(parsed);
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ myUser, setMyUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
