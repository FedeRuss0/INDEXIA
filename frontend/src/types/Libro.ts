export interface Libro {
  id?: number;
  codigoLibro?: string;
  titulo: string;
  autor: string;
  genero: string;
  anio: number;
  isbn: string;
  disponible: boolean;
}