export type Usuario = {
  id?: number;
  usuarioId?: string;
  nombre: string;
  email: string;
  password: string;
  rol: "ADMIN" | "BIBLIOTECARIO" | "CLIENTE";
  verificado?: boolean;
};
