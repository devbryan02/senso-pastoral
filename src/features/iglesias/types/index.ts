export type Iglesia = {
  id: string;
  nombre: string;
  direccion: string;
  departamento: string;
  ciudad: string;
  provincia: string;
  cant_miembros: number;
  fecha_registro: string; 
};

export type IglesiaUpdateRequest = {
  id: string;
  nombre?: string;
  direccion?: string;
  departamento?: string;
  ciudad?: string;
  provincia?: string;
  cant_miembros?: number;
  fecha_registro?: string;
};

export type CreateIglesiaRequest = {
  nombre: string;
  direccion: string;
  departamento: string;
  ciudad: string;
  provincia: string;
  cant_miembros: number;
  fecha_registro: string;
};

export type CreateIglesiaResponse = {
  data: Iglesia;
  message: string;
};

export type UpdateIglesiaResponse = {
  data: Iglesia;
  message: string;
};

export type DeleteIglesiaResponse = {
  message: string;
};
