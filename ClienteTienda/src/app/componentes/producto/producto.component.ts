import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { Producto } from 'src/app/modelos/producto.model';
import { ProductoService } from 'src/app/servicios/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {

  frmProducto!: FormGroup;
  producto!: Producto;
  mensaje:string = '';
  listaCategorias:any;
  rutaFoto:any;

  constructor(private router : Router,
              private productoService: ProductoService,
              private categoriaService: CategoriaService){
  }

  /**
   * Obtiene las categorias de los productos
   */
  listarCategorias(){
    this.categoriaService.listarCategorias().subscribe((result) => {
      this.listaCategorias=result;
    });
  }

  /**
   * Al seleccionar el archivo de la imagen
   * esta la asigna al control llamado fileFoto
   * @param event 
   */
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rutaFoto = URL.createObjectURL(file);
      this.frmProducto.get('fileFoto')?.setValue(file);
    }
  }
/**
 * Agrega un producto @param frmProductoValue hace referencia
 * al formulario con sus valores de cada campo 
 */
  agregarProducto(frmProductoValue:any){
    /*
      formData: objeto creado para enviar los datos del formulario incluyendo la imagen
    */
    const formData = new FormData();

    if (this.frmProducto.valid){
      var codigo = frmProductoValue.txtCodigo;
      var nombre = frmProductoValue.txtNombre;
      var precio = frmProductoValue.txtPrecio;
      var categoria = frmProductoValue.cbCategoria;
      var foto = frmProductoValue.fileFoto;
      formData.append('proCodigo', codigo);
      formData.append('proNombre', nombre);
      formData.append('proPrecio', precio);
      formData.append('proCategoria', categoria);
      formData.append('proFoto', this.frmProducto.get('fileFoto')?.value);
      this.producto = new Producto(codigo,nombre,precio,categoria, foto);
    }
    //Peticion a productoService para agregar el producto
    this.productoService.agregarProducto(formData).subscribe(respuesta=>{
        //Al agregar pasamos a la vista donde se muestran los productos
        this.router.navigate(["/","productos"])
    }, error=>{
      console.log(error);
    });
  }

  /**
   * Al cargar el formulario
   */  
  ngOnInit(): void {
      this.listarCategorias();
      this.frmProducto = new FormGroup ({
        txtCodigo: new FormControl ( '' , [ Validators . required]),
        txtNombre: new FormControl ( '' , [ Validators . required , 
                                            Validators . maxLength ( 60 )]),
        txtPrecio: new FormControl ( '' , [ Validators . required]),
        cbCategoria: new FormControl ('',[ Validators . required]),
        fileFoto: new FormControl ('',)
      });
  }
}
