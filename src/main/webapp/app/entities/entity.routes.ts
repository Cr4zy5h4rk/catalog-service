import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'product',
    title: 'catalogApp.catalogProduct.home.title',
    loadChildren: () => import('./catalog/product/product.routes'),
  },
  {
    path: 'category',
    title: 'catalogApp.catalogCategory.home.title',
    loadChildren: () => import('./catalog/category/category.routes'),
  },
  // jhipster-needle-add-entity-route - JHipster will add entity modules routes here
];

export default routes;
