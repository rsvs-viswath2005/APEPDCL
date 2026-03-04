import { createBrowserRouter } from 'react-router';
import { Overview } from './pages/Overview';
import { Industrial } from './pages/Industrial';
import { Tariff } from './pages/Tariff';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Overview,
  },
  {
    path: '/industrial',
    Component: Industrial,
  },
  {
    path: '/tariff',
    Component: Tariff,
  },
]);
