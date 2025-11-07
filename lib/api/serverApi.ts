import { api } from "@/app/api/api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { cookies } from "next/headers";

const API_URL = 'https://notehub-api.goit.study'

interface FetchNotesProps {
    notes: Note[];
    totalPages: number
}

type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (search?: string, page: number = 1, tag?: string):Promise <FetchNotesProps> => {
  const cookieStore = await cookies();
  const params: Record<string, string | number> = { search: search || '', page };
    if (tag) params.tag = tag;

    const response = await api.get<FetchNotesProps>(API_URL, 
        {params,
        headers: {
        Cookie: cookieStore.toString(),
    }
    },
    )
    return response.data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const cookieStore = await cookies();
  const res = await api.get<Note>(`${API_URL}/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        }
    })
    return res.data
}

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
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
  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};