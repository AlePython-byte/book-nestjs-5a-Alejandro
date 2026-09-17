import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  stock: number;
  fechaVencimiento: string;
}

@Controller('productos')
export class ProductosController {
  private productos: Producto[] = [
    {
      id: '1',
      nombre: 'Leche',
      categoria: 'Lácteos',
      stock: 12,
      fechaVencimiento: '2026-12-10',
    },
    {
      id: '2',
      nombre: 'Pan tajado',
      categoria: 'Panadería',
      stock: 0,
      fechaVencimiento: '2026-09-15',
    },
    {
      id: '3',
      nombre: 'Yogur',
      categoria: 'Lácteos',
      stock: 8,
      fechaVencimiento: '2025-08-20',
    },
    {
      id: '4',
      nombre: 'Arroz',
      categoria: 'Granos',
      stock: 20,
      fechaVencimiento: '2027-05-30',
    },
    {
      id: '5',
      nombre: 'Galletas',
      categoria: 'Snacks',
      stock: 0,
      fechaVencimiento: '2025-12-01',
    },
  ];

  // A. Listar todos los productos
  @Get()
  getProductos() {
    return this.productos;
  }

  // C. Listar productos sin stock
  @Get('sin-stock')
  getProductosSinStock() {
    return this.productos.filter((producto) => producto.stock === 0);
  }

  // D. Listar productos vencidos
  @Get('vencidos')
  getProductosVencidos() {
    const hoy = new Date();

    return this.productos.filter(
      (producto) => new Date(producto.fechaVencimiento) < hoy,
    );
  }

  // E. Listar productos por categoría
  @Get('categoria/:categoria')
  getProductosPorCategoria(@Param('categoria') categoria: string) {
    return this.productos.filter(
      (producto) =>
        producto.categoria.toLowerCase() === categoria.toLowerCase(),
    );
  }

  // B. Buscar producto por ID
  @Get(':id')
  getProductoPorId(@Param('id') id: string) {
    return this.productos.find((producto) => producto.id === id);
  }

  // F. Crear producto
  @Post()
  crearProducto(@Body() nuevoProducto: Producto) {
    this.productos.push(nuevoProducto);

    return {
      mensaje: 'Producto creado correctamente',
      producto: nuevoProducto,
    };
  }

  // G. Actualizar producto
  @Put(':id')
  actualizarProducto(
    @Param('id') id: string,
    @Body() cambiosProducto: Partial<Producto>,
  ) {
    const index = this.productos.findIndex(
      (producto) => producto.id === id,
    );

    if (index === -1) {
      return {
        mensaje: 'Producto no encontrado',
      };
    }

    this.productos[index] = {
      ...this.productos[index],
      ...cambiosProducto,
      id,
    };

    return {
      mensaje: 'Producto actualizado correctamente',
      producto: this.productos[index],
    };
  }

  // H. Eliminar producto
  @Delete(':id')
  eliminarProducto(@Param('id') id: string) {
    const index = this.productos.findIndex(
      (producto) => producto.id === id,
    );

    if (index === -1) {
      return {
        mensaje: 'Producto no encontrado',
      };
    }

    const productoEliminado = this.productos[index];

    this.productos.splice(index, 1);

    return {
      mensaje: 'Producto eliminado correctamente',
      producto: productoEliminado,
    };
  }
}