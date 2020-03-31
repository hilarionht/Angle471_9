import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'user'): any {

    let url =  environment.apiUrl + `/download/image/` ;
// console.log(url);1
    if ( !img ) {
      return url + 'user-image-2.png';
    }
// console.log(url);
    // if ( img.indexOf('https') >= 0 ) {
    //   return img;
    // }
    switch ( tipo ) {

      case 'user':
        url +=  img;
        break;
      default:
        // console.log('tipo de imagen no existe, user, candidata, jurado');
        url += img;
    }
    console.log(url);
    return url;
  }

}
