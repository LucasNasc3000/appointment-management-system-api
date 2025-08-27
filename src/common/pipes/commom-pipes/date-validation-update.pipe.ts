import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { dateRegex } from '../../constants/date-regex';

@Injectable()
export class ParseToDatePipeUpdate implements PipeTransform {
  transform(value: any) {
    const { date } = value;

    if (date) {
      if (!dateRegex.test(date)) {
        throw new BadRequestException(
          '"data" precisa estar no formato DD-MM-AAAA',
        );
      }
    }

    return value;
  }
}
