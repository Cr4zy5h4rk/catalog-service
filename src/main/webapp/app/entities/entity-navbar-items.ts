import NavbarItem from 'app/layouts/navbar/navbar-item.model';

const EntityNavbarItems: NavbarItem[] = [
  {
    name: 'Product',
    route: '/catalog/product',
    translationKey: 'global.menu.entities.catalogProduct',
  },
  {
    name: 'Category',
    route: '/catalog/category',
    translationKey: 'global.menu.entities.catalogCategory',
  },
  // jhipster-needle-add-entity-navbar - JHipster will add entity navbar items here
];

export default EntityNavbarItems;
