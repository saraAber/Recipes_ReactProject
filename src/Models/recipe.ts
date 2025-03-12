// מוצר
export interface Ingredient {
    Name: string;
    Count: number;
    Type: string;
}

export interface Recipe {
    Id?: number; // אם יש צורך במזהה (בדרך כלל ב-POST לא נשלח)
    Name: string;
    Instructions: string[];
    Difficulty: string;
    Duration: string;
    Description?: string;
    UserId: number;
    CategoryId: number;
    CreatedBy:string;
    Img?: string;
    Ingrident: Ingredient[];
}
