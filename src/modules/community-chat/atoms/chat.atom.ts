// src/modules/community-chat/atoms/chat.atoms.ts
import { atom } from 'jotai';
import { IChatMessage } from '../models/community-chat.model';
;

export const activeReplyTargetAtom = atom<IChatMessage | null>(null);