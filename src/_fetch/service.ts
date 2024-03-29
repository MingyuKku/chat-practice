import { InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import { createAxios } from "_fetch";
// import { Cookies } from "react-cookie";
import { isDesktop } from "react-device-detect";
import { getMemberTokenStorage, removeMemberTokenStorage, webTestRefreshToken } from "services/token";


/**
 *서비스 API 요청시 요청 헤더에 토큰 쿠키값을 넣어서 요청함
 */
export const serviceRequest = (config: InternalAxiosRequestConfig) => {
    const token = getMemberTokenStorage(); // 스토리지에 저장된 토큰을 읽음
    
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}


export const serviceResponse = (res: AxiosResponse) => {
    return res;
}


interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
    _retryCount?: number;
}


const MAX_RETRY_ATTEMPTS = 10;
const RETRY_DELAY_MS = 1000;
let refreshTimer: NodeJS.Timeout;

export const serviceResponseError = (err: AxiosError, instance: AxiosInstance) => {
    console.log('서비스 응답 에러 인터셉터', err.config?.url)

    if (
        err.response &&
        err.response?.status === 401
    ) {
        const token = getMemberTokenStorage();
        if (token) {
            removeMemberTokenStorage();
            
            // 테스트탑 테스트용 리프레시
            if (isDesktop) {
                webTestRefreshToken(token);
            }

            const config = err.config as ExtendedAxiosRequestConfig;

            if (!config._retryCount) {
                config._retryCount = 0;
            }
            
            if (config._retryCount < MAX_RETRY_ATTEMPTS) {
                config._retryCount += 1;

                if (refreshTimer) clearTimeout(refreshTimer);
                refreshTimer = setTimeout(() => {
                    
                    return instance(config);
                }, RETRY_DELAY_MS);
            }
        }
    }

    return Promise.reject(err);
}


export function serviceAxios() {
    const instance = createAxios();

    // 요청 인터셉터
    instance.interceptors.request.use(serviceRequest);

    // 응답 인터셉터
    instance.interceptors.response.use(serviceResponse, (err) => serviceResponseError(err, instance));

    return instance;
}


    