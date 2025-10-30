import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class DoctorUpdateSelfRestrictions implements PipeTransform {
  transform(value: any) {
    const forbiddenKeys = [
      'cpf',
      'crm',
      'specialties',
      'academic_degree',
      'situation',
      'workday_begin',
      'workday_end',
    ];

    console.log(value);

    if (typeof value === 'object' && Object.keys(value).length < 1) {
      throw new BadRequestException('Nenhum dado enviado para atualização');
    }

    if (typeof value === 'object') {
      forbiddenKeys.forEach((element) => {
        if (Object.keys(value).includes(element)) {
          throw new ForbiddenException('Ação não autorizada');
        }
      });
    }

    return value;
  }
}
