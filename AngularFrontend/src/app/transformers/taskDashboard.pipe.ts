
import { Pipe, PipeTransform } from '@angular/core';
import { ItemDashboard} from '../utils/enum.types';

@Pipe({
  name: 'typeDashboardEnumValue'
})
export class TypeDashboardEnumValuePipe implements PipeTransform {
  transform(value: ItemDashboard): string {
    return ItemDashboard[value];
  }
}
