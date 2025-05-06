import { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress, Card, CardContent, Typography, Grid, Button, TextField, MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userContext } from './userContext';
import { Recipe } from './Types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const GetRecipes = () => {
  const { Myuser } = useContext(userContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    category: '',
    duration: '' as number | '',
    difficulty: '',
    userId: '' as number | ''
  });

  const navigate = useNavigate();

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Recipe[]>('http://localhost:8080/api/recipe');
      setRecipes(data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id: number, ownerId: number) => {
    if (Myuser?.Id !== ownerId) return alert("אינך מורשה למחוק את המתכון כי לא אתה הכנסת אותו");

    try {
      await axios.post(`http://localhost:8080/api/recipe/delete/${id}`);
      setRecipes(prev => prev.filter(r => r.Id !== id));
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  const handleEdit = (id: number, ownerId: number) => {
    if (Myuser?.Id !== ownerId) return alert("אינך מורשה לערוך את המתכון כי לא אתה הכנסת אותו");
    navigate(`/edit-recipe/${id}`);
  };

  const updateFilter = (key: keyof typeof filters, value: string | number | '') => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(r =>
      (!filters.category || r.CategoryId.toString() === filters.category) &&
      (filters.duration === '' || r.Duration <= filters.duration) &&
      (!filters.difficulty || r.Difficulty === filters.difficulty) &&
      (filters.userId === '' || r.UserId === filters.userId)
    );
  }, [recipes, filters]);

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={12} sm={3}>
              <TextField
                type="number"
                label="זמן הכנה (דקות)"
                value={filters.duration}
                onChange={e => updateFilter('duration', e.target.value ? Number(e.target.value) : '')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                label="רמת קושי"
                value={filters.difficulty}
                onChange={e => updateFilter('difficulty', e.target.value)}
                fullWidth
              >
                <MenuItem value="">כל הרמות</MenuItem>
                <MenuItem value="קל">קל</MenuItem>
                <MenuItem value="בינוני">בינוני</MenuItem>
                <MenuItem value="קשה">קשה</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                type="number"
                label="נוצר על ידי"
                value={filters.userId}
                onChange={e => updateFilter('userId', e.target.value ? Number(e.target.value) : '')}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {filteredRecipes.length ? (
              filteredRecipes.map(recipe => (
                <Grid item xs={12} sm={6} md={4} key={recipe.Id}>
                  <Card sx={{ m: 2, textAlign: 'right' }}>
                    <CardContent>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Button onClick={() => handleDelete(recipe.Id, recipe.UserId)} color="error">
                          <DeleteIcon />
                        </Button>
                        <Button onClick={() => handleEdit(recipe.Id, recipe.UserId)} color="primary">
                          <EditIcon />
                        </Button>
                        <Button onClick={() => console.log("Liked recipe")} color="success">
                          <ThumbUpIcon />
                        </Button>
                      </Grid>

                      <Typography variant="h5" gutterBottom>{recipe.Name}</Typography>
                      <Typography variant="body2" paragraph>{recipe.Description}</Typography>
                      <Typography variant="body2">רמת קושי - {recipe.Difficulty}</Typography>
                      <Typography variant="body2">זמן הכנה - {recipe.Duration} דקות</Typography>
                      <Typography variant="body2">סוג - {recipe.CategoryId}</Typography>
                      <img src={recipe.Img} alt={recipe.Name} style={{ width: '100%', height: 'auto' }} />

                      <Typography variant="h6" mt={2}>מרכיבים</Typography>
                      {recipe.Ingridents?.length ? (
                        recipe.Ingridents.map(ing => (
                          <Typography key={`${recipe.Id}-${ing.Name}`}>
                            {ing.Name} - {ing.Count} {ing.Type}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2">אין מרכיבים זמינים</Typography>
                      )}

                      <Typography variant="h6" mt={2}>הוראות הכנה</Typography>
                      {recipe.Instructions?.length ? (
                        recipe.Instructions.map((step, idx) => (
                          <Typography key={idx} variant="body2">{step.Name}</Typography>
                        ))
                      ) : (
                        <Typography variant="body2">אין הוראות הכנה זמינות</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" textAlign="center">אין מתכונים זמינים.</Typography>
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

export default GetRecipes;
