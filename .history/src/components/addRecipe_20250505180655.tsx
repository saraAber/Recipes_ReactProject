import React, { useContext, useEffect, useState } from 'react';
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
import { CatContext } from './categoriesContext';
import { Recipe, Ingridents, Instructions } from './Types';

type FormValues = {
  Name: string;
  Description: string;
  Difficulty: string;
  Duration: number;
  CategoryId: number;
  Img: string;
  Instructions: Instruction[];
  Ingridents: Ingredient[];
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
    reset
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

  const {
    fields: instructionFields,
    append: appendInstruction
  } = useFieldArray({ control, name: 'Instructions' });

  const {
    fields: ingredientFields,
    append: appendIngredient
  } = useFieldArray({ control, name: 'Ingridents' });

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

    console.log('📤 Sending Recipe:', recipeToSend);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/recipe', recipeToSend);
      alert('🥳 המתכון נוסף בהצלחה!');
      console.log(res.data);
      reset(); // איפוס הטופס אחרי שליחה
    } catch (error) {
      console.error('❌ Error adding recipe:', error);
      alert('הוספת המתכון נכשלה 😢');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 64 }}>
      <Typography variant="h4" gutterBottom>
        Add Recipe
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" fullWidth {...register('Name', { required: true })} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            {...register('Description', { required: true })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Difficulty</InputLabel>
            <Controller
              name="Difficulty"
              control={control}
              render={({ field }) => (
                <Select {...field}>
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
            label="Duration (mins)"
            type="number"
            fullWidth
            {...register('Duration', { required: true, min: 1 })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Controller
              name="CategoryId"
              control={control}
              render={({ field }) => (
                <Select {...field} value={field.value || ''}>
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
          <TextField label="Image URL" fullWidth {...register('Img', { required: true })} />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
        Instructions
      </Typography>
      {instructionFields.map((item, index) => (
        <Grid item xs={12} key={item.id}>
          <TextField
            label={`Instruction ${index + 1}`}
            fullWidth
            {...register(`Instructions.${index}.Name` as const, { required: true })}
          />
        </Grid>
      ))}
      <Button onClick={() => appendInstruction({ Name: '' })}>➕ Add Instruction</Button>

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
        Ingredients
      </Typography>
      {ingredientFields.map((item, index) => (
        <Grid container spacing={2} key={item.id}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Name"
              fullWidth
              {...register(`Ingridents.${index}.Name` as const, { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Count"
              fullWidth
              {...register(`Ingridents.${index}.Count` as const, { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Type"
              fullWidth
              {...register(`Ingridents.${index}.Type` as const, { required: true })}
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={() => appendIngredient({ Name: '', Count: '', Type: '' })}>
        ➕ Add Ingredient
      </Button>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginTop: 16 }}
        disabled={loading}
      >
        {loading ? 'שולח...' : 'Submit Recipe'}
      </Button>
    </form>
  );
};

export default AddRecipe;
