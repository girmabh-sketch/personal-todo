
import { Pipe, PipeTransform } from '@angular/core';
import { ItemStatus } from '../utils/enum.types';

@Pipe({
  name: 'statusEnumValue'
})
export class StatusEnumValuePipe implements PipeTransform {
  transform(value: ItemStatus): string {
    return ItemStatus[value];
  }
}
