import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfertaCursoService {
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

  listar() {
    const url = `${environment.api_rest}/servicios/Ofertacurso.php/listar`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }

  crear(campos: any) {
    const url = `${environment.api_rest}/servicios/Ofertacurso.php/crear`;
    //return this.http.post( url, { nombre }, this.headers );
    return this.http.post(url, campos, this.headers );
  }

  actualizar(_id: string, campos: any) {

    const url = `${environment.api_rest}/servicios/Ofertacurso.php/actualizar/${_id}`;
    return this.http.put(url, campos, this.headers );
  }

  eliminar(_id: string) {

    const url = `${environment.api_rest}/servicios/Ofertacurso.php/eliminar/${_id}`;
    return this.http.delete(url, this.headers );
  }

  getPorCodigo(_id) {
    const url = `${environment.api_rest}/servicios/Ofertacurso.php/getPorCodigo/${_id}`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }

  getBusquedaCodigo(_id: string) {
    const url = `${environment.api_rest}/servicios/Ofertacurso.php/getBusquedaCodigo/${_id}`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }


  getCursosProgramados() {
    const url = `${environment.api_rest}/servicios/Ofertacurso.php/getCursosProgramados`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }


  listarFiltro(campos: any) {
    const url = `${environment.api_rest}/servicios/Ofertacurso.php/listarFiltro`;
    //return this.http.post( url, { nombre }, this.headers );
    return this.http.post(url, campos, this.headers );
  }


  getCursosCapacitador(_id) {
    const url = `${environment.api_rest}/servicios/Ofertacurso.php/getCursosCapacitador/${_id}`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }




}
