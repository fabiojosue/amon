import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteComponent } from './Components/reporte/reporte.component';
import { AppComponent } from './app.component';
import { MapaComponent } from './Components/mapa/mapa.component';

const routes: Routes = [
  {path: '', component: MapaComponent},
  {
    path: 'reporte', component: ReporteComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
