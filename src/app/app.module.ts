import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({ declarations: [AppComponent],
            bootstrap: [AppComponent], 
            imports: [BrowserModule,AppRoutingModule], 
            providers: [provideHttpClient(withInterceptorsFromDi()), provideClientHydration()] })
export class AppModule { }
