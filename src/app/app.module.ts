import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {MatRippleModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTreeModule} from '@angular/material/tree';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';


import { AsideComponent } from './components/administrator/aside/aside.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/administrator/dashboard/dashboard.component';
import { IndexComponent } from './components/administrator/index/index.component';
import { IndexProductsComponent } from './components/administrator/products/index-products/index-products.component';
import { CreateProductsComponent } from './components/administrator/products/create-products/create-products.component';
import { DetalleProductsComponent } from './components/administrator/products/detalle-products/detalle-products.component';
import { IndexVentasComponent } from './components/administrator/ventas/index-ventas/index-ventas.component';
import { CreateVentasComponent } from './components/administrator/ventas/create-ventas/create-ventas.component';
import { DetalleVentasComponent } from './components/administrator/ventas/detalle-ventas/detalle-ventas.component';
import { PaginatorProductsComponent } from './components/administrator/products/paginator-products/paginator-products.component';
import { IndexMarcasComponent } from './components/administrator/marcas/index-marcas/index-marcas.component';
import { CreateMarcasComponent } from './components/administrator/marcas/create-marcas/create-marcas.component';
import { IndexCategoriesComponent } from './components/administrator/categories/index-categories/index-categories.component';
import { CreateCategoriesComponent } from './components/administrator/categories/create-categories/create-categories.component';
import { SignupComponent } from './components/administrator/signup/signup.component';
import { ContactComponent } from './components/Inicio/contact/contact.component';
import { ProfileComponent } from './components/administrator/profile/profile.component';
import { RegisterComponent } from './components/administrator/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    DashboardComponent,
    IndexComponent,
    IndexProductsComponent,
    CreateProductsComponent,
    DetalleProductsComponent,
    IndexVentasComponent,
    CreateVentasComponent,
    DetalleVentasComponent,
    PaginatorProductsComponent,
    IndexMarcasComponent,
    CreateMarcasComponent,
    IndexCategoriesComponent,
    CreateCategoriesComponent,
    SignupComponent,
    ContactComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatChipsModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTreeModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
