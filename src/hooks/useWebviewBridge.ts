import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '_redux/store';
import { HiingBridge } from 'types/global';
import { setMember } from '_redux/member/slice';
import { removeMemberTokenStorage, setMemberTokenStorage } from 'services/token';
import { useQueryClient } from '@tanstack/react-query';

export const useWebviewBridge = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    React.useEffect(() => {

        if (!window.HiingBridge) {
            window.HiingBridge = {} as HiingBridge;
        }
        

        window.HiingBridge.setMemberInfo = function (acc: string, se: number | string, nick_nm1: string, nick_nm2: string, appVer?: string) {
            removeMemberTokenStorage();
            setMemberTokenStorage(acc);

            dispatch(setMember({
                se: Number(se),
                nick_nm1: nick_nm1,
                nick_nm2: nick_nm2,
                appVer: appVer ? appVer : null,
            }));
        }
        
    }, [])
}
