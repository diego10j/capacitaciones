import { EstadoOfertaComponent } from './estado-oferta/estado-oferta.component';
import { EstadoInscripcionComponent } from './estado-inscripcion/estado-inscripcion.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ModalidadComponent } from './modalidad/modalidad.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { AdminGuard } from '../guards/admin.guard';
import { AreasComponent } from './areas/areas.component';
import { TipoFormacionComponent } from './tipo-formacion/tipo-formacion.component';
import { TipoCursoComponent } from './tipo-curso/tipo-curso.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { OpcionComponent } from './opcion/opcion.component';
import { PerfilOpcionComponent } from './perfil-opcion/perfil-opcion.component';
import { DatosUsuarioComponent } from './usuario/datos-usuario/datos-usuario.component';
import { CursosComponent } from './cursos/cursos.component';
import { DatosCursoComponent } from './cursos/datos-curso/datos-curso.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { DatosInstitucionComponent } from './institucion/datos-institucion/datos-institucion.component';
import { LugarComponent } from './lugar/lugar.component';
import { OfertaCursoComponent } from './oferta-curso/oferta-curso.component';
import { DatosOfertaComponent } from './oferta-curso/datos-oferta/datos-oferta.component';
import { HorarioOfertaComponent } from './oferta-curso/horario-oferta/horario-oferta.component';
import { MaterialOfertaComponent } from './oferta-curso/material-oferta/material-oferta.component';
import { CursosPlanificadosComponent } from './cursos-planificados/cursos-planificados.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { BusquedaCursosComponent } from './busqueda-cursos/busqueda-cursos.component';
import { InscritosOfertaComponent } from './oferta-curso/inscritos-oferta/inscritos-oferta.component';
import { DetalleCursoComponent } from './mis-cursos/detalle-curso/detalle-curso.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},

  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},

 

  // Rutas de Admin
  //{ path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' }},




  //------------------//

  { path: 'areas', component: AreasComponent, data: { titulo: 'Matenimiento de Áreas' }},
  { path: 'tipo-formacion', component: TipoFormacionComponent, data: { titulo: 'Matenimiento de Tipos de Formación' }},
  { path: 'tipo-curso', component: TipoCursoComponent, data: { titulo: 'Matenimiento de Tipos de Cursos' }},
  { path: 'perfiles', component: PerfilesComponent, data: { titulo: 'Matenimiento de Perfiles' }},
  { path: 'modalidad', component: ModalidadComponent, data: { titulo: 'Matenimiento de Modalidades' }},
  { path: 'opcion', component: OpcionComponent, data: { titulo: 'Matenimiento de Opciones del Sistema' }},
  { path: 'perfil-opcion', component: PerfilOpcionComponent, data: { titulo: 'Permisos de Perfiles' }},
  { path: 'usuario', component: UsuarioComponent, data: { titulo: 'Matenimiento de Usuarios' }},
  { path: 'datos-usuario', component: DatosUsuarioComponent, data: { titulo: 'Crear Usuario' }},
  { path: 'datos-usuario/:id', component: DatosUsuarioComponent, data: { titulo: 'Modificar Usuario' }},

  { path: 'cursos', component: CursosComponent, data: { titulo: 'Mantenimiento Cursos' }},
  { path: 'datos-curso', component: DatosCursoComponent, data: { titulo: 'Crear Curso' }},
  { path: 'datos-curso/:id', component: DatosCursoComponent, data: { titulo: 'Modificar Curso' }},
  { path: 'estado-inscripcion', component: EstadoInscripcionComponent, data: { titulo: 'Mantenimiento Estados de Inscripción' }},
  { path: 'estado-oferta', component: EstadoOfertaComponent, data: { titulo: 'Mantenimiento Estados Oferta Curso' }},

  { path: 'institucion', component: InstitucionComponent, data: { titulo: 'Matenimiento de Instituciones' }},
  { path: 'datos-institucion', component: DatosInstitucionComponent, data: { titulo: 'Crear Institución' }},
  { path: 'datos-institucion/:id', component: DatosInstitucionComponent, data: { titulo: 'Modificar Institución' }},

  { path: 'lugar', component: LugarComponent, data: { titulo: 'Matenimiento de Lugares' }},
  { path: 'oferta-curso', component: OfertaCursoComponent, data: { titulo: 'Matenimiento de Ofertas de Cursos' }},
  { path: 'datos-oferta', component: DatosOfertaComponent, data: { titulo: 'Crear Oferta Curso' }},
  { path: 'datos-oferta/:id', component: DatosOfertaComponent, data: { titulo: 'Modificar Oferta Curso' }},
  { path: 'horario-oferta/:id', component: HorarioOfertaComponent, data: { titulo: 'Horario del Curso' }},
  { path: 'material-oferta/:id', component: MaterialOfertaComponent, data: { titulo: 'Material del Curso' }},
  { path: 'inscritos-oferta/:id', component: InscritosOfertaComponent, data: { titulo: 'Estudiantes del Curso' }},
  { path: 'cursos-planificados', component: CursosPlanificadosComponent, data: { titulo: 'Calendario de Cursos Disponibles' }},
  { path: 'inscripcion/:id', component: InscripcionComponent, data: { titulo: 'Inscripción' }},
  { path: 'mis-cursos', component: MisCursosComponent, data: { titulo: 'Mis Cursos' }},
  { path: 'detalle-curso/:id', component: DetalleCursoComponent, data: { titulo: 'Detalle del curso' }},
  { path: 'busqueda-cursos', component: BusquedaCursosComponent, data: { titulo: 'Busqueda de Cursos' }},
  { path: 'asistencia/:id', component: AsistenciaComponent , data: { titulo: 'Asistencia Curso' }},
  { path: 'evaluacion', component: EvaluacionComponent , data: { titulo: 'Evaluación Cursos' }},

]; 



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
