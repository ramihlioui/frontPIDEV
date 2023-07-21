import {User} from './UserModel';

export class Reclamation {
    id: number ;
    title: string ;
    creationDate: string;
    treated: boolean;
    description: string ;
    solution: string ;
    claimer: User;
}