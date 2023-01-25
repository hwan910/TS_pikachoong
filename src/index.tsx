import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';
<<<<<<< HEAD
=======

>>>>>>> 3351d2b (수정)

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

declare global {
  interface Window {
    kakao: any;
  }
}

root.render(
<<<<<<< HEAD
=======

>>>>>>> 3351d2b (수정)
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
<<<<<<< HEAD
  </QueryClientProvider>,
=======
  </QueryClientProvider>

>>>>>>> 3351d2b (수정)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
