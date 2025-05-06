import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthUserContext";
import axios from "axios";

function SignIn({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tz, setTz] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { saveUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    if (!email.includes("@") || !password || !name || !phone || !tz) {
      setError("יש למלא את כל השדות בצורה תקינה");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/user/sighin", {
        name, phone, tz, email, password,
      });
      saveUser(res.data.user);
      alert("נרשמת בהצלחה!");
      navigate("/recipes");
      onClose();
    } catch (err) {
      setError("שגיאה בהרשמה. נסה שוב.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>הרשמה 📝</h2>
        <input type="text" placeholder="שם" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="tel" placeholder="טלפון" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="text" placeholder="ת.ז" value={tz} onChange={(e) => setTz(e.target.value)} />
        <input type="email" placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type={showPassword ? "text" : "password"} placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>
          <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> הצג סיסמה 👁
        </label>
        {error && <p className="error">{error}</p>}
        <div className="modal-buttons">
          <button onClick={handleSignup}>הרשמה</button>
          <button onClick={onClose}>❌</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
