import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'display',
    standalone: true
})
export class DisplayPipe implements PipeTransform {
    transform(object: any, propertyName: string): string {
        return object[propertyName];
    }
}