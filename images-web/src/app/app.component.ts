import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthorizationService } from './services/authorization.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImagesComponent } from './images/images.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild(ImagesComponent)
  imagesComponent: ImagesComponent;
  loggedIn: boolean;
  uploadSuccessAlert: boolean;

  constructor(private authorizationService: AuthorizationService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loggedIn = this.authorizationService.loggedIn();
    this.authorizationService.getUserLoggedIn()
      .subscribe(result => {
        this.loggedIn = result;
        if (result) {
          this.imagesComponent.fetchImages();
        } else {
          this.imagesComponent.images = [];
        }
      });
  }

  login() {
    this.modalService.open(LoginComponent);
  }

  register() {
    this.modalService.open(RegisterComponent);
  }

  logout() {
    this.authorizationService.logOut();
  }

  upload() {
    const modalInstance = this.modalService.open(ImageUploadComponent);
    modalInstance.result.then(() => {
      this.uploadSuccessAlert = true;
      setTimeout(() => {
        this.uploadSuccessAlert = false;
        this.imagesComponent.fetchImages()
      }, 3000);
    });
  }
}
