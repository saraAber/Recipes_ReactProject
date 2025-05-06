// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthUserContext"; // אם מוגדר alias ב-vite.config.ts
// import axios from "axios"; // ודא שהוא מותקן עם npm install axios

// function HomePage() {
//   const [text, setText] = useState("Enter to recipes!");
//   const [showModal, setShowModal] = useState(false); // מודאל להרשמה
//   const [showLoginModal, setShowLoginModal] = useState(false); // מודאל להתחברות
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [tz, setTz] = useState("");
//   const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string; phone?: string; tz?: string }>({});
//   const navigate = useNavigate();
//   const { saveUser } = useAuth();

//   // פונקציה להתחברות
//   const handleLogin = async () => {
//     setErrors({});
//     // בדיקה אם השדות ריקים
//     if (!email || !password) {
//       setErrors({ email: "יש למלא את כל השדות" });
//       return; // אם השדות ריקים, לא שולחים את הבקשה ל-API
//     }

//     try {
//       // שליחת בקשת התחברות ל-API
//       const response = await axios.post('http://localhost:8080/api/user/sighin', {
//         username: email, // יש לוודא שהשם שמקבלים ב-API זה 'Username'
//         password: password, // יש לוודא גם שהשם של הסיסמה הוא 'Password'
//       });

//       console.log("Login Success:", response.data);
//       saveUser(response.data.user); // שמירה של המשתמש לאחר התחברות מוצלחת
//       navigate("/recipes"); // ניווט לדף המתכונים לאחר התחברות מוצלחת
//     } catch (error) {
//       console.error("Login Error:", error);
//       setErrors({ email: "שגיאה בהתחברות. בדוק את הפרטים ונסה שוב." });
//     }
//   };

//   // פונקציה להרשמה
//   const handleRegister = async () => {
//     setErrors({});
//     let newErrors: { email?: string; password?: string; name?: string; phone?: string; tz?: string } = {};

//     if (!email.includes("@") || !email.includes(".")) newErrors.email = "האימייל חייב להיות תקין (למשל: example@mail.com)";
//     if (!password.trim()) newErrors.password = "יש להזין סיסמה";
//     if (!name.trim()) newErrors.name = "יש להזין שם";
//     if (!phone.trim()) newErrors.phone = "יש להזין מספר טלפון";
//     if (!tz.trim()) newErrors.tz = "יש להזין מספר זהות";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // אם המייל לא קיים, נבצע הרשמה
//     try {
//       const response = await axios.post('http://localhost:8080/api/user/sighin', {
//         name: name,
//         phone: phone,
//         tz: tz,
//         email: email,
//         password: password,
//       });

//       console.log("Registration Success:", response.data);
//       saveUser(response.data.user); // שמירה של המשתמש לאחר הרשמה
//       alert("נרשמת בהצלחה!");
//       setShowModal(false);
//       navigate("/home"); // לאחר הרשמה מוצלחת, נווט לדף הבית

//     } catch (error) {
//       console.error("Registration Error:", error);
//       setErrors({ email: "שגיאה בהרשמה. נסה שוב." });
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to the Home Page!</h1>
//       <div className="extra-card">
//         {/* כפתור שיפתח את המודאל של התחברות */}
//         <button onClick={() => setShowLoginModal(true)}>{text}</button>
//         {/* כפתור שיפתח את המודאל של הרשמה */}
//         <button onClick={() => setShowModal(true)}>to connect~</button>
//       </div>

//       {/* מודאל של התחברות */}
//       {showLoginModal && (
//         <div style={{ position: "fixed", top: "0", left: "0", right: "0", bottom: "0", backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: "999", display: "flex", justifyContent: "center", alignItems: "center" }}>
//           <div style={{ backgroundColor: "black", color: "aquamarine", padding: "55px", border: "2px solid white", borderRadius: "15px", boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}>
//             <h2>התחבר</h2>
//             <input type="email" placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: "block", marginBottom: "8px", padding: "5px", width: "100%" }} />
//             {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
//             <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: "block", marginBottom: "5px", padding: "5px", width: "100%" }} />
//             {errors.password && <span style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}
//             <br /><br />
//             <button onClick={handleLogin} style={{ marginRight: "10px" }}>כניסה</button>
//             <button onClick={() => setShowLoginModal(false)}>סגור</button>
//           </div>
//         </div>
//       )}

//       {/* מודאל של הרשמה */}
//       {showModal && (
//         <div style={{ position: "fixed", top: "0", left: "0", right: "0", bottom: "0", backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: "999", display: "flex", justifyContent: "center", alignItems: "center" }}>
//           <div style={{ backgroundColor: "black", color: "aquamarine", padding: "55px", border: "2px solid white", borderRadius: "15px", boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}>
//             <h2>הירשם</h2>
//             <input type="text" placeholder="שם" value={name} onChange={(e) => setName(e.target.value)} style={{ display: "block", marginBottom: "8px", padding: "5px", width: "100%" }} />
//             {errors.name && <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}
//             <input type="tel" placeholder="טלפון" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ display: "block", marginBottom: "8px", padding: "5px", width: "100%" }} />
//             {errors.phone && <span style={{ color: "red", fontSize: "12px" }}>{errors.phone}</span>}
//             <input type="text" placeholder="ת.ז" value={tz} onChange={(e) => setTz(e.target.value)} style={{ display: "block", marginBottom: "8px", padding: "5px", width: "100%" }} />
//             {errors.tz && <span style={{ color: "red", fontSize: "12px" }}>{errors.tz}</span>}
//             <input type="email" placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: "block", marginBottom: "8px", padding: "5px", width: "100%" }} />
//             {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
//             <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: "block", marginBottom: "5px", padding: "5px", width: "100%" }} />
//             {errors.password && <span style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}
//             <br /><br />
//             <button onClick={handleRegister} style={{ marginRight: "10px" }}>הרשמה</button>
//             <button onClick={() => setShowModal(false)}>סגור</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HomePage;


import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthUserContext";
import LoginModal from "./Login";
import SignupModal from "./SignIn";
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";
import { CatContext } from "./categoriesContext";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="button-group">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '50px' }}>
          {!user && (
            <>
              <Button onClick={() => setShowLogin(true)}
                variant="contained"
                sx={{
                  bgcolor: '#DC143C',
                  '&:hover': { bgcolor: '#B22222' },
                  height: '56px', 
                  width: '200px', 
                  fontSize: '16px',
                  borderRadius: '12px',
                  textTransform: 'none', 
                }}
              >Login</Button>
              <Button onClick={() => setShowSignup(true)}
                variant="contained"
                sx={{
                  bgcolor: '#DC143C',
                  '&:hover': { bgcolor: '#B22222' },
                  height: '56px', 
                  width: '200px', 
                  marginTop:'30%',
                  fontSize: '16px',
                  borderRadius: '12px',
                  textTransform: 'none', 
                }}
              >SignIn</Button>
            </>
          )}
          <Button
            component={Link}
            to={"/GetRecipes"} // עדכון לנתיב הנכון
            variant="contained"
            sx={{
              bgcolor: '#DC143C',
              '&:hover': { bgcolor: '#B22222' },
              height: '56px', 
              width: '200px', 
              marginTop:'30%',
              fontSize: '16px',
              borderRadius: '12px',
              textTransform: 'none', 
            }}
          >📋GetRecipe
          </Button>
          <Button
            component={Link}
            to={"/AddRecipe"} // עדכון לנתיב הנכון
            variant="contained"
            sx={{
              bgcolor: '#DC143C',
              '&:hover': { bgcolor: '#B22222' },
              height: '56px', 
              width: '200px', 
              marginTop:'30%',
              fontSize: '16px',
              borderRadius: '14px',
              textTransform: 'none', 
            }}
          >➕ AddRecipe
          </Button>
        </div>
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </div>
  );
}

export default HomePage;
