import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { uuidCheck } from 'src/common/constants/uuid-regex';

@Injectable()
export class FindByIdValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      throw new BadRequestException('metadata type must be "param"');
    }

    if (!uuidCheck.test(value)) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
