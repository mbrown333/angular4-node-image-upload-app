import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
   @Input() imageUrl: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() { }

}
