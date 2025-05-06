import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthUserContext";
import axios from "axios";

function Login({ onClose }: { onClose?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { saveUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("מלא את כל השדות");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/user/signin", {
        email: email,
        password,
      });
      saveUser(res.data.user);
      navigate("/recipes");
      onClose?.(); // בדיקה בטוחה
    } catch (err) {
      setError("שגיאה בהתחברות. בדוק את הפרטים.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>התחברות</h2>
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
        <div className="modal-buttons">
          <button onClick={handleLogin}>כניסה</button>
          <button onClick={() => onClose?.()}>❌</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
