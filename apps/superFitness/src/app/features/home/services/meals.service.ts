import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealCategoriesResponseModel } from '../models/meal-categories.model';

@Injectable({ providedIn: 'root' })
export class MealsService {
  private readonly http = inject(HttpClient);
  private readonly categoriesUrl =
    'https://www.themealdb.com/api/json/v1/1/categories.php';

  getCategories(): Observable<MealCategoriesResponseModel> {
    return this.http.get<MealCategoriesResponseModel>(this.categoriesUrl);
  }
}
