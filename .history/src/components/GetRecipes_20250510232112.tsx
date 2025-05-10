import { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress, Card, CardContent, Typography, Grid,
  Button, TextField, MenuItem, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';
import { Recipe } from './Types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const GetRecipes = () => {
  const { myUser } = useContext(UserContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    duration: '' as number | '',
    difficulty: '',
    userId: '' as number | ''
  });
  const navigate = useNavigate();

  useEffect(() => { fetchRecipes(); }, []);

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

  const handleDelete = async (id: number, ownerId: number) => {
    if (myUser?.Id !== ownerId) return alert("אינך מורשה למחוק את המתכון כי לא אתה הכנסת אותו");
    try {
      await axios.post(`http://localhost:8080/api/recipe/delete/${id}`);
      setRecipes(prev => prev.filter(r => r.Id !== id));
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  const handleEdit = (id: number, ownerId: number) => {
    if (myUser?.Id !== ownerId) return alert("אינך מורשה לערוך את המתכון כי לא אתה הכנסת אותו");
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
    <Box dir="rtl" sx={{ p: 3, backgroundColor: '#f7f9fb', minHeight: '100vh' }}>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>
      ) : (
        <>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={4} md={3}>
              <TextField
                type="number"
                label="⏱ זמן הכנה (בדקות)"
                value={filters.duration}
                onChange={e => updateFilter('duration', e.target.value ? Number(e.target.value) : '')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <TextField
                select
                label="💪 רמת קושי"
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
            <Grid item xs={12} sm={4} md={3}>
              <TextField
                type="number"
                label="👤 נוצר ע״י (ID)"
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
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fff'
                  }}>
                    <CardContent>
                      <Box display="flex" justifyContent="flex-end" gap={1} mb={2}>
                        <Button onClick={() => handleDelete(recipe.Id, recipe.UserId)} color="error"><DeleteIcon /></Button>
                        <Button onClick={() => handleEdit(recipe.Id, recipe.UserId)} color="info"><EditIcon /></Button>
                        <Button onClick={() => console.log("Liked")} color="warning"><ThumbUpIcon /></Button>
                      </Box>

                      <Typography variant="h6" fontWeight="bold" color="primary">{recipe.Name}</Typography>
                      <Typography variant="body2" color="text.secondary">{recipe.Description}</Typography>
                      <Typography variant="body2">רמת קושי: {recipe.Difficulty}</Typography>
                      <Typography variant="body2">⏲ {recipe.Duration} דקות</Typography>
                      <Typography variant="body2">קטגוריה: {recipe.CategoryId}</Typography>

                      {recipe.Img && (
                        <Box mt={2} mb={2}>
                          <img src={recipe.Img} alt={recipe.Name} style={{ width: '100%', borderRadius: '12px' }} />
                        </Box>
                      )}

                      <Typography variant="subtitle1" fontWeight="bold" color="secondary">🛒 מרכיבים</Typography>
                      {recipe.Ingridents?.length ? (
                        recipe.Ingridents.map(ing => (
                          <Typography key={ing.Name} variant="body2">
                            {ing.Name} - {ing.Count} {ing.Type}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">אין מרכיבים</Typography>
                      )}

                      <Typography variant="subtitle1" fontWeight="bold" color="secondary" mt={2}>📋 הוראות</Typography>
                      {recipe.Instructions?.length ? (
                        recipe.Instructions.map((step, i) => (
                          <Typography key={i} variant="body2">{step.Name}</Typography>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">אין הוראות</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center" color="text.secondary">אין מתכונים זמינים לבינתים!</Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default GetRecipes;
