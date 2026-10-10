import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '@super-fitness/data-access-user';
import {
  MuscleGroupResponseModel,
  MusclesResponseModel,
} from '../models/muscles.model';

@Injectable({ providedIn: 'root' })
export class MusclesService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getAllMuscleGroups(): Observable<MuscleGroupResponseModel> {
    return this.http.get<MuscleGroupResponseModel>(`${this.apiBaseUrl}/muscles`);
  }

  getGroupById(id: string): Observable<MusclesResponseModel> {
    return this.http.get<MusclesResponseModel>(
      `${this.apiBaseUrl}/musclesGroup/${id}`,
    );
  }
}
