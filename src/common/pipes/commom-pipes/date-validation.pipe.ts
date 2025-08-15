import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { dateRegex } from '../../constants/date-regex';

@Injectable()
export class ParseToDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { date } = value;

    if (metadata.type !== 'body') {
      throw new BadRequestException('metadata type must be body');
    }

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
