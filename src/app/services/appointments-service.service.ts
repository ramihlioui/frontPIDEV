import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../Entity/Appointment'; 
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {

    requestHeaders2 = new HttpHeaders(    {"Authorization":"Bearer"+ `Bearer ${this.userAut.getToken()}`});
    baseUrl = 'http://localhost:8080/api';
    
    constructor(private http: HttpClient,private  userAut:UserAuthService) {
     }
  // Method to fetch all appointments
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`);
  }

  // Method to fetch a single appointment by id
  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/appointments/${id}`);
  }

  // Method to create a new appointment
  createAppointment(appointment: Appointment): Observable<Appointment> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Appointment>(`${this.baseUrl}/appointments`, appointment, { headers });
  }

  // Method to update an existing appointment
  updateAppointment(appointment: Appointment): Observable<Appointment> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Appointment>(`${this.baseUrl}/appointments/${appointment.id}`, appointment, { headers });
  }

  // Method to delete an appointment by id
  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/appointments/${id}`);
  }
}
