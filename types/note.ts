export interface Note {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tag: string
}

export type User = {
    email: string;
    username: string;
    avatar: string;
}