/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // src 하위 파일 중 확장자가 .js,.jsx,.ts,.tsx인 파일을 대상으로 한다는 의미
    ],
    theme: {
        extend: {
            fontFamily: {
                'suite': ['SUITE', 'sans-serif'],
                'pretendard': ['Pretendard', 'sans-serif']
            },
            colors: {
                'primary': {
                    '01': '#F55D07',
                    '02': '#DC906C',
                    '03': '#FCB3A0',
                    '04': '#FFDAD1',
                },
                'gray': {
                    '01': '#0A0A0A',
                    '02': '#323232',
                    '03': '#969696',
                    '04': '#CACACA',
                    '05': '#E2E2E2',
                    '06': '#F5F5F5',
                },
                'button': {
                    'default': '#F55D07',
                    'press': '#C44A06',
                    'disable': '#E6E0DC',
                },
                'sub': {
                    '01': '#F55D07',
                    '02': '#DC906C',
                    '03': '#FCB3A0',
                    '04': '#FFDAD1',
                },
                'system': {
                    '01': '#ff0000'
                },
            },
            width: {
                desktop: '480px',
            },
            maxWidth: {
                desktop: '480px'
            },
            height: {
                'basic-header': '57px',
                'gnb-bottom-header': '64px',
                'viewScreen': 'calc(var(--vh,1vh)*100)',
            },
            minHeight: {
                'viewScreen': 'calc(var(--vh,1vh)*100)'
            },
            padding: {
                'basic-header': '57px',
                'gnb-bottom-header': '64px',
            },
            spacing: {
                'basic-header': '57px',
                'gnb-bottom-header': '64px',
            }
        },
    },
    plugins: [],
}

