import { Control, Path, UseFormRegister } from 'react-hook-form'

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

export type InputProps = {
    label: Path<UserCreds>,
    register: UseFormRegister<UserCreds>,
    required: boolean,
    pattern?: RegExp,
    minLength?: number,
    maxLength?: number,
    type?: string,
    control: Control<UserCreds, object>
}