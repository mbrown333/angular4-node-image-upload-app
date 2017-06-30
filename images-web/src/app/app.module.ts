import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbModal, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { AuthorizationService } from './services/authorization.service';
import { ImageService } from './services/image.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImagesComponent } from './images/images.component';
import { ImageViewComponent } from './image-view/image-view.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ImageUploadComponent,
    ImagesComponent,
    ImageViewComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    ImageViewComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthorizationService,
    NgbModal,
    NgbActiveModal,
    ImageService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }