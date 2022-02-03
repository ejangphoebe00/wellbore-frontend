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
 
//   items: GalleryItem[] = [];

//   constructor(public gallery: Gallery) {
//   }

//   ngOnInit() {
//     // 1. Create gallery items
//     this.items = data.map(item =>
//       new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
//     );

//     // Load items into the lightbox
//     this.basicLightboxExample();

//     // Load item into different lightbox instance
//     // With custom gallery config
//     this.withCustomGalleryConfig();
//   }

//   basicLightboxExample() {
//     this.gallery.ref().load(this.items);
//   }

//   /**
//    * Use custom gallery config with the lightbox
//    */
//   withCustomGalleryConfig() {

//     // 2. Get a lightbox gallery ref
//     const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

//     // (Optional) Set custom gallery config to this lightbox
//     lightboxGalleryRef.setConfig({
//       imageSize: ImageSize.Cover,
//       thumbPosition: ThumbnailsPosition.Top
//     });

//     // 3. Load the items into the lightbox
//     lightboxGalleryRef.load(this.items);
//   }
// }

// const data = [
//   {
//     srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
//     previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
//   },
//   {
//     srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
//     previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
//   },
//   {
//     srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
//     previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
//   },
//   {
//     srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
//     previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
//   }
// ];

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