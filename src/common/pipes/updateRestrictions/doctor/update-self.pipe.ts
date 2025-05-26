import {
  ArgumentMetadata,
  BadRequestException,
  ForbiddenException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { uuidCheck } from 'src/common/constants/uuid-regex';

@Injectable()
export class DoctorUpdateSelfRestrictions implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const urlValue = String(value);
    const forbiddenKeys = [
      'cpf',
      'crm',
      'specialties',
      'academic_degree',
      'situation',
      'workday_begin',
      'workday_end',
    ];

    if (metadata.type === 'param' && !uuidCheck.test(urlValue)) {
      throw new BadRequestException('Formato da url inválido');
    }

    if (typeof value === 'object' && Object.keys(value).length < 1) {
      throw new BadRequestException('Nenhum dado enviado para atualização');
    }

    forbiddenKeys.forEach((element) => {
      if (Object.keys(value).includes(element)) {
        throw new ForbiddenException('Ação não autorizada');
      }
    });

    return value;
  }
}
