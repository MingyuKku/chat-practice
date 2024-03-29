import React from "react";
import { Route } from "react-router-dom";


// lazy 컴포넌트
const Home = React.lazy(() => import('pages/Home'));
const Chat = React.lazy(() => import('pages/chat/Chat'));


export interface RoutesType {
    name: string;
    index?: boolean;
    path?: string;
    element?: JSX.Element;
    children?: RoutesType[];
    title?: string;
}


export const getRoute = (routes: RoutesType[]):JSX.Element[] => {
    return routes.map(route => {
        if (route.index) {
            return <Route
                index
                key={ route.name }
                path={ route.path }
                element={ route.element }
            />
            
        } else {
            return <Route
                key={ route.name }
                path={ route.path }
                element={ route.element }
            >
                { route?.children?.length && getRoute(route.children) }
            </Route>
        }
    })
}


const routes:RoutesType[] = [
    { 
        path: '/',
        name: 'home',
        element: <Home />,
    },
    { 
        path: '/chat',
        name: 'chat',
        element: <Chat />,
    },
]

export default routes;