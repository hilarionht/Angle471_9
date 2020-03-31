import { Role } from '.';

export class User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    state?: boolean;
    email?: string;
    image?: string;
    role?: Role;
    roleId?: string;
    token?: string;
    id?: number;
    constructor(id: number) {
        this.id = id;
    }
}
