import { serviceAxios } from "_fetch/service";
import { createChatGroup } from "./methods";
import { ChatListClass, ChatListData, ChatRes } from "./_types";


/**
 * @returns 채팅 목록
 */
export async function getChatList(
    member_se: number,
    character_se: number | string | undefined,
    id: string,
    size: number = 5,
):Promise<ChatListData | null> {
    if (!character_se) return null;
    
    try {
        const { data } = await serviceAxios().get(`rooms/${member_se},${character_se},${id},${size}`);
        if (
            data &&
            data.chatList &&
            data.chatList.length > 0
        ) {
            const chatRes: ChatRes = data;

            const newChatGroup = createChatGroup(chatRes.chatList.map(chat => new ChatListClass(chat)));

            return {
                chatList: newChatGroup,
                flag: chatRes.flag
            }
            
        } else {
            return null;
        }

    } catch (err) {
        return null;
    }
}