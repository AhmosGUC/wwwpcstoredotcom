import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComputerListComponent } from './computer-list/computer-list.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatGridListModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorModule } from 'ngx-device-detector';
@NgModule({
  declarations: [
    AppComponent,
    ComputerListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
