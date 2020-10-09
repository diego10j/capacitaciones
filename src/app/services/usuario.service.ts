import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';


declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public usuario: Usuario;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }



  guardarLocalStorage(token: string, menu: any) {

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.post(`${environment.api_rest}/servicios/Seguridad.php/validarToken`, null, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        //console.log(this.usuario);
        this.usuario = new Usuario(resp.datos.NOMBRES_USU, resp.datos.CORREO_USU, '', resp.datos.FOTO_USU, false, 'USER_ROLE', resp.datos.IDENTIFICACION_USU);
        this.guardarLocalStorage(this.token, resp.datos.menu);
        return true;
      }),
      catchError(error => of(false))
    );

  }



  //////
  listar() {
    const url = `${environment.api_rest}/servicios/Usuario.php/listar`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }

  crear(campos: any) {
    const url = `${environment.api_rest}/servicios/Usuario.php/crear`;
    //return this.http.post( url, { nombre }, this.headers );
    return this.http.post(url, campos, this.headers );
  }

  actualizar(_id: string, campos: any) {

    const url = `${environment.api_rest}/servicios/Usuario.php/actualizar/${_id}`;
    return this.http.put(url, campos, this.headers );
  }

  eliminar(_id: string) {

    const url = `${environment.api_rest}/servicios/Usuario.php/eliminar/${_id}`;
    return this.http.delete(url, this.headers );
  }



  getOpcionesUsuario(UsuarioSeleccionado: string) {
    const url = `${environment.api_rest}/servicios/Usuarioopcion.php/listar/ ${UsuarioSeleccionado}`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }

  crearPermiso(campos: any) {
    const url = `${environment.api_rest}/servicios/Usuarioopcion.php/crear`;
    //return this.http.post( url, { nombre }, this.headers );
    return this.http.post(url, campos, this.headers );
  }

  eliminarPermiso(_id: string) {

    const url = `${environment.api_rest}/servicios/Usuarioopcion.php/eliminar/${_id}`;
    return this.http.delete(url, this.headers );
  }


  getPorCodigo(_id) {
    const url = `${environment.api_rest}/servicios/Usuario.php/getPorCodigo/${_id}`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }

  getComboCapacitadores() {
    const url = `${environment.api_rest}/servicios/Usuario.php/getComboCapacitadores`;
    return this.http.get(url, this.headers )
      .pipe(
        map((resp) => resp)
      );
  }

  actualizarImagen(_id: string, campos: any) {

    const url = `${environment.api_rest}/servicios/Usuario.php/actualizarImagen/${_id}`;
    return this.http.put(url, campos, this.headers );
  }

}
