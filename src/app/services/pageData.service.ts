import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  constructor(private httpClient: HttpClient) {}
  
  getWorks(): Observable<WorksDto[]> {
    return this.httpClient.get<WorksDto[]>(`TourGuides`);
  }  
  
  getWorksById(id : number): Observable<WorksDto> {
    return this.httpClient.get<WorksDto>(`TourGuides`);
  } 

  getSkills(): Observable<SkillsDto[]> {
    return this.httpClient.get<SkillsDto[]>(`TourGuides`);
  } 



}

export interface WorksDto {
    id: number;
    name : string;
    url : string;
    image: string;
    details : string;
}
export interface SkillsDto {
    id : number;
    name : string;
    percentage : number;
    type : number;
    main : boolean;
}