import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdministradorRequest } from '../models/AdministradorRequest';
import { user } from '../models/User';
import { AuthRequest } from '../models/AuthRequest';
import { JwtResponse } from '../models/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = environment.baseUrl;
  /****
  private status:boolean=false;
   */
  constructor(private http:HttpClient) { }

  login(auth:AuthRequest):Observable<JwtResponse>{
    console.log("ACCEDIENDO A SERVICIO");
    const url = `${this.baseUrl}administrador/login`;
    console.log(url);

    return this.http.post<JwtResponse>(url,auth);

  }

  loginprovider(auth:AuthRequest):Observable<JwtResponse>{
    console.log("ACCEDIENDO A SERVICIO");
    const url = `${this.baseUrl}administrador/login/proveedor`;
    console.log(url);

    return this.http.post<JwtResponse>(url,auth);

  }

  loginuser(auth:AuthRequest):Observable<JwtResponse>{
    console.log("ACCEDIENDO A SERVICIO");
    const url = `${this.baseUrl}login/user`;
    console.log(url);

    return this.http.post<JwtResponse>(url,auth);

  }

  validarToken(id:number, jwt:string):Observable<boolean>{
    return this.verificarSesion(id,jwt)
    .pipe(
      map(resp =>{
        return true;
      }),
      catchError(err =>of(false))
    );

  }

  verificarSesion(id:number, jwt:string):Observable<AdministradorRequest>{
    const url = `${this.baseUrl}administrators/${id}/${jwt}`;
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<AdministradorRequest>(url, { headers: reqHeader });
  }
  
  verificarSesionCliente(id:number, jwt:string):Observable<user>{
    const url = `${this.baseUrl}users/${id}/${jwt}`;
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<user>(url, { headers: reqHeader });
  }

}
