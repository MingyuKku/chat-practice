import React from 'react'
// import { useIntersectElement } from 'hooks/chat/useIntersecterElement';
import { ChatListClass, ChatListData } from 'services/chat/_fetch/_types';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';



interface Props {
    item: ChatListClass;
    isFirst?: boolean;
    // addFetch: ((options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ChatListData | null, unknown>, Error>>) | null;
}

const Message = ({ item, isFirst }: Props) => {

    const firstMessageRef = React.useRef<HTMLDivElement>(null);
    
    // useIntersectElement({
    //     observeRef: firstMessageRef,
    //     deps: isFirst,
    //     addFetch: addFetch,
    // })

    return (
        <div ref={ isFirst ? firstMessageRef : null }>
            <UserMessage item={ item } />
            <BotMessage item={ item } />
        </div>
    )
}

export default Message;