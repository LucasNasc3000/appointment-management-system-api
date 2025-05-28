import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { hourRegex } from 'src/common/constants/hour-regex';

@Injectable()
export class FindByHourField implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const workdayBeginOrEnd = String(value.value);

    if (metadata.type !== 'query') {
      throw new BadRequestException('metadata type must be "query"');
    }

    if (!hourRegex.test(workdayBeginOrEnd)) {
      throw new BadRequestException('horas precisam estar no formato HH:MM:SS');
    }

    return value;
  }
}
