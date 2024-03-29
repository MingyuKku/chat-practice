import { AxiosError, AxiosResponse } from "axios";
import { createAxios } from "_fetch";
// import { Cookies } from "react-cookie";
import { setMemberTokenStorage } from "services/token";

/**
 * 정상 응답인 경우 반환받은 토큰을 브라우저 쿠키에 저장
 */
export const tokenResponse = (res: AxiosResponse) => {
    console.log('토큰 응답 인터셉터', res, res.status)
    if (
        res.status === 200 &&
        res.data &&
        res.data.api_access_token
    ) {
        const token = res.data.api_access_token;
        // const cookies = new Cookies();
        // cookies.set('hiing-acc', token); // 발급받은 토큰을 쿠키에 저장

        setMemberTokenStorage(token); // 발급받은 토큰을 스토리지에 저장
    }

    return res;
}

export const tokenResponseError = (err: AxiosError) => {
    return Promise.reject(err);
}


export function tokenAxios() {
    const instance = createAxios();


    // 응답 인터셉터
    instance.interceptors.response.use(tokenResponse, tokenResponseError);

    return instance;
}


    