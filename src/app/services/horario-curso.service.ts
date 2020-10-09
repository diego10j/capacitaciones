import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioCursoService {
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

  listar(_id) {
    const url = `${environment.api_rest}/servicios/Horariocurso.php/listar/${_id}`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }

  crear(campos: any) {
    const url = `${environment.api_rest}/servicios/Horariocurso.php/crear`;
    //return this.http.post( url, { nombre }, this.headers );
    return this.http.post(url, campos, this.headers );
  }

  actualizar(_id: string, campos: any) {

    const url = `${environment.api_rest}/servicios/Horariocurso.php/actualizar/${_id}`;
    return this.http.put(url, campos, this.headers );
  }

  eliminar(_id: string) {

    const url = `${environment.api_rest}/servicios/Horariocurso.php/eliminar/${_id}`;
    return this.http.delete(url, this.headers );
  }

  getPorCodigo(_id) {
    const url = `${environment.api_rest}/servicios/Horariocurso.php/getPorCodigo/${_id}`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }

}
