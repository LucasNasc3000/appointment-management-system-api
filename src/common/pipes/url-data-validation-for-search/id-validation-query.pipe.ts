import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { uuidCheck } from 'src/common/constants/uuid-regex';

@Injectable()
export class FindByIdValidationQuery implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') {
      throw new BadRequestException('metadata type must be "query"');
    }

    if (!uuidCheck.test(value.value)) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
