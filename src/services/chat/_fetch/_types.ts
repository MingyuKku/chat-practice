import { chatTimeFormat, chatTimeFormatGetTime, chatTimeFormatText } from "./methods";

export interface ChatListData {
    flag: boolean;
    chatList: ChatGroup[];
}

export interface ChatGroup {
    date: string | null;
    chats: ChatListClass[];
    dateTimestamp?: number;
}

export interface ChatRes {
    flag: boolean;
    chatList: ChatList[];
}


interface ChatList {
    answer: string; // 유저 채팅 내용
    character_se: number; // 캐릭터 일련번호
    id: string; // 채팅 id값
    member_se: number; // 회원 일련번호
    message: string; // 캐릭터 채팅 내용
    reg_dt: string; // 채팅 시간
}

export class ChatListClass {
    answer: string | null;
    character_se: number;
    id: string | null;
    member_se: number;
    message: string | null;
    reg_dt: string;
    timeText: string;
    chatTimeText: string;
    chatTimestamp: number;
    chatTimestampFormat: number;
    constructor(res: ChatList) {
        this.answer = res.answer;
        this.character_se = res.character_se;
        this.id = res.id;
        this.member_se = res.member_se;
        this.message = res.message;
        this.reg_dt = res.reg_dt;
        this.timeText = chatTimeFormatText(res.reg_dt);
        this.chatTimeText = chatTimeFormat(res.reg_dt);
        this.chatTimestamp = new Date(res.reg_dt).getTime();
        this.chatTimestampFormat = chatTimeFormatGetTime(res.reg_dt);
    }
}


export interface NewAccumulate {
    [key: string]: {
        date: string | null;
        dateTimestamp: number;
        chats: ChatListClass[];
    }
}
