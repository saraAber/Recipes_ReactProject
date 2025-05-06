import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Recipe } from './Types';
import { CircularProgress, Card, CardContent, Typography, Grid, Button, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userContext } from './userContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const GetRecipes = () => {
  const { Myuser } = useContext(userContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDuration, setFilterDuration] = useState<number | ''>(''); 
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterUserId, setFilterUserId] = useState<number | ''>(''); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, [filterCategory, filterDuration, filterDifficulty]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/recipe', {
        params: {
          CategoryId: filterCategory,
          Difficulty: filterDifficulty,
          Duration: filterDuration,
          UserId: filterUserId,
        },
      });
      setRecipes(res.data);
    } catch (error) {
      console.error('❌ Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/recipe/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.Id !== id));
    } catch (error) {
      console.error('❌ Error deleting recipe:', error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        המתכונים שלי
      </Typography>
      <Grid container spacing={3}>
        {loading ? (
          <CircularProgress />
        ) : (
          recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.Id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{recipe.Name}</Typography>
                  <Typography variant="body2">{recipe.Description}</Typography>
                  <Typography variant="body2">רמת קושי: {recipe.Difficulty}</Typography>
                  <Typography variant="body2">משך הכנה: {recipe.Duration} דקות</Typography>
                  <Typography variant="body2">קטגוריה: {recipe.CategoryName}</Typography>

                  {Myuser && recipe.UserId === Myuser.Id && (
                    <>
                      <Button
                        startIcon={<EditIcon />}
                        color="primary"
                        onClick={() => handleEdit(recipe.Id)}
                      >
                        ערוך
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        color="secondary"
                        onClick={() => handleDelete(recipe.Id)}
                      >
                        מחק
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default GetRecipes;
