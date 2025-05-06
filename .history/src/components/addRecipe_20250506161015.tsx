import React, { useContext, useState } from 'react';
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
} from '@mui/material';
import { userContext } from './userContext';
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
  const { Myuser } = useContext(userContext);
  const { categories } = useContext(CatContext);
  const [loading, setLoading] = useState(false);

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

  const { fields: instructionFields, append: appendInstruction } = useFieldArray({
    control,
    name: 'Instructions',
  });

  const { fields: ingredientFields, append: appendIngredient } = useFieldArray({
    control,
    name: 'Ingridents',
  });

  const onSubmit = async (data: FormValues) => {
    if (!Myuser) {
      alert('לא ניתן להוסיף מתכון כי אתה לא מחובר 😓');
      return;
    }

    const recipeToSend: Recipe = {
      ...data,
      UserId: Myuser.Id,
      Id: 0,
    };

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/recipe', recipeToSend);
      alert('🥳 המתכון נוסף בהצלחה!');
      reset();
    } catch (error) {
      console.error('❌ Error adding recipe:', error);
      alert('הוספת המתכון נכשלה 😢');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 4, border: '2px solid #000', padding: '2px' }}>
      <Typography variant="h4" gutterBottom>
        הוספת מתכון חדש
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

        <Grid item xs={12}>
          <TextField
            label="תיאור"
            multiline
            rows={4}
            fullWidth
            {...register('Description', { required: true })}
            error={!!errors.Description}
            helperText={errors.Description && 'שדה חובה'}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.Difficulty}>
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
          <TextField
            label="משך הכנה (בדקות)"
            type="number"
            fullWidth
            {...register('Duration', { required: true, min: 1 })}
            error={!!errors.Duration}
            helperText={errors.Duration && 'משך חייב להיות לפחות דקה אחת'}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.CategoryId}>
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

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
        הוראות הכנה
      </Typography>
      {instructionFields.map((item, index) => (
        <Grid item xs={12} key={item.id}>
          <TextField
            label={`שלב ${index + 1}`}
            fullWidth
            {...register(`Instructions.${index}.Name` as const, { required: true })}
          />
        </Grid>
      ))}
      <Button onClick={() => appendInstruction({ Name: '' })}>➕ הוספת שלב</Button>

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
        מצרכים
      </Typography>
      {ingredientFields.map((item, index) => (
        <Grid container spacing={2} key={item.id}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="שם"
              fullWidth
              {...register(`Ingridents.${index}.Name` as const, { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
        </Grid>
      ))}
      <Button onClick={() => appendIngredient({ Name: '', Count: '', Type: '' })}>
        ➕ הוספת מצרך
      </Button>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginTop: 24 }}
        disabled={loading}
      >
        {loading ? 'שולח...' : 'שלח מתכון'}
      </Button>
    </form>
  );
};

export default AddRecipe;
