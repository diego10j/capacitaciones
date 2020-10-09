import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import {TableModule} from 'primeng/table';
import { PipesModule } from '../pipes/pipes.module';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {DialogModule} from 'primeng/dialog';
import {DataViewModule} from 'primeng/dataview';
import {ListboxModule} from 'primeng/listbox';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AreasComponent } from './areas/areas.component';
import { TipoFormacionComponent } from './tipo-formacion/tipo-formacion.component';
import { TipoCursoComponent } from './tipo-curso/tipo-curso.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { ModalidadComponent } from './modalidad/modalidad.component';
import { PerfilOpcionComponent } from './perfil-opcion/perfil-opcion.component';
import { OpcionComponent } from './opcion/opcion.component';
import { OfertaCursoComponent } from './oferta-curso/oferta-curso.component';
import { LugarComponent } from './lugar/lugar.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { HorarioCursoComponent } from './horario-curso/horario-curso.component';
import { EstadoOfertaComponent } from './estado-oferta/estado-oferta.component';
import { EstadoInscripcionComponent } from './estado-inscripcion/estado-inscripcion.component';
import { CursosComponent } from './cursos/cursos.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { DatosUsuarioComponent } from './usuario/datos-usuario/datos-usuario.component';
import { DatosCursoComponent } from './cursos/datos-curso/datos-curso.component';
import { DatosInstitucionComponent } from './institucion/datos-institucion/datos-institucion.component';
import { DatosOfertaComponent } from './oferta-curso/datos-oferta/datos-oferta.component';
import { HorarioOfertaComponent } from './oferta-curso/horario-oferta/horario-oferta.component';
import { MaterialOfertaComponent } from './oferta-curso/material-oferta/material-oferta.component';
import { CursosPlanificadosComponent } from './cursos-planificados/cursos-planificados.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { BusquedaCursosComponent } from './busqueda-cursos/busqueda-cursos.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { InscritosOfertaComponent } from './oferta-curso/inscritos-oferta/inscritos-oferta.component';
import { DetalleCursoComponent } from './mis-cursos/detalle-curso/detalle-curso.component';





@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,


    AreasComponent,
    TipoFormacionComponent,
    TipoCursoComponent,
    PerfilesComponent,
    ModalidadComponent,
    PerfilOpcionComponent,
    OpcionComponent,
    OfertaCursoComponent,
    LugarComponent,
    InstitucionComponent,
    InscripcionComponent,
    HorarioCursoComponent,
    EstadoOfertaComponent,
    EstadoInscripcionComponent,
    CursosComponent,
    AsistenciaComponent,
    UsuarioComponent,
    DatosUsuarioComponent,
    DatosCursoComponent,
    DatosInstitucionComponent,
    DatosOfertaComponent,
    HorarioOfertaComponent,
    MaterialOfertaComponent,
    CursosPlanificadosComponent,
    MisCursosComponent,
    BusquedaCursosComponent,
    EvaluacionComponent,
    InscritosOfertaComponent,
    DetalleCursoComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    BrowserAnimationsModule,
    BrowserModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    InputMaskModule,
    DialogModule,
    DataViewModule,
    ListboxModule,
  ]
})
export class PagesModule { }
