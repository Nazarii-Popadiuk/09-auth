import { api } from "@/app/api/api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = 'https://notehub-api.goit.study'
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN_NEW;

interface FetchNotesProps {
    notes: Note[];
    totalPages: number
}

type CheckSessionRequest = {
  success: boolean;
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

export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await axios.get<Note>(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/auth/me');
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};