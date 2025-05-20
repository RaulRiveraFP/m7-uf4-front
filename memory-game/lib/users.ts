// lib/users.ts

export interface Usuario {
  username: string;
  password: string;
}

const STORAGE_KEY = 'usuarios_app';

// Obtiene la lista de usuarios de localStorage o devuelve array vacío
export function obtenerUsuarios(): Usuario[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Guarda la lista de usuarios en localStorage
export function guardarUsuarios(usuarios: Usuario[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

// Añade un nuevo usuario si no existe el username
export function registrarUsuario(usuario: Usuario): boolean {
  const usuarios = obtenerUsuarios();
  const existe = usuarios.some((u) => u.username === usuario.username);
  if (existe) return false; // ya existe
  usuarios.push(usuario);
  guardarUsuarios(usuarios);
  return true;
}

// Valida si usuario y password coinciden
export function validarUsuario(username: string, password: string): boolean {
  const usuarios = obtenerUsuarios();
  return usuarios.some((u) => u.username === username && u.password === password);
}
