import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSpace',
})
export class NumberSpacePipe implements PipeTransform {
  constructor(private decimal: DecimalPipe) {}

  transform(
    value: number | string | null | undefined,
    digitsInfo?: string
  ): string | null {
    return this.spaces(this.decimal.transform(value, digitsInfo));
  }

  private spaces = (price) =>
    String(price)
      .replace(/,/g, '')
      .replace(/(?!^)(?=(?:\d{3})+$)/g, ' ');
}
