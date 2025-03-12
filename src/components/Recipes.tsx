import { Recipe } from '../Models/recipe';
import React, { useEffect, useState } from "react";
import axios from "axios";

const Recipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]); // רשימת המתכונים
    const [categories, setCategories] = useState<{ Id: number; Name: string }[]>([]); // רשימת הקטגוריות
    const [error, setError] = useState<string | null>(null); // שגיאה בטעינה

    // שמירת הערכים של הסינון
    const [filters, setFilters] = useState({
        category: "",
        duration: "",
        difficulty: "",
        createdBy: "",
    });

    // טעינת המתכונים והקטגוריות מהשרת
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/recipe");
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setError("שגיאה בטעינת המתכונים. אנא נסה שוב מאוחר יותר.");
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/category");
                setCategories(response.data); // שמירה של הקטגוריות במבנה נכון
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("שגיאה בטעינת הקטגוריות. אנא נסה שוב מאוחר יותר.");
            }
        };

        fetchRecipes();
        fetchCategories();
    }, []);

    // עדכון משתני הסינון
    const handlerFilter = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    // סינון המתכונים לפי הבחירות של המשתמש
    const filteredRecipes = recipes.filter((recipe) => {
        return (
            (!filters.category || recipe.CategoryId === Number(filters.category)) &&
            (!filters.duration || recipe.Duration.toString().includes(filters.duration)) && // עדכון כאן
            (!filters.difficulty || recipe.Difficulty === filters.difficulty) &&
            (!filters.createdBy || recipe.CreatedBy.includes(filters.createdBy))
        );
    });

    return (
        <>
            {/* טופס הסינון */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* הצגת שגיאה אם קיימת */}
            <select name="category" value={filters.category} onChange={handlerFilter}>
                <option value="">בחר קטגוריה</option>
                {categories.map((category) => (
                    <option key={category.Id} value={category.Id}>
                        {category.Name}
                    </option>
                ))}
            </select>

            <input type="number" name="duration" placeholder="משך זמן (דקות)" value={filters.duration} onChange={handlerFilter} />

            <input type="number" name="difficulty" placeholder="רמת קושי" value={filters.difficulty} onChange={handlerFilter} />

            <input type="text" name="createdBy" placeholder="נוצר על ידי" value={filters.createdBy} onChange={handlerFilter} />

            {/* הצגת המתכונים */}
            <div>
                <h2>המתכונים</h2>
                <ul>
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map(recipe => (
                            <li key={recipe.Id}>
                                <h3>{recipe.Name}</h3>
                                <p>{recipe.Description}</p>
                                <p>רמת קושי: {recipe.Difficulty}</p>
                                <p>זמן הכנה: {recipe.Duration} דקות</p>
                                <img src={recipe.Img} alt={recipe.Name} width="200" />
                            </li>
                        ))
                    ) : (
                        <p>לא נמצאו מתכונים</p>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Recipes;
