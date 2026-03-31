// atoms/user.ts
import { atom } from "jotai";
import { tpHttpService } from "../services/httpService";
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

export const tpuserAtom = atom<UserState>(initialState);
// Actions atom (dispatcher)
export const userActionsAtom = atom(
  null,
  async (get, set, action: { type: "fetch"; payload?: unknown }) => {
    switch (action.type) {
      case "fetch":
        try {
          set(tpuserAtom, { ...get(tpuserAtom), isLoading: true });
          const res = await tpHttpService.get<{ data: IUser }>(`/user`);
          set(tpuserAtom, { data: res.data?.data, isLoading: false, error: null });
        } catch (error) {
          const err = error as AxiosError<{ message?: string }>; // ✅ strong cast

          set(tpuserAtom, {
            ...get(tpuserAtom),
            isLoading: false,
            error: err.response?.data?.message || err.message,
          }); 
        }
        break;
    }
  }
);
