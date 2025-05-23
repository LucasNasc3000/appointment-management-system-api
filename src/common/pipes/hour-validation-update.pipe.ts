import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { hourRegex } from '../constants/hour-regex';

@Injectable()
export class ParseToHourPipeUpdate implements PipeTransform {
  // Ver como validar url de updates
  transform(value: any) {
    const hourData = {
      workday_begin: value.workday_begin,
      workday_end: value.workday_end,
      hour_from: value.hour_from,
      hour_to: value.hour_to,
    };

    for (const i in hourData) {
      if (hourData[i]) {
        console.log(hourData[i]);
        console.log(!hourRegex.test(hourData[i]));
        if (!hourRegex.test(hourData[i])) {
          throw new BadRequestException(
            'As horas precisa estar no formato HH:MM:SS',
          );
        }
      }
    }

    // if (workday_begin && workday_end) {
    //   if (!hourRegex.test(workday_begin) || !hourRegex.test(workday_end)) {
    //     throw new BadRequestException(
    //       'horas em "inicio da jornada de trabalho" e "fim da jornada de trabalho" precisam estar no formato HH:MM:SS',
    //     );
    //   }
    // }

    // if (hour_to && hour_from) {
    //   if (!hourRegex.test(hour_to) || !hourRegex.test(hour_from)) {
    //     throw new BadRequestException(
    //       'horas em "desde" e "até" precisam estar no formato HH:MM:SS',
    //     );
    //   }
    // }

    return value;
  }
}
