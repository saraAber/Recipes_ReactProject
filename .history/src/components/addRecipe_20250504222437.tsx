// import axios from "axios";
// //import { Recipe } from "../Models/recipe";
// import { useFieldArray, useForm } from "react-hook-form";
// import { useEffect, useState } from "react";

// const AddRecipe = () => {
//     const { register, handleSubmit, control, formState: { errors } } = useForm({
//         defaultValues: {
//             Name: "",
//             Instructions: "",
//             Difficulty: "",
//             Duration: "",
//             Description: "",
//             UserId: "",
//             CategoryId: "",
//             Img: "",
//             Ingrident: [{ Name: "", Count: "", Type: "" }]
//         }
//     });

//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: "Ingrident"
//     });

//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8080/api/category");
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error("שגיאה בטעינת הקטגוריות", error);
//             }
//         };
//         fetchCategories();
//     }, []);

//     // const handleAddRecipe = async (data: any) => {
//     //     try {
//     //         // המרת הוראות הכנה למערך שורות
//     //         const formattedData = {
//     //             ...data,
//     //             Instructions: data.Instructions.split("\n"), // פיצול לפי שורות
//     //         };

//     //         const res = await axios.post("http://localhost:8080/api/recipe", formattedData);
//     //         alert("המתכון נוסף בהצלחה!😶‍🌫️");
//     //         console.log(res.data);
//     //     } catch (error) {
//     //         console.error("Error adding recipe:", error);
//     //         alert("הוספת המתכון נכשלה:(😯");
//     //     }
//     // };

//     const handleAddRecipe = async (data: any) => {
//         try {
//             // המרת הוראות הכנה למערך שורות
//             const formattedData = {
//                 ...data,
//                 Instructions: data.Instructions.split("\n"), // פיצול לפי שורות
//                 UserId: localStorage.getItem("userId"), // שליפת מזהה המשתמש מהלוקלסטורג
//             };
    
//             const res = await axios.post("http://localhost:8080/api/recipe", formattedData);
//             alert("המתכון נוסף בהצלחה!😶‍🌫️");
//             console.log(res.data);
//         } catch (error) {
//             console.error("Error adding recipe:", error);
//             alert("הוספת המתכון נכשלה:(😯");
//         }
//     };
    

//     return (<>
//         <h2>הוספת מתכון חדש</h2>
//         <form onSubmit={handleSubmit(handleAddRecipe)}>
//             <label>שם המתכון:</label>
//             <input {...register("Name", { required: "שדה זה חובה" })} />
//             {errors.Name && <p>{errors.Name.message}</p>}
//             <br />
//             <label>הוראות הכנה (שורה לכל שלב):</label>
//             <textarea {...register("Instructions", { required: "שדה זה חובה" })}></textarea>
//             {errors.Instructions && <p>{errors.Instructions.message}</p>}
//             <br />

//             <label>רמת קושי:</label>
//             <input {...register("Difficulty", { required: "שדה זה חובה" })} />
//             {errors.Difficulty && <p>{errors.Difficulty.message}</p>}
//             <br />

//             <label>זמן הכנה (למשל: '30 דקות'):</label>
//             <input {...register("Duration", {
//                 required: "שדה זה חובה",
//                 pattern: {
//                     value: /^[0-9]+\s[\u0590-\u05FFa-zA-Z]+$/,
//                     message: "יש להכניס מספר ולאחריו יחידת זמן (למשל: '30 דקות')"
//                 }
//             })} />

//             {errors.Duration && <p>{errors.Duration.message}</p>}
//             <br />

//             <label>תיאור קצר:</label>
//             <input {...register("Description")} />
//             <br />

//             {/* /בחירה מתוך הקטגוריות הקיימות */}
//             <label>מזהה קטגוריה:</label>
//             <input type="" {...register("CategoryId", { required: "שדה זה חובה" })} />
//             {errors.CategoryId && <p>{errors.CategoryId.message}</p>}
//             <br />

//             <label>URL לתמונה:</label>
//             <input {...register("Img")} />
//             <br />

//             <h3>רכיבי המתכון</h3>
//             {fields.map((item, index) => (
//                 <div key={item.id}>
//                     <label>שם מוצר:</label>
//                     <input {...register(`Ingrident.${index}.Name`, { required: "זהו שדה חובה" })} />
//                     {/* {errors.Ingrident?.[index]?.Name && <p>{errors.Ingrident[index].Name.message}</p>} */}

//                     <label>כמות:</label>
//                     <input type="number" {...register(`Ingrident.${index}.Count`, { required: "זהו שדה חובה" })} />
//                     {/* {errors.Ingrident?.[index]?.Count && <p>{errors.Ingrident[index].Count.message}</p>} */}

//                     <label>סוג כמות (כפות, כוסות וכו'):</label>
//                     <input {...register(`Ingrident.${index}.Type`, { required: "זהו שדה חובה" })} />

//                     <button type="button" onClick={() => remove(index)}>מחק רכיב</button>
//                 </div>
//             ))}
//             <br />

//             <button type="button" onClick={() => append({ Name: "", Count: "", Type: "" })}>
//                 הוסף רכיב 
//             </button>

//             <br />
//             <button type="submit">שלח מתכון</button>

//         </form>
//     </>)
// }
// export default AddRecipe;



