import { isIOS, isMobile } from 'react-device-detect';
export { encryptData } from './crypto';
export { formatDate } from './date';


/**
 * html 스크롤 막기
 * @param val true: 블락 / false: 해제
 * @param topControllUse true: top값 조정 / false: top값 고정(0)
 */
export function htmlScrollControl(val: boolean, topControllUse?: boolean) {
    const { documentElement }:{documentElement: HTMLElement} = document;

    if (val) {
        documentElement.style.overflow = 'hidden';
        documentElement.style.position = 'fixed';
        documentElement.style.left = '0px';
        documentElement.style.right = '0px';

        if (topControllUse) {
            const scrollY = window.scrollY || window.pageYOffset;
            documentElement.setAttribute('scroll',String(scrollY));

            documentElement.style.top = `-${scrollY}px`; // 현재 스크롤 위치로 고정되도록
        } else {
            documentElement.style.top = '0px';
        }

    } else {
        documentElement.style.removeProperty('overflow');
        documentElement.style.removeProperty('position');
        documentElement.style.removeProperty('left');
        documentElement.style.removeProperty('right');
        documentElement.style.removeProperty('top');

        if (topControllUse) {
            window.scrollTo({
                top: Number(documentElement.getAttribute('scroll')),
                left: 0
            })
        }
    }
}

/**
 * body 스크롤 막기
 * @param val true: 블락 / false: 해제
 * @param topControllUse true: top값 조정 / false: top값 고정(0)
 */
export function bodyScrollControl(value: boolean) {
    // 아래 과정은 IOS기기에서도 바디 스크롤을 막기 위한 작업
    const { body }:{body: HTMLElement} = document;

    if (value) {
        body.style.position = 'fixed';
        body.style.left = '0px';
        document.body.style.overflow = 'hidden';
        const scrollY = window.scrollY
        document.body.setAttribute('scroll',String(scrollY));

    } else {
        body.style.removeProperty('position');
        body.style.removeProperty('left');
        body.style.removeProperty('overflow');
        window.scrollTo({
            top: Number(document.body.getAttribute('scroll')),
        })
    }
}


/**
 * 스크롤 하단으로 내리기
 */
export const scrollToBottom = <T extends HTMLElement>(behavior: 'smooth' | 'auto', el?: T) => {
    if (el) {
        el.scrollTo({
            top: 999999,
            behavior: behavior
        });
    } else {
        window.scrollTo({
            top: 999999,
            behavior: behavior
        });
        document.body.scrollTo({
            top: 999999,
            behavior: behavior
        })
    }
}


export const touchmovePreventHandler = (e: TouchEvent) => {
    e.preventDefault();
};

export const iosMobileBodyScrollBlock = (value: boolean) => {

    const { body }:{body: HTMLElement} = document;

    if (value) {
        document.body.style.overflow = 'hidden';
        const scrollY = window.scrollY
        document.body.setAttribute('scroll',String(scrollY));

        if (isIOS) {
            document.documentElement.addEventListener('touchmove', touchmovePreventHandler, { passive: false });
        }

    } else {
        body.style.removeProperty('overflow');
        window.scrollTo({
            top: Number(document.body.getAttribute('scroll')),
        })

        if (isIOS) {
            document.documentElement.removeEventListener('touchmove', touchmovePreventHandler);
        }
    }
}