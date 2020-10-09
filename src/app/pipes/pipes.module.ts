import { NgModule } from '@angular/core';

import { ImagenPipe } from './imagen.pipe';
import { FiltroPipe } from './filtro.pipe';



@NgModule({
  declarations: [ FiltroPipe,ImagenPipe ],
  exports: [FiltroPipe, ImagenPipe ],
})
export class PipesModule { }
