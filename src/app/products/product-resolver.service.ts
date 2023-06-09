import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import {Product, ProductResolved} from "./product";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})

export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = route.paramMap.get('id')!;
    if(isNaN(+id)) {
      const message = `The product is is not a number: ${id}`;
      console.error(message);
      return of({product: null, error: message})

    }
    return this.productService.getProduct(+id).pipe(
      map((product: any) => ({product: product})),
      catchError(error => {
        const message = `Retrival error: ${error}`;
        console.error(message);
        return of({product: null, error: message});
      })
    )
  }
}
