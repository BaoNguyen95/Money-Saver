
export interface IUser {
    id?: string;
    username: string;
    password?: string;
    createdAt?: Date;
    roleId: string;
    displayName: string;
    image?: string;
}

export interface IRole {
    id: string;
    name: string;
    actions: string;
}

export interface IResponse {
    success?: boolean;
    message?: string;
    downloadURL?: string;
}
