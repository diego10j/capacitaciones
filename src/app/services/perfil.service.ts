import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

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
    const url = `${environment.api_rest}/servicios/Perfil.php/listar`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }

  crear(campos: any) {
    const url = `${environment.api_rest}/servicios/Perfil.php/crear`;
    //return this.http.post( url, { nombre }, this.headers );
    return this.http.post(url, campos, this.headers );
  }

  actualizar(_id: string, campos: any) {

    const url = `${environment.api_rest}/servicios/Perfil.php/actualizar/${_id}`;
    return this.http.put(url, campos, this.headers );
  }

  eliminar(_id: string) {

    const url = `${environment.api_rest}/servicios/Perfil.php/eliminar/${_id}`;
    return this.http.delete(url, this.headers );
  }



  getOpcionesPerfil(perfilSeleccionado:string ) {
    const url = `${environment.api_rest}/servicios/Perfilopcion.php/listar/ ${perfilSeleccionado}`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }

  crearPermiso(campos: any) {
    const url = `${environment.api_rest}/servicios/Perfilopcion.php/crear`;
    //return this.http.post( url, { nombre }, this.headers );
    return this.http.post(url, campos, this.headers );
  }

  eliminarPermiso(_id: string) {

    const url = `${environment.api_rest}/servicios/Perfilopcion.php/eliminar/${_id}`;
    return this.http.delete(url, this.headers );
  }

}
