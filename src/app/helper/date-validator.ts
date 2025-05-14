import { FormControl, ValidationErrors } from '@angular/forms';

export class DateValidator {
  static LessThanToday(control: FormControl): ValidationErrors | null {
    if (!control.value) return null;

    const inputDate = new Date(control.value);
    const today = new Date();
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return inputDate < today ? { lessThanToday: true } : null;
  }
}
