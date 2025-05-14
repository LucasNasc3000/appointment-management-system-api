import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindByRoleValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const role = String(value.value);

    if (metadata.type !== 'query') {
      throw new BadRequestException('metadata type must be "query"');
    }

    if (role.length < 5 || role.length > 15) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
