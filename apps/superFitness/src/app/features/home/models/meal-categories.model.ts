export interface MealCategoryModel {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealCategoriesResponseModel {
  categories: MealCategoryModel[];
}

export interface MealModel {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealsResponseModel {
  meals: MealModel[] | null;
}

export interface MealDetailsModel extends MealModel {
  strCategory: string;
  strArea: string | null;
  strInstructions: string | null;
  strTags: string | null;
  strYoutube: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

export interface MealDetailsResponseModel {
  meals: MealDetailsModel[] | null;
}
