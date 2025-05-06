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

  // כאן נוסיף קריאה ל-localStorage או מקור חיצוני
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setMyUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ myUser, setMyUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
