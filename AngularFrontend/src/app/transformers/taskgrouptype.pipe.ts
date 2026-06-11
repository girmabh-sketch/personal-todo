
import { Pipe, PipeTransform } from '@angular/core';
import { ItemDashboard, ItemType } from '../utils/enum.types';

@Pipe({
  name: 'typeEnumValue'
})
export class TypeEnumValuePipe implements PipeTransform {
  transform(value: ItemType): string {
    return ItemType[value];
  }
}
