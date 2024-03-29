import React from "react";
import { ChatListClass } from "services/chat/_fetch/_types";

interface Props {
    item: ChatListClass;
}


const UserMessage = ({ item }: Props) => {

    if (item.answer) {
        return (
            <div className='flex flex-col mb-3'>
                <div className="flex self-end">
                    <div className="time self-end mr-1"><span className="font-pretendard leading-none text-[12px] text-gray-03">{ item.chatTimeText }</span></div>
                    <div className='p-2.5 bg-sub-02 rounded-[18px] rounded-ee-md max-w-[228px]'>
                        <p className='text-white break-words'>{ item.answer }</p>
                    </div>
                </div>
            </div>
        )

    } else {
        return <React.Fragment />
    }
}

export default UserMessage;