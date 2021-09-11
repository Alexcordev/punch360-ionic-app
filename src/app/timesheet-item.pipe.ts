import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timesheetItem'
})
export class TimesheetItemPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
