import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html'
})
export class ImageUploadComponent implements OnInit {
  images: Array<File>;
  errorMessage: string;

  constructor(private imageService: ImageService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  upload() {
    this.imageService.uploadImages(this.images).then(result => {
        this.activeModal.close(true);
    }, (error) => {
        this.errorMessage = 'An error has occured.  Please try again';
    });
  }

  fileChangeEvent(fileInput: any){
      this.images = <Array<File>> fileInput.target.files;
  }
}
