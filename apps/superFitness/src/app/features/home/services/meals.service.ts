import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MealCategoriesResponseModel,
  MealsResponseModel,
} from '../models/meal-categories.model';

@Injectable({ providedIn: 'root' })
export class MealsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  getCategories(): Observable<MealCategoriesResponseModel> {
    return this.http.get<MealCategoriesResponseModel>(`${this.baseUrl}/categories.php`);
  }

  getMealsByCategory(category: string): Observable<MealsResponseModel> {
    return this.http.get<MealsResponseModel>(`${this.baseUrl}/filter.php`, {
      params: { c: category },
    });
  }
}
