import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/modelos/categoria.model';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  url = "https://leyder.pythonanywhere.com/categoria";

  constructor(private http: HttpClient) { }

  listarCategorias(): Observable<any>{
    return this.http.get(this.url);
  }
  
  getCategoria(id: String): Observable<any>{
    return this.http.get(this.url+"/"+id);
  }
  
  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(this.url+"/"+id);
  }
  
  agregarCategoria(categoria: Categoria): Observable <any>{
    return this.http.post(this.url, categoria);
  }
  
  editarCategoria(id: string, categoria: Categoria): Observable <any> {
    return this.http.put(this.url+"/"+id, categoria);
  }
}
