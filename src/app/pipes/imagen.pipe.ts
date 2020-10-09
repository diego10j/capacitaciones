import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    
    if ( !img ) {
      return `${environment.api_rest}/upload/no-img.jpg`;
  } else if ( img.includes('https') ) {
      return img;
  } else if ( img ) {
      return `${environment.api_rest}/upload/${ img }`;
  } else {
      return `${environment.api_rest}/upload/no-img.jpg`;
  }


  }

}
