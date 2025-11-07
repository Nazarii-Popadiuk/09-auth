import axios from "axios"
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
  userName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

export const fetchNotes = async (search?: string, page: number = 1, tag?: string):Promise <FetchNotesProps> => {
const params: Record<string, string | number> = { search: search || '', page };
    if (tag) params.tag = tag;

    const response = await axios.get<FetchNotesProps>(API_URL, 
        {params,
        headers: {
        Authorization: `Bearer ${token}`
    }
    },
    )
    return response.data
}

export const createNote = async (title: string, content: string, tag: string): Promise<Note> => {
    const response = await axios.post<Note>(API_URL, 
        { title, content, tag }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )
    return response.data
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete<Note>(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await axios.get<Note>(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const fetchTags = async (): Promise<string[]> => {
  const response = await axios.get<{ tags: string[] }>(`${API_URL}/tags`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    return response.data.tags
    
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
  const { data } = await api.get<User>('/auth/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.put<User>('/auth/me', payload);
  return res.data;
};