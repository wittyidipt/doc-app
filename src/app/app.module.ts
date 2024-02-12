import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppQuestionComponent } from './components/app-question/app-question.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryCardsComponent } from './components/gallery-cards/gallery-cards.component';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import { DocLoginComponent } from './components/doc-login/doc-login.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ExtraOptions, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPatientComponent } from './components/search-patient/search-patient.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CommonModule } from '@angular/common';
import { ViewPatientComponent } from './components/view-patient/view-patient.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { HttpClientModule } from '@angular/common/http';


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  declarations: [
    AppComponent,
    AppQuestionComponent,
    GalleryCardsComponent,
    FeatureCardComponent,
    DocLoginComponent,
    WelcomePageComponent,
    UserDetailsComponent,
    SearchPatientComponent,
    ViewPatientComponent,
    AddPatientComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
    RouterModule.forRoot( [
      {path: 'welcome', component: WelcomePageComponent},
      {path: 'login', component: DocLoginComponent},
      {path: 'search-patient', component: SearchPatientComponent},
      {path: 'new-patient', component: AddPatientComponent },
      {path: 'view-patient', component: ViewPatientComponent }
    ], routerOptions )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
