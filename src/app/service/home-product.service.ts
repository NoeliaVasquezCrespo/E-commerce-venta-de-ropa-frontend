import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Size } from 'tsparticles/dist/Options/Classes/Particles/Size/Size';
import { FotosProducto } from '../models/FotosProducto';
import { ProductDetails } from '../models/ProductDetails';

@Injectable({
  providedIn: 'root'
})
export class HomeProductService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient){ }

  getListProducts():Observable<ProductDetails[]> {
    const url = `${this.baseUrl}products/details`;
    return this.http.get<ProductDetails[]>(url).pipe(
      map(
        response => response, error => error));
  }
  getListProductsByProviderId(idProvider:number):Observable<ProductDetails[]> {
    const url = `${this.baseUrl}products/details/${idProvider}`;
    console.log(url);
    return this.http.get<ProductDetails[]>(url).pipe(
      map(
        response => response, error => error));
  }
  getFirstImageByProductId(idProducto:number):Observable<FotosProducto>{
    const url = `${this.baseUrl}products/image/${idProducto}`;
    return this.http.get<FotosProducto>(url).pipe(
      map(
        response => response, error => error));
  }
  getProductByProductId(idProducto:number):Observable<FotosProducto>{
    const url = `${this.baseUrl}products/${idProducto}`;
    return this.http.get<FotosProducto>(url).pipe(
      map(
        response => response, error => error));
  }
  getProductDetailsByNameAndMarca(name:string, marca:string):Observable<ProductDetails>{
    let url = `${this.baseUrl}products/details/`;
    let newUrl=``;
    if(marca==''){
      newUrl = `${url}productName=${name}`;
      console.log(newUrl);
    }else{
      newUrl = `${url}productName=${name}/marca=${marca}`;
      console.log(newUrl);
    }
    return this.http.get<ProductDetails>(newUrl).pipe(
      map(
        response => response, error => error));
  }
  // getRouteImage(path:string, name:string){
  //   const url = `${this.baseUrl}products/image/${idProducto}`;

  // }
}
