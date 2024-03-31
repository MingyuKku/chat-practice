import React from 'react';
import { useQueryClient, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { getChatList } from 'services/chat/_fetch/chat';
import MessageList from 'components/chat/List';
import MessageInput from 'components/chat/Input';

const Chat = () => {


    const queryClient = useQueryClient();
    const INDEX_KEY: QueryKey = ['chat-message-list', 1];


    const {
        data: messageItems, 
        isFetching, 
        isFetchingNextPage, 
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage, 
        hasNextPage,
        status, 
        error,
        refetch,
        isRefetching,
    } = useInfiniteQuery({
        queryKey: INDEX_KEY,
        queryFn: ({ pageParam  }) => getChatList(1, 1, pageParam, 15),
        initialPageParam: '0',
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
            const firstId = !lastPage?.flag ? allPages[0]?.chatList[0].chats[0].id : undefined;
            allPages.reverse();
            return firstId;
        },
        refetchOnWindowFocus: false,
    });

    if (status === 'pending') {
        return <p>패치중...</p>
    } else if (status === 'error') {
        return <p>에러발생!</p>
    } 

    return (
        <div className='flex flex-col'>
            <div className=''>
                <MessageList
                    items={ messageItems.pages }
                />
                <MessageInput
                />
            </div>
            
        </div>
    )
}

export default Chat