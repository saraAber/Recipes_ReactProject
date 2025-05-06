



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
          {!user && (
            <>
              <Button onClick={() => setShowLogin(true)}
                variant="contained"
                sx={{
                  bgcolor: '#DC143C',
                  '&:hover': { bgcolor: '#B22222' },
                  height: '56px', 
                  width: '200px', 
                  marginTop: '300px',
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
                  marginTop: '270px',
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
              marginTop: '270px',
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
              marginTop: '270px',
              fontSize: '16px',
              borderRadius: '14px',
              textTransform: 'none', 
            }}
          >➕ AddRecipe
          </Button>
        </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </div>
  );
}

export default HomePage;
