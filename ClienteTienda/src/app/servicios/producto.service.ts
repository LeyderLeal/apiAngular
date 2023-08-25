import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = "https://leyder.pythonanywhere.com/producto";

  constructor(private http: HttpClient) {} 

  getProductos():Observable<any>{
   return this.http.get(this.url);
  }

  getProducto(id: String): Observable<any>{
    return this.http.get(this.url+"/"+id);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url+"/"+id);
  }

  /**
   * 
   * @param producto 
   * @returns producto agregado en formato json
   */

  agregarProducto(producto: any): Observable <any>{
    return this.http.post(this.url, producto);
  }

  editarProducto(id: string, producto: Producto): Observable <any>{
    return this.http.put(this.url+"/"+id, producto);
  }
}
