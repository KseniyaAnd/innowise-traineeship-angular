import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, catchError, find, Observable, tap, throwError} from 'rxjs';
import {IProduct, IProductCreate, IProductUpdate} from '../models/products';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  private _products$ = new BehaviorSubject<IProduct[]>([]);

  public products = this._products$.asObservable();
  public loading = new BehaviorSubject<boolean>(false);
  public selectedProduct: IProduct

  getAll(): void {
    this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
      params: new HttpParams().append('limit', 5)
    }).pipe(
      tap(() => {
        this.loading.next(true);
      }),
      catchError(this.errorHandler.bind(this))
    ).subscribe((products) => {
      this._products$.next(products);
      this.loading.next(false);
    });
  }

  getSelected(id: number): void {
    const products = this._products$.getValue();
    const product = products.find((p) => p.id === id);
    if (product) {
      this.selectedProduct = product;
    }
  }


  create(product: IProductCreate): Observable<IProduct> {
    return new Observable<IProduct>((observer) => {
      const currentProducts = this._products$.getValue();
      const newProduct = {...product, id: Math.random()};
      this._products$.next([...currentProducts, newProduct]);

      observer.next(newProduct);
      observer.complete();
    });
  }

  update(product: IProductUpdate): Observable<IProduct> {
    return new Observable<IProduct>((observer) => {
      const currentProducts = this._products$.getValue();
      const index = currentProducts.findIndex((p) => p.id === product.id);
      currentProducts[index] = { ...currentProducts[index], ...product };
      this._products$.next([...currentProducts]);

      observer.next(currentProducts[index]);
      observer.complete();
    });
  }


  delete(id: number): void {
    this.products.subscribe((products) => {
      const res = products.filter((p) => p.id === id);
      this._products$.next(res);
    })
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
