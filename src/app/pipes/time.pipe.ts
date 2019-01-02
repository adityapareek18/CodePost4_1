import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({name: 'timeP'})
export class SessionTimePipe implements PipeTransform {
  transform(value: Date): String {
    return moment(value).format('LTS');
  }
}