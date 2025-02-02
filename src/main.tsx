import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.tsx';
const NewEvent = lazy(() => import('./pages/create-event/NewEvent.tsx'));
import { Suspense } from 'react';
import Loading from './components/loading/Loading.tsx';
import Home from './pages/home/Home.tsx';
import './globals.css';
import EventPage from './pages/events/[id]/EventPage.tsx';
import { Toaster } from './components/ui/toaster.tsx';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: "/",
      element: <Home />
    }, {
      path: "/new",
      element: <NewEvent />
    }, {
      path: "/event/:id",
      element: <EventPage />
    }]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <Toaster />
      <RouterProvider router={routes} />
    </Suspense>
  </StrictMode>,
)
