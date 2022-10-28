import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomItemFromArray'
})
export class RandomItemFromArrayPipe implements PipeTransform {

  transform(value: any[]): string {
    if(value.length === 0){
      return ""
    }
    const filtered = value.filter(item => item.language.name == "en")
    return filtered[Math.floor(Math.random() * ((filtered.length-1) - 0 + 1) + 0)].flavor_text;
  }

}
