export interface MealCategoryModel {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealCategoriesResponseModel {
  categories: MealCategoryModel[];
}
