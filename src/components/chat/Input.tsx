import React from 'react'
const IconMessage = React.lazy(() => import('components/icon/Arrow'));



const Input = () => {
    const inputName = 'message';
    const [ text, setText ] = React.useState('');

    const formRef = React.useRef<HTMLFormElement>(null);
    const inputElRef = React.useRef<HTMLInputElement>(null);
    const fakeInputElRef = React.useRef<HTMLInputElement>(null);
    const [ focusFlag, setFocusFlag ] = React.useState(false);

    const [ isBottom, setIsBottom ] = React.useState(false);
    const [ isBottomScroll, setIsBottomScroll ] = React.useState(false);

    
    const onFocusHandler = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.add('on-focus');

        setFocusFlag(true);
        
    }, [])

    const onBlurHandler = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.remove('on-focus');
        
        setFocusFlag(false);

    }, [])

    // React.useEffect(() => {

    //     const { body } = document;
    //     const { documentElement } = document;
        
    //     body.style.overscrollBehavior = 'contain';
    //     documentElement.style.overscrollBehavior = 'contain';
        
    //     return () => {
    //         body.style.overscrollBehavior = 'auto';
    //         documentElement.style.overscrollBehavior = 'auto';
    //     }
    // }, [])

    const windowScroll = () => {
        // if (!focusFlag) return;

        const scrolledFromTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const totalPageHeight = document.documentElement.scrollHeight;

        if (scrolledFromTop + viewportHeight >= totalPageHeight) {
            // alert('바닥!')
            setIsBottom(true);
        } else {
            if (isBottom) setIsBottom(false);
        }
    }

    const visualViewportScroll = (e: Event) => {
        // e.preventDefault();
        // window.scrollTo(0,0);
        // document.body.scrollTop = 0;
    }

    React.useEffect(() => {
        window.addEventListener('scroll', windowScroll, { passive: false });
        window.visualViewport?.addEventListener('scroll', visualViewportScroll, { passive: false });

        // document.body.style.background = 'green';

        return () => {
            window.removeEventListener('scroll', windowScroll);
            window.visualViewport?.removeEventListener('scroll', visualViewportScroll);
        }
    }, [isBottom])



    // React.useEffect(() => {
    //     if (!window.visualViewport) return;

    //     if (focusFlag) {
    //         const { height } = window.visualViewport;
    //         const { body } = document;
    //         body.style.height = height - 200 + 'px';
    //     }
    // }, [focusFlag])

    return (
        <div className={`
            message-input-wrap fixed left-0 bottom-0 z-40 bg-white p-3.5 w-full
        `}>
            <div className="input-box">
                <form
                    ref={ formRef }
                    autoComplete='off'
                    className='relative flex items-center h-[38px] p-[3px] pl-5 bg-gray-06 border-gray-05 border-[1px] rounded-full'
                >
                    <input
                        ref={ inputElRef }
                        type="text"
                        autoComplete='off'
                        autoCorrect='off'
                        autoSave='off'
                        name={ inputName }
                        onFocus={ onFocusHandler }
                        onBlur={ onBlurHandler }
                        className='block w-full h-full none-st'
                    />
                    <input
                        ref={ fakeInputElRef }
                        type="text"
                        className='fake-input absolute w-full opacity-0 top-full left-0 h-0'
                    />
                    <button
                        // type='submit'
                        type='button'
                        className={`
                            icon-wrap shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-01
                        `}
                    ><IconMessage /></button>
                </form>
            </div>
        </div>
    )
}

export default Input