import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindByIdValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const uuidCheck =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (metadata.type !== 'param') {
      throw new BadRequestException('metadata type must be "param"');
    }

    if (!uuidCheck.test(value)) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
