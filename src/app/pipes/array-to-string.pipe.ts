import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: string[], ...args: unknown[]): unknown {
    return value.join(', ');
  }
}
