import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { UserContext } from './userContext';
import { CatContext } from './CategoriesContext';
import { Recipe, Ingridents, Instructions } from './Types';

type FormValues = {
  Name: string;
  Description: string;
  Difficulty: string;
  Duration: number;
  CategoryId: number;
  Img: string;
  Instructions: Instructions[];
  Ingridents: Ingridents[];
};

const AddRecipe: React.FC = () => {
  const { myUser } = useContext(UserContext);
  const { categories } = useContext(CatContext);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      Name: '',
      Description: '',
      Difficulty: '',
      Duration: 0,
      CategoryId: 0,
      Img: '',
      Instructions: [{ Name: '' }],
      Ingridents: [{ Name: '', Count: '', Type: '' }],
    },
  });

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control,
    name: 'Instructions',
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'Ingridents',
  });

  const onSubmit = async (data: FormValues) => {
    if (!myUser) {
      alert('לא ניתן להוסיף מתכון כי אתה לא מחובר 😓');
      return;
    }

    const recipeToSend: Recipe = {
      ...data,
      UserId: myUser.Id,
      Id: 0,
    };

    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/recipe', recipeToSend);
      alert('🥳 המתכון נוסף בהצלחה!');
      reset();
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('❌ Error adding recipe:', error);
      alert('הוספת המתכון נכשלה 😢');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef} style={{ marginTop: 32, maxWidth: 960, marginInline: 'auto' }}>
      <Box sx={{ border: '2px solid #ccc', borderRadius: 3, padding: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          הוספת מתכון חדש 🍲
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="שם המתכון"
              fullWidth
              {...register('Name', { required: true })}
              error={!!errors.Name}
              helperText={errors.Name && 'שדה חובה'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="משך הכנה (בדקות)"
              type="number"
              fullWidth
              {...register('Duration', { required: true, min: 1 })}
              error={!!errors.Duration}
              helperText={errors.Duration && 'חייב להיות לפחות דקה'}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="תיאור"
              fullWidth
              multiline
              rows={3}
              {...register('Description', { required: true })}
              error={!!errors.Description}
              helperText={errors.Description && 'שדה חובה'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.Difficulty}>
              <InputLabel>רמת קושי</InputLabel>
              <Controller
                name="Difficulty"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="רמת קושי">
                    <MenuItem value="קל">קל</MenuItem>
                    <MenuItem value="בינוני">בינוני</MenuItem>
                    <MenuItem value="קשה">קשה</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.CategoryId}>
              <InputLabel>קטגוריה</InputLabel>
              <Controller
                name="CategoryId"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="קטגוריה">
                    {categories?.map((cat) => (
                      <MenuItem key={cat.Id} value={cat.Id}>
                        {cat.Name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="קישור לתמונה"
              fullWidth
              {...register('Img', { required: true })}
              error={!!errors.Img}
              helperText={errors.Img && 'שדה חובה'}
            />
          </Grid>
        </Grid>

        {/* הוראות */}
        <Box mt={5}>
          <Typography variant="h6">📝 הוראות הכנה</Typography>
          <Grid container spacing={2}>
            {instructionFields.map((item, index) => (
              <Grid item xs={12} key={item.id}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={11}>
                    <TextField
                      label={`שלב ${index + 1}`}
                      fullWidth
                      {...register(`Instructions.${index}.Name` as const, { required: true })}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton color="error" onClick={() => removeInstruction(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Button sx={{ mt: 2 }} onClick={() => appendInstruction({ Name: '' })}>
            ➕ הוספת שלב
          </Button>
        </Box>

        {/* מצרכים */}
        <Box mt={5}>
          <Typography variant="h6">🥕 מצרכים</Typography>
          {ingredientFields.map((item, index) => (
            <Grid container spacing={2} key={item.id} alignItems="center">
              <Grid item xs={12} sm={3}>
                <TextField
                  label="שם"
                  fullWidth
                  {...register(`Ingridents.${index}.Name` as const, { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="כמות"
                  fullWidth
                  {...register(`Ingridents.${index}.Count` as const, { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="סוג"
                  fullWidth
                  {...register(`Ingridents.${index}.Type` as const, { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton color="error" onClick={() => removeIngredient(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button sx={{ mt: 2 }} onClick={() => appendIngredient({ Name: '', Count: '', Type: '' })}>
            ➕ הוספת מצרך
          </Button>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 5, width: '100%' }}
          disabled={loading}
        >
          {loading ? 'שולח...' : '🚀 שלח מתכון'}
        </Button>
      </Box>
    </form>
  );
};

export default AddRecipe;
