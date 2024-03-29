import { formatDate } from "utils";
import { ChatGroup, ChatListClass, NewAccumulate } from "./_types";

export const chatTimeFormatText = (time?: string) => {
    const now = time ? Date.parseUtcText(time) : new Date();

    return formatDate(now, 'M월 d일');
}

export const chatTimeFormat = (date?: string) => {
    const now = date ? Date.parseUtcText(date) : new Date();
    return formatDate(now, 'HH:mm');
}


export const chatTimeFormatGetTime = (time?: string) => {
    const now = time ? Date.parseUtcText(time) : new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const dateOnly = new Date(year, month, day);

    return dateOnly.getTime();
}


export const createChatGroup = (list: ChatListClass[]): ChatGroup[] => {
    const result = list.reduce((acc, cur) => {
        const keyDate = cur.timeText;
        
        const newAcc: NewAccumulate = {...acc};
        if (newAcc[keyDate] === undefined) {
            newAcc[keyDate] = {
                date: keyDate,
                dateTimestamp: new Date(cur.reg_dt).getTime(),
                chats: []
            }
        }
        newAcc[keyDate].chats.push({
            ...cur
        });

        newAcc[keyDate].chats.sort((prev, next) => prev.chatTimestamp - next.chatTimestamp); // 날짜순으로 오름차순

        return newAcc;
    }, {})

    const valuesArray = Object.values<ChatGroup>(result);
    valuesArray.sort((prev, next) => (prev.dateTimestamp ?? 0) - (next.dateTimestamp ?? 0));

    return valuesArray;
}