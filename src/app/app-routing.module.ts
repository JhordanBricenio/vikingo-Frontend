import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsideComponent } from './components/administrator/aside/aside.component';
import { DashboardComponent } from './components/administrator/dashboard/dashboard.component';
import { IndexComponent } from './components/administrator/index/index.component';
import { IndexProductsComponent } from './components/administrator/products/index-products/index-products.component';
import { IndexVentasComponent } from './components/administrator/ventas/index-ventas/index-ventas.component';
import { CreateProductsComponent } from './components/administrator/products/create-products/create-products.component';
import { CreateVentasComponent } from './components/administrator/ventas/create-ventas/create-ventas.component';
import { DetalleVentasComponent } from './components/administrator/ventas/detalle-ventas/detalle-ventas.component';
import { DetalleProductsComponent } from './components/administrator/products/detalle-products/detalle-products.component';
import { IndexMarcasComponent } from './components/administrator/marcas/index-marcas/index-marcas.component';
import { CreateMarcasComponent } from './components/administrator/marcas/create-marcas/create-marcas.component';
import { IndexCategoriesComponent } from './components/administrator/categories/index-categories/index-categories.component';
import { CreateCategoriesComponent } from './components/administrator/categories/create-categories/create-categories.component';


const routes: Routes = [
  { path: '', component: AsideComponent, pathMatch: 'full'} ,
  {
  path: 'admin', component: DashboardComponent,
  children: [
    { path: 'dashboard', component: IndexComponent },
    { path: 'products', component: IndexProductsComponent },
    { path: 'products/create', component: CreateProductsComponent },
    { path: 'products/edit/:id', component: CreateProductsComponent },
    { path: 'products/page/:page', component: IndexProductsComponent },
    { path: 'products/ver/:id', component: DetalleProductsComponent },

    { path: 'ventas', component: IndexVentasComponent },
    { path: 'ventas/create', component: CreateVentasComponent },
    { path: 'ventas/edit/:id', component: CreateVentasComponent },
    { path: 'ventas/detalle/:id', component: DetalleVentasComponent },

    { path: 'marcas', component: IndexMarcasComponent },
    { path: 'marcas/create', component: CreateMarcasComponent },

    { path: 'categories', component: IndexCategoriesComponent },
    { path: 'categories/create', component: CreateCategoriesComponent },

    {path: '', component: IndexComponent},

  
  ]}];
 /* { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'nosotros', component: NosotrosComponent, pathMatch: 'full' },
  { path: 'eventos', component: EventosComponent, pathMatch: 'full' },
  { path: 'talleres', component: WorkshopComponent, pathMatch: 'full' },
  { path: 'docentes', component: DocentesComponent },
  { path: 'blog', component: BlogComponent, pathMatch: 'full' },
  { path: 'contactanos', component: ContactanosComponent, pathMatch: 'full' },
  {
    path: 'admin', component: DashboardComponent,
    children: [
      { path: 'dashboard', component: IndexAlumnosComponent },
      { path: 'degrees', component: DegreeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/:id', component: CoursesComponent },
      { path: 'course/:id', component: IndexAlumnosComponent },

      { path: 'alumnos', component: IndexAumnosCrudComponent },
      { path: 'alum/create', component: CreateAlumnosComponent },
      { path: 'alumnos/edit/:id', component: CreateAlumnosComponent },/*




     // { path: '', component:WelcomeComponent}
    ]
    }/*
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }