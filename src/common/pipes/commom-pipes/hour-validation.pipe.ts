import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { hourRegex } from '../../constants/hour-regex';

@Injectable()
export class ParseToHourPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { workday_begin, workday_end, hour_from, hour_to, hour } = value;

    if (metadata.type !== 'body') {
      throw new BadRequestException('metadata type must be body');
    }

    if (workday_begin && workday_end) {
      if (!hourRegex.test(workday_begin) || !hourRegex.test(workday_end)) {
        throw new BadRequestException(
          'horas em "inicio da jornada de trabalho" e "fim da jornada de trabalho" precisam estar no formato HH:MM:SS',
        );
      }
    }

    if (hour_to && hour_from) {
      if (!hourRegex.test(hour_to) || !hourRegex.test(hour_from)) {
        throw new BadRequestException(
          'horas em "desde" e "até" precisam estar no formato HH:MM:SS',
        );
      }
    }

    if (hour) {
      if (!hourRegex.test(hour)) {
        throw new BadRequestException(
          '"horas" precisa estar no formato HH:MM:SS',
        );
      }
    }

    return value;
  }
}
