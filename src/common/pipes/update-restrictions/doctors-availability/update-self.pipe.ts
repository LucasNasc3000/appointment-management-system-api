import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class DoctorsAvailabilityUpdateSelfRestrictions
  implements PipeTransform
{
  transform(value: any) {
    if (typeof value === 'object' && Object.keys(value).length < 1) {
      throw new BadRequestException('Nenhum dado enviado para atualização');
    }

    if (Object.keys(value).includes('situation')) {
      throw new ForbiddenException('Ação não autorizada');
    }

    return value;
  }
}
