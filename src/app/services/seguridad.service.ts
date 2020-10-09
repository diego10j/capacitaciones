import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {


  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  validarLogin(credenciales:any) {

    const url = `${environment.api_rest}/servicios/Seguridad.php/validarLogin`;

    return this.http.post(url, credenciales )
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.datos.token, resp.datos.menu);
          localStorage.setItem('ID_USU', resp.datos.ID_USU);
          localStorage.setItem('IDENTIFICACION_USU', resp.datos.IDENTIFICACION_USU);
        })
      )

  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

}
