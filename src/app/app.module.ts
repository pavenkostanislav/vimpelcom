import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RangeSliderModule } from '@brewermap/range-slider';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockDboEffects } from './mock-dbo.effects';
import { metaReducers, reducerProvider, REDUCERS_TOKEN } from './reducers';
import { TableHttpExampleComponent } from './table-http-example/table-http-example.component';
import { NumberSpacePipe } from './number-space.pipe';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, TableHttpExampleComponent, NumberSpacePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    RangeSliderModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    StoreModule.forRoot(REDUCERS_TOKEN, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([MockDboEffects]),
  ],
  providers: [
    DecimalPipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    {
      provide: LOCALE_ID,
      useValue: 'en-RU',
    },
    reducerProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
