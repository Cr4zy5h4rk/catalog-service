import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';

import { Observable, asapScheduler, catchError, scheduled } from 'rxjs';

import { microserviceContextPath, serverApiUrl } from 'app/config';
import { Search, createRequestOption } from 'app/core/request';
import { IProduct, NewProduct } from '../product.model';

export type PartialUpdateProduct = Partial<IProduct> & Pick<IProduct, 'id'>;

@Service()
export class ProductsService {
  readonly productsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly productsResource = httpResource<IProduct[]>(() => {
    const params = this.productsParams();
    if (!params) {
      return undefined;
    }
    return { url: params.query ? this.resourceSearchUrl : this.resourceUrl, params };
  });
  /**
   * This signal holds the list of product that have been fetched. It is updated when the productsResource emits a new value.
   * In case of error while fetching the products, the signal is set to an empty array.
   */
  readonly products = computed(() => (this.productsResource.hasValue() ? this.productsResource.value() : []));
  protected readonly resourceUrl = `${serverApiUrl}${microserviceContextPath}catalog/api/products`;
  protected readonly resourceSearchUrl = `${serverApiUrl}${microserviceContextPath}catalog/api/products/_search`;
}

@Service()
export class ProductService extends ProductsService {
  protected readonly http = inject(HttpClient);

  create(product: NewProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.resourceUrl, product);
  }

  update(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.resourceUrl}/${encodeURIComponent(this.getProductIdentifier(product))}`, product);
  }

  partialUpdate(product: PartialUpdateProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(`${this.resourceUrl}/${encodeURIComponent(this.getProductIdentifier(product))}`, product);
  }

  find(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IProduct[]>> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  search(req: Search): Observable<IProduct[]> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(this.resourceSearchUrl, { params: options }).pipe(catchError(() => scheduled([], asapScheduler)));
  }

  getProductIdentifier(product: Pick<IProduct, 'id'>): number {
    return product.id;
  }

  compareProduct(o1: Pick<IProduct, 'id'> | null, o2: Pick<IProduct, 'id'> | null): boolean {
    return o1 && o2 ? this.getProductIdentifier(o1) === this.getProductIdentifier(o2) : o1 === o2;
  }

  addProductToCollectionIfMissing<Type extends Pick<IProduct, 'id'>>(
    productCollection: Type[],
    ...productsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const products: Type[] = productsToCheck.filter(productItem => productItem !== null && productItem !== undefined);
    if (products.length > 0) {
      const productCollectionIdentifiers = productCollection.map(productItem => this.getProductIdentifier(productItem));
      const productsToAdd = products.filter(productItem => {
        const productIdentifier = this.getProductIdentifier(productItem);
        if (productCollectionIdentifiers.includes(productIdentifier)) {
          return false;
        }
        productCollectionIdentifiers.push(productIdentifier);
        return true;
      });
      return [...productsToAdd, ...productCollection];
    }
    return productCollection;
  }
}
