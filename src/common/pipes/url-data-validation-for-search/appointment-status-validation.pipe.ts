import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindByAppointmentStatusValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const status = String(value.value);

    if (metadata.type !== 'query') {
      throw new BadRequestException('metadata type must be "query"');
    }

    if (
      status !== 'cancelada' &&
      status !== 'em andamento' &&
      status !== 'reagendada' &&
      status !== 'agendada'
    ) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
