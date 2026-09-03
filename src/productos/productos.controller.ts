import { Controller, Get, Param } from '@nestjs/common';

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
    { id: '1', nombre: 'Leche', categoria: 'Lácteos', stock: 12, fechaVencimiento: '2026-12-10' },
    { id: '2', nombre: 'Pan tajado', categoria: 'Panadería', stock: 0, fechaVencimiento: '2026-09-15' },
    { id: '3', nombre: 'Yogur', categoria: 'Lácteos', stock: 8, fechaVencimiento: '2025-08-20' },
    { id: '4', nombre: 'Arroz', categoria: 'Granos', stock: 20, fechaVencimiento: '2027-05-30' },
    { id: '5', nombre: 'Galletas', categoria: 'Snacks', stock: 0, fechaVencimiento: '2025-12-01' },
  ];

  // GET /productos
  @Get('')
  getProductos() {
    return this.productos;
  }

  // GET /productos/sin-stock
  @Get('sin-stock')
  getProductosSinStock() {
    return this.productos.filter((producto) => producto.stock === 0);
  }

  // GET /productos/vencidos
  @Get('vencidos')
  getProductosVencidos() {
    const hoy = new Date();
    return this.productos.filter(
      (producto) => new Date(producto.fechaVencimiento) < hoy,
    );
  }

  // GET /productos/categoria/Lácteos
  @Get('categoria/:categoria')
  getProductosPorCategoria(@Param('categoria') categoria: string) {
    return this.productos.filter(
      (producto) => producto.categoria.toLowerCase() === categoria.toLowerCase(),
    );
  }

  // GET /productos/1
  @Get(':id')
  getProductoPorId(@Param('id') id: string) {
    return this.productos.find((producto) => producto.id === id);
  }
}
