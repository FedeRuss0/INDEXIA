export type Usuario = {
  Id: number;
  usuarioId?: string;
  nombre: string;
  email: string;
  password: string;
  rol: "ADMIN" | "BIBLIOTECARIO" | "CLIENTE";
};
