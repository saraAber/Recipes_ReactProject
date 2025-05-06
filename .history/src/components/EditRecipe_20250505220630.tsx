import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom"; // 👈 חשוב!
import { Recipe } from "../Models/recipe";
import axios from "axios";

interface Errors {
  message?: string;
}

function EditRecipe() {
  const { id } = useParams<{ id: string }>(); // שליפת id מה-URL
  const recipeId = Number(id); // המרה למספר

  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<Recipe>(`http://localhost:8080/api/recipe/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setErrors({ message: "שגיאה בטעינת המתכון" });
      }
    };

    if (!isNaN(recipeId)) {
      fetchRecipe();
    }
  }, [recipeId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) =>
      prevRecipe ? { ...prevRecipe, [name]: value } : prevRecipe
    );
  };

  const handleInstructionsChange = (index: number, value: string) => {
    if (recipe) {
      const updatedInstructions = [...recipe.Instructions];
      updatedInstructions[index] = value;
      setRecipe({ ...recipe, Instructions: updatedInstructions });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!recipe) return;

    try {
      const response = await axios.post<Recipe>(
        "http://localhost:8080/api/recipe/edit",
        recipe
      );
      console.log("Recipe updated successfully:", response.data);
      // אפשרי: הוספת הודעה למשתמש או ניווט חזרה
    } catch (error) {
      console.error("Error updating recipe:", error);
      setErrors({ message: "שגיאה בעדכון המתכון. נסה שוב." });
    }
  };

  return (
    <div>
      <h2>עריכת מתכון</h2>
      {errors.message && <span style={{ color: "red" }}>{errors.message}</span>}
      {recipe ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>שם המתכון:</label>
            <input
              type="text"
              name="Name"
              value={recipe.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>הוראות:</label>
            {recipe.Instructions.map((instruction, index) => (
              <textarea
                key={index}
                value={instruction}
                onChange={(e) =>
                  handleInstructionsChange(index, e.target.value)
                }
                required
              />
            ))}
          </div>
          <div>
            <label>דרגת קושי:</label>
            <input
              type="text"
              name="Difficulty"
              value={recipe.Difficulty}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>משך זמן:</label>
            <input
              type="text"
              name="Duration"
              value={recipe.Duration}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>תיאור:</label>
            <textarea
              name="Description"
              value={recipe.Description}
              onChange={handleChange}
            />
          </div>
          <button type="submit">שמור שינויים</button>
        </form>
      ) : (
        <p>טוען מתכון...</p>
      )}
    </div>
  );
}

export default EditRecipe;
