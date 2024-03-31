import React from 'react';
import { Routes } from 'react-router-dom';
import routes, { getRoute } from './router/_index';
import MainHeader from './components/_common/header/Main';
import { useWebviewBridge } from 'hooks/useWebviewBridge';

const App = () => {
  useWebviewBridge(); // 웹뷰 통신 함수 등록

  React.useEffect(() => {
    window.HiingBridge?.setMemberInfo(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJzaWQiOiJyOTJ3S3RaRXdsZEFnR2QvZzhESWtRPT0iLCJ1bmlxdWVfbmFtZSI6IkRzZGhVbHFxc1ZUcGlia2hSejdTWlpIQU9hY2dmVU04In0.--zes9yE4ekQdUiMzS5q_2yIdloLYuI1YxkblKYynSQ',
      1,
      'test',
      'test'
    )
  }, [])


  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
  }

  React.useEffect(() => {
        setScreenSize();
        window.addEventListener('resize', setScreenSize);

        return () => {
            window.removeEventListener('resize', setScreenSize);
        }
    }, [])
  

  return (
    <div className=''>
        <MainHeader />
        <div className=''>
          <React.Suspense fallback={ <p>로딩중...</p> }>
            <Routes>
                { getRoute(routes) }
            </Routes>
          </React.Suspense>
        </div>
        
    </div>
  )
}

export default App