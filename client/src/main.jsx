import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import Explore from './pages/Explore';
import Checkout from './pages/Checkout';
import MyProfile from './pages/MyProfile';
import OrderHistory from './pages/OrderHistory';
import Cart from './components/Cart';
import ErrorBoundary from './components/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './utils/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { 
        index: true, 
        element: <LandingPage />,
        errorElement: <ErrorBoundary />
      },
      { 
        path: 'explore', 
        element: <Explore />,
        errorElement: <ErrorBoundary />
      },
      { 
        path: 'checkout', 
        element: <Checkout />,
        errorElement: <ErrorBoundary />
      },
      { 
        path: 'my-profile', 
        element: <MyProfile />,
        errorElement: <ErrorBoundary />
      },
      { 
        path: 'orderHistory', 
        element: <OrderHistory />,
        errorElement: <ErrorBoundary />
      },
      { 
        path: 'cart', 
        element: <Cart />,
        errorElement: <ErrorBoundary />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
