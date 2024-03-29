import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "_redux/store";
import { ChatListClass } from "services/chat/_fetch/_types";


interface Props {
    item: ChatListClass;
    isLastItem?: boolean;
}


const BotMessage = ({ item, isLastItem }: Props) => {
    const { characterSe } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    

    const bgImgStyle = React.useMemo(() => ({
        backgroundImage: `url(https://dwra84tqfa60a.cloudfront.net/thumbnail/pogny/profile/2024/3/1711602323_profile_p-7.png)`
    }), [])
    

    if (item.message) {
        return (
            <div className="user-message-box flex mb-3">
                <Link
                    to={`/character/${characterSe}/profile`}
                    className="thumb-image block shrink-0 w-9 h-9 rounded-full overflow-hidden mr-1 bg-center bg-no-repeat bg-size bg-cover"
                    style={ bgImgStyle }
                >
                </Link>
                <div className='flex flex-col mt-1.5 max-w-[242px]'>
                    <div className='self-start p-2.5 bg-white rounded-[18px] rounded-ss-md'>
                        <p className='break-words'>{ item.message }</p>
                    </div>
                </div>
                <div className="time self-end ml-1">
                    <span className="font-pretendard leading-none text-[12px] text-gray-03">{ item.chatTimeText }</span>
                </div>
            </div>
        )

    } else {
        return <React.Fragment />
    }
}

export default BotMessage;
