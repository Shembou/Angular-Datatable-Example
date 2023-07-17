import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './layout/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './components/data-table/data-table.component';
@NgModule({
  declarations: [
    HomeComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
