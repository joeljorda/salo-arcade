import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ElementService } from '../serveis/element.service';

export function codiDisponibleValidator(elementService: ElementService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const terme = (control.value ?? '').trim();

    if (!terme || terme.length < 2) {
      return of(null);
    }

    return timer(500).pipe(
      switchMap(() => elementService.comprovarResultatsCerca(terme)),
      map((teResultats: boolean) => (teResultats ? null : { sensResultats: true })),
      catchError(() => of(null))
    );
  };
}