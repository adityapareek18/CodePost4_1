import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({name: 'dateP'})
export class SessionDatePipe implements PipeTransform {
  transform(value: Date): String {
    return moment(value).format("MMM Do YY");
  }
}