import { Injectable } from '@angular/core';
import {Reclamation } from '../Entity/Reclamation'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  requestHeaders2 = new HttpHeaders(    {"Authorization":"Bearer"+ `Bearer ${this.userAut.getToken()}`});
  consulturl = 'http://localhost:8080/reclamation';
  
  constructor(private http: HttpClient,private  userAut:UserAuthService) {
   }

  getReclamations(): Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(this.consulturl+'/affichallReclamations',{headers: this.requestHeaders2});
  }
  
  getOpenReclamations(): Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(this.consulturl+'/afficherOpenReclamations',{headers: this.requestHeaders2});
  }
  
  getClosedReclamations(): Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(this.consulturl+'/historique',{headers: this.requestHeaders2});
  }

  getstats(): Observable<Map<string,number>>{
    return this.http.get<Map<string,number>>(this.consulturl+'/stats',{headers: this.requestHeaders2});
  }

  ajouterReclamation( rec: Reclamation){
    return this.http.post<Reclamation>(this.consulturl+'/addReclamation/1', rec, {headers: this.requestHeaders2});
  }

  consulterReclamation(reclamationtId: number): Observable<Reclamation> {
    const url = `${this.consulturl}/${reclamationtId}`;
    return this.http.get<Reclamation>(url);
  }

  CloseReclamation(idReclamation: number,solution:string ) {
    return this.http.put<Reclamation>(this.consulturl+'/close/' + idReclamation ,solution, {headers: this.requestHeaders2});

  }

  DeleteReclamation(reclamationId: number) {
    return this.http.delete<Reclamation>(this.consulturl+'/delete/' + reclamationId , {headers: this.requestHeaders2});
  }
}
