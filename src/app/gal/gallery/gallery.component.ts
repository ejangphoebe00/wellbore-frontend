import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {

 constructor() { }

  ngOnInit(): void { }
   
  imgObject: Array<object> = [
      {
        image: 'https://via.placeholder.com/600.png/09f/fff',
        thumbImage: 'https://via.placeholder.com/1200.png/09f/fff',
        title: 'Slider 1',
        alt: 'Hello World 1',
      }, {
        image: 'https://via.placeholder.com/600.png/021/fff',
        thumbImage: 'https://via.placeholder.com/1200.png/021/fff',
        title: 'Slider 2',
        alt: 'Hello World 2'
      }, {
        image: 'https://via.placeholder.com/600.png/321/fff',
        thumbImage: 'https://via.placeholder.com/1200.png/321/fff',
        title: 'Slider 3',
        alt: 'Hello World 3'
      }, {
        image: 'https://via.placeholder.com/600.png/422/fff',
        thumbImage: 'https://via.placeholder.com/1200.png/422/fff',
        title: 'Slider 4',
        alt: 'Hello World 4'
      }, {
        image: 'https://via.placeholder.com/600.png/654/fff',
        thumbImage: 'https://via.placeholder.com/1200.png/654/fff',
        title: 'Slider 5',
        alt: 'Hello World 5'
      }
  ];
  
}