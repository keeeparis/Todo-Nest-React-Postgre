export interface User {
    id: number;
    email: string;
    password: string;
    posts: Post[];
    roles: Role[];
    createdAt: string;
    updatedAt: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    image: string;
}

export interface Role {
    id: number;
    value: string;
    description: string;
}

export interface UserCreds {
    email: string;
    password: string;
}

export interface authIS {
    currentUser: string | null | User,
    error: string | null,
    isLoading: boolean
}