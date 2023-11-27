export class Usuario {
    id: number;
    nombres: string;
    apellidos: string;
    password: string;
    email: string;
    dni: string;
    telefono: string;
    enabled: boolean;
    foto:string;
    roles: string[]=[];
}
