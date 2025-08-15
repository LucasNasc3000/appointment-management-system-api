import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { dateRegex } from 'src/common/constants/date-regex';

@Injectable()
export class FindByDateField implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const dateField = String(value.value);

    if (metadata.type !== 'query') {
      throw new BadRequestException('metadata type must be "query"');
    }

    if (!dateRegex.test(dateField)) {
      throw new BadRequestException('data precisamestar no formato DD-MM-AAAA');
    }

    return value;
  }
}
