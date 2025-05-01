import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseToHourPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { workday_begin } = value;
    const { workday_end } = value;
    const time = new Date();
    const hourRegex = /(0?[0-9]|1[0-9]|2[0-3]):[0-9]+:(0?[0-9]|[1-5][0-9])/;

    if (metadata.type !== 'body') {
      throw new BadRequestException('metadata type must be "body"');
    }

    if (!hourRegex.test(workday_begin) || !hourRegex.test(workday_end)) {
      throw new BadRequestException(
        'As horas precisam estar no formato HH:MM:SS',
      );
    }

    const hoursWkBegin = time.setTime(workday_begin);
    const hoursWkEnd = time.setTime(workday_end);

    return {
      begin: hoursWkBegin,
      end: hoursWkEnd,
    };
  }
}
