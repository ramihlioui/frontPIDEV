import { Injectable } from '@angular/core';
import {Reclamation } from '../Entity/Reclamation'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http: HttpClient) {
   }

   consulturl = 'http://localhost:8080/reclamation';

  getReclamations(): Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(this.consulturl+'/affichallReclamations',{headers: this.getHeaders});
  }
  
  getOpenReclamations(): Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(this.consulturl+'/afficherOpenReclamations',{headers: this.getHeaders});
  }
  
  getClosedReclamations(): Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(this.consulturl+'/historique',{headers: this.getHeaders});
  }

  getstats(): Observable<Map<string,number>>{
    return this.http.get<Map<string,number>>(this.consulturl+'/stats',{headers: this.getHeaders});
  }

  ajouterReclamation( rec: Reclamation){
    return this.http.post<Reclamation>(this.consulturl+'/addReclamation/1', rec, {headers: this.getHeaders});
  }

  consulterReclamation(reclamationtId: number): Observable<Reclamation> {
    const url = `${this.consulturl}/${reclamationtId}`;
    return this.http.get<Reclamation>(url);
  }

  CloseReclamation(idReclamation: string) {
    return this.http.put<Reclamation>(this.consulturl+'/close/' + idReclamation , {headers: this.getHeaders});

  }

  DeleteReclamation(reclamationId: string) {
    return this.http.delete<Reclamation>(this.consulturl+'/delete/' + reclamationId , {headers: this.getHeaders});
  }
}
