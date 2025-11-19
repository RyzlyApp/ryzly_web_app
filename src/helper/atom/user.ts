// atoms/user.ts
import { atom } from "jotai";
import httpService from "../services/httpService";
import { IUser } from "../model/user";
import { AxiosError } from "axios";

type UserState = {
  data: IUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: null,
};

export const userAtom = atom<UserState>(initialState);
// Actions atom (dispatcher)
export const userActionsAtom = atom(
  null,
  async (get, set, action: { type: "fetch"; payload?: unknown }) => {
    switch (action.type) {
      case "fetch":
        try {
          set(userAtom, { ...get(userAtom), isLoading: true });
          const res = await httpService.get<{ data: IUser }>(`/user`);
          set(userAtom, { data: res.data?.data, isLoading: false, error: null });
        } catch (error) {
          const err = error as AxiosError<{ message?: string }>; // ✅ strong cast

          set(userAtom, {
            ...get(userAtom),
            isLoading: false,
            error: err.response?.data?.message || err.message,
          }); 
        }
        break;
    }
  }
);
