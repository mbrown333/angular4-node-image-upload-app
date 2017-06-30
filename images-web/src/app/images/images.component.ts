import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ImageViewComponent } from '../image-view/image-view.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  images: Array<Image> = new Array<Image>();

  constructor(private imageService: ImageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchImages();
  }

  fetchImages() {
    this.imageService.getImages().subscribe(images => this.images = images);
  }

  viewImage(url: string) {
    const modal = this.modalService.open(ImageViewComponent, { size: 'lg' });
    modal.componentInstance.imageUrl = url;
  }

  deleteImage(image: Image) {
    this.imageService.deleteImage(image.id).subscribe(result => {
      const index = this.images.indexOf(image);
      this.images.splice(index, 1);
    });
  }

  editImage(image: Image) {
    image.editMode = true;
    image.originalLabel = image.label;
  }

  updateImage(image: Image) {
    this.imageService.updateImage(image).subscribe(result => {
      image.editMode = false;
      image.updateSuccessAlert = true;
      setTimeout(() => {
        image.updateSuccessAlert = false;
      }, 5000)
    });
  }

  cancelEdit(image: Image) {
    image.editMode = false;
    image.label = image.originalLabel;
  }
}
