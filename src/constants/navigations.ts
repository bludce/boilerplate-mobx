import { RouteProps } from 'react-router';
import ROUTE_BASE from 'constants/projectBase';

export const navigations: (RouteProps & { page: string })[] = [
  {
    path: `${ROUTE_BASE}`,
    page: 'NotFoundPage',
  },
  {
    page: 'NotFoundPage',
  },
];
