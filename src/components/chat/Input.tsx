import React from 'react'
const IconMessage = React.lazy(() => import('components/icon/Arrow'));



const Input = () => {
    const inputName = 'message';
    const [ text, setText ] = React.useState('');

    const formRef = React.useRef<HTMLFormElement>(null);
    const inputElRef = React.useRef<HTMLInputElement>(null);
    const fakeInputElRef = React.useRef<HTMLInputElement>(null);



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
                        className='block w-full h-full none-st'
                    />
                    <input
                        ref={ fakeInputElRef }
                        type="text"
                        className='fake-input absolute w-full opacity-0 top-full left-0'
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