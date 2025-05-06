import { createContext, ReactNode, useState, useEffect } from "react";
import { user } from "./Types";

// טיפוס לקונטקסט
type UserContextType = {
  myUser: user | null;
  setMyUser: (user: user | null) => void;
};

// יצירת הקונטקסט עם ערכים דיפולטיביים
export const UserContext = createContext<UserContextType>({
  myUser: null,
  setMyUser: () => {}, // פונקציה ריקה כתחליף זמני
});

// קומפוננטת הפרוביידר
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [myUser, setMyUser] = useState<user | null>(null);

  useEffect(() => {
    try {
      // בדיקה אם יש נתונים ב-localStorage
      const storedUser = localStorage.getItem("user");

      // אם יש נתונים ב-localStorage, ננסה להמיר אותם ל-JSON
      if (storedUser) {
        setMyUser(JSON.parse(storedUser));
      }
    } catch (error) {
      // אם יש שגיאה, נדפיס אותה ב-console
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []); // הפעלת useEffect פעם אחת כאשר הקומפוננטה נטענת

  return (
    <UserContext.Provider value={{ myUser, setMyUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
