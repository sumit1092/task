
// import React, { Suspense } from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import Loader from './components/home/Loader/Loader';
// import { MantineProvider } from "@mantine/core";
// import ErrorBoundary from './ErrorBoundary';
// import { Provider } from 'react-redux';
// import store from './redux/store.jsx';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <ErrorBoundary errorMessage="Oops, something went wrong while fetching data. Please try again later.">
//     <Suspense fallback={<Loader />}>
//       <Provider store={store}>
//         <MantineProvider withGlobalStyles withNormalizeCSS>
//         <App />
//         </MantineProvider>
//       </Provider>
//     </Suspense>
//   </ErrorBoundary> 
// )




import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Loader from './components/home/Loader/Loader.jsx';
import { MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css"; 
import ErrorBoundary from './ErrorBoundary.jsx';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store.jsx';
import { ToastContainer } from 'react-toastify';

// Optional global overlay (loader & errors) – can be extended
function GlobalOverlays() {
  const loadingCount = useSelector((s) => s.app.loadingCount);
  const error = useSelector((s) => s.app.error);
  // You can render a fixed overlay loader or show error toasts here if desired
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary errorMessage="Oops, something went wrong while fetching data. Please try again later.">
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <ToastContainer />
          <GlobalOverlays />
          <App />
        </MantineProvider>
      </Provider>
    </Suspense>
  </ErrorBoundary>
);






