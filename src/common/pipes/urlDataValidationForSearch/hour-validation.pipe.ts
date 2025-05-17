import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindByWorkday implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const workdayBeginOrEnd = String(value.value);

    const hourRegex = /(0?[0-9]|1[0-9]|2[0-3]):[0-9]+:(0?[0-9]|[1-5][0-9])/;

    if (metadata.type !== 'query') {
      throw new BadRequestException('metadata type must be "query"');
    }

    if (!hourRegex.test(workdayBeginOrEnd)) {
      throw new BadRequestException('horas precisam estar no formato HH:MM:SS');
    }

    return value;
  }
}
