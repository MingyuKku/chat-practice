import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'types/global.d.ts';
import './styles/index.css';
import store from '_redux/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';


const queryClient = new QueryClient();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <Provider store={ store }>
    <QueryClientProvider client={ queryClient }>
      <BrowserRouter basename={ process.env.PUBLIC_URL }>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
