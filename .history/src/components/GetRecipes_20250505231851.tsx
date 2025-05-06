import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { Recipe } from './Types';
import { userContext } from './userContext';

const GetRecipes: React.FC = () => {
  const { Myuser } = useContext(userContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [loading, setLoading] = useState(true);

  const getRecipes = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/recipe');
      setRecipes(res.data);
    } catch (err) {
      alert('אירעה שגיאה בעת טעינת המתכונים 😵');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('את בטוחה שתרצי למחוק את המתכון? 😱')) return;
    try {
      await axios.delete(`http://localhost:8080/api/recipe/${id}`);
      setRecipes(recipes.filter((r) => r.Id !== id));
    } catch (err) {
      alert('שגיאה במחיקה 😬');
    }
  };

  const filteredRecipes = filterDifficulty
    ? recipes.filter((r) => r.Difficulty === filterDifficulty)
    : recipes;

  return (
    <div style={{ marginTop: 64 }}>
      <Typography variant="h4" gutterBottom>
        מתכונים קיימים
      </Typography>

      <Grid container spacing={2} alignItems="center" style={{ marginBottom: 16 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="סינון לפי רמת קושי"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            fullWidth
          >
            <MenuItem value="">הצג הכל</MenuItem>
            <MenuItem value="קל">קל</MenuItem>
            <MenuItem value="בינוני">בינוני</MenuItem>
            <MenuItem value="קשה">קשה</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : filteredRecipes.length === 0 ? (
        <Typography>לא נמצאו מתכונים תואמים 🤷‍♀️</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.Id}>
              <Card>
                <CardMedia
                  component="img"
                  height="180"
                  image={recipe.Img}
                  alt={recipe.Name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {recipe.Name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {recipe.Description}
                  </Typography>
                  <Typography variant="body2">
                    ⏱️ זמן הכנה: {recipe.Duration} דק
                  </Typography>
                  <Typography variant="body2">
                    🧩 רמת קושי: {recipe.Difficulty}
                  </Typography>
                  {Myuser?.Id === recipe.UserId && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(recipe.Id)}
                      style={{ marginTop: 8 }}
                    >
                      מחק
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default GetRecipes;
