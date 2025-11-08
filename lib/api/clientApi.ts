import type { Note } from "../../types/note";
import { User } from "../../types/user";
import { api } from "./api";




const API_URL = 'https://notehub-api.goit.study'

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN_NEW;

interface FetchNotesProps {
    notes: Note[];
    totalPages: number
}


export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username?: string;
  photoUrl?: string;
};

export const fetchNotes = async (search?: string, page: number = 1, tag?: string):Promise <FetchNotesProps> => {
const params: Record<string, string | number> = { search: search || '', page };
    if (tag) params.tag = tag;

    const response = await api.get<FetchNotesProps>(`${API_URL}/notes`, 
        {params,
        headers: {
        Authorization: `Bearer ${token}`
    }
    },
    )
    return response.data
}

export const createNote = async (title: string, content: string, tag: string): Promise<Note> => {
  const response = await api.post<Note>(`${API_URL}/notes`, 
        { title, content, tag }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )
    return response.data
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await api.delete<Note>(`${API_URL}/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await api.get<Note>(`${API_URL}/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}


export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.patch<User>('/users/me', payload);
  return res.data;
};