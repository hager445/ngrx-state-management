import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativetime'
})
export class RelativetimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
