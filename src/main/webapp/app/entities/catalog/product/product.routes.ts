import { Routes } from '@angular/router';

import { ASC } from 'app/config';
import { userRouteAccessService } from 'app/core/auth';

import ProductResolve from './route/product-routing-resolve.service';

const productRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/product').then(m => m.Product),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/product-detail').then(m => m.ProductDetail),
    resolve: {
      product: ProductResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/product-update').then(m => m.ProductUpdate),
    resolve: {
      product: ProductResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/product-update').then(m => m.ProductUpdate),
    resolve: {
      product: ProductResolve,
    },
    canActivate: [userRouteAccessService],
  },
];

export default productRoute;
