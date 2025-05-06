import { createContext, ReactNode, useState } from "react";
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

  return (
    <UserContext.Provider value={{ myUser, setMyUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
