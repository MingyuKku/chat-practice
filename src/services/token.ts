import { tokenAxios } from '_fetch/token';
import { encryptData } from 'utils';


export async function webTestRefreshToken(oldToken: string | null): Promise<string | null> {
    
    try {
        if (oldToken) {
            
            let count = Number(getRefreshCountStorage() ?? '1');
            const deviceId = await encryptData('112') ?? 'nzKuXKBBV8oBtvtFOJ/2GQ==';
            count++;
            const { data } = await tokenAxios().post('refresh', {
                api_access_token: oldToken,
                device_id: deviceId, // sign-in에서 사용한 임시 값
                authentication_data: (getRefreshStringDataStorage() ?? 'abcd') + (count - 1).toString(), // sign-in에서 사용한 임시 값, 두번째 리프레시부터는 update_authentication_data값이 여기로 들어간다
                update_authentication_data: (getRefreshStringDataStorage() ?? 'abcd') + count.toString(),
            });
            // console.log('테스트 리프레시 응답', data)
            if (
                data &&
                data.api_access_token
            ) {
                const token: string = data.api_access_token;
                setLocalStorageAuthData(count.toString());
                window.HiingBridge?.setRefreshToken(token);

                return token;
            }
        }

        return null;

    } catch (err) {
        return null;
    }
}


export const getMemberTokenStorage = () => {
    const storageName = 'hiing-token';
    return window.localStorage.getItem(storageName);
}

export const setMemberTokenStorage = (value: string) => {
    const storageName = 'hiing-token';
    return window.localStorage.setItem(storageName, value);
}

export const removeMemberTokenStorage = () => {
    const storageName = 'hiing-token';
    return window.localStorage.removeItem(storageName);
}

export const getRefreshStringDataStorage = () => {
    const storageName = 'hiing-auth-data';
    return window.localStorage.getItem(storageName);
}

export const setRefreshStringDataStorage = (value: string) => {
    const storageName = 'hiing-auth-data';
    return window.localStorage.setItem(storageName, value);
}

export const getRefreshCountStorage = () => {
    const storageName = 'hiing-refresh-count';
    return window.localStorage.getItem(storageName);
}

export const setRefreshCountStorage = (value: string) => {
    const storageName = 'hiing-refresh-count';
    return window.localStorage.setItem(storageName, value);
}


function setLocalStorageAuthData(countString: string) {
    const string = getRefreshCountStorage();
    // const count = getRefreshCountStorage();

    if (!string) setRefreshStringDataStorage('abcd');
        
    setRefreshCountStorage(countString);
    // if (count) {
    //     let num = Number(count);
    //     num = num + 1;
    //     setRefreshCountStorage(String(num));

    // } else {
    //     setRefreshCountStorage('2');
    // }
}