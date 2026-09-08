import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IProduct, NewProduct } from '../product.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduct for edit and NewProductFormGroupInput for create.
 */
type ProductFormGroupInput = IProduct | PartialWithRequiredKeyOf<NewProduct>;

type ProductFormDefaults = Pick<NewProduct, 'id'>;

type ProductFormGroupContent = {
  id: FormControl<IProduct['id'] | NewProduct['id']>;
  name: FormControl<IProduct['name']>;
  price: FormControl<IProduct['price']>;
  stock: FormControl<IProduct['stock']>;
  category: FormControl<IProduct['category']>;
};

export type ProductFormGroup = FormGroup<ProductFormGroupContent>;

@Service()
export class ProductFormService {
  createProductFormGroup(product?: ProductFormGroupInput): ProductFormGroup {
    const productRawValue = {
      ...this.getFormDefaults(),
      ...(product ?? { id: null }),
    };

    return new FormGroup<ProductFormGroupContent>({
      id: new FormControl(
        { value: productRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(productRawValue.name, {
        validators: [Validators.required],
      }),
      price: new FormControl(productRawValue.price, {
        validators: [Validators.required],
      }),
      stock: new FormControl(productRawValue.stock, {
        validators: [Validators.required],
      }),
      category: new FormControl(productRawValue.category),
    });
  }

  getProduct(form: ProductFormGroup): IProduct | NewProduct {
    return form.getRawValue();
  }

  resetForm(form: ProductFormGroup, product: ProductFormGroupInput): void {
    const productRawValue = { ...this.getFormDefaults(), ...product };
    form.reset({
      ...productRawValue,
      id: { value: productRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ProductFormDefaults {
    return {
      id: null,
    };
  }
}
