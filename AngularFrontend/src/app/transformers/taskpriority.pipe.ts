
import { Pipe, PipeTransform } from '@angular/core';
import { ItemPriority, ItemStatus } from '../utils/enum.types';

@Pipe({
  name: 'priorityEnumValue'
})
export class PriorityEnumValuePipe implements PipeTransform {
  transform(value: ItemPriority): string {
    return ItemPriority[value];
  }
}
