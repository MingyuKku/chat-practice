import React from 'react'
import { ChatListData } from 'services/chat/_fetch/_types';
import Message from './Message';


interface Props {
    items: (ChatListData | null)[];
    className?: string;
}


const List = React.forwardRef<HTMLDivElement, Props>(({ 
        items, 
        className,
    },
    ref
) => {

    return (
        <div ref={ ref } className={`relative z-[1] px-3.5 py-2 bg-primary-04 ${className ?? ''}`}>
            {
                items.map((group, gIdx, chatGroup) => (
                    <React.Fragment key={ gIdx }>
                        {
                            group?.chatList.map((item, idx, chatList) => (
                                <div key={ idx }>
                                    {
                                        item.date &&
                                        <div className='text-center pt-3 pb-2.5'>
                                            <p className='bg-primary-03 text-white inline-block text-[12px] leading-none px-2 py-1 rounded-full'>{ item.date }</p>
                                        </div>
                                    }
                                    <div>
                                        {
                                            item.chats.map((chat, i, chats) => (
                                                <Message
                                                    key={ i }
                                                    item={ chat }
                                                    isFirst={ gIdx === 0 && idx === 0 && i === 0 }
                                                    // addFetch={ addFetch }
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </React.Fragment>
                ))
            }
        </div>
    )
})

export default List