import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File
  ) {

    try {
      const url = `${environment.api_rest}/servicios/Upload.php/uploadImagen`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if (data.datos) {
        return data.datos.NOMBRE_IMAGEN;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }



  async subirArchivo(
    archivo: File
  ) {

    try {
      const url = `${environment.api_rest}/servicios/Upload.php/uploadArchivo`;
      const formData = new FormData();
      formData.append('archivo', archivo);

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if (data.datos) {
        return data.datos.NOMBRE_ARCHIVO;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }


}
