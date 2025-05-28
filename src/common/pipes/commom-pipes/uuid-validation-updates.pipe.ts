import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { uuidCheck } from '../../constants/uuid-regex';

@Injectable()
export class UUIDValidatorForUpdates implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      if (!uuidCheck.test(value)) {
        throw new BadRequestException('Formato inválido na url');
      }
    }

    return value;
  }
}
