import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class EmployeeUpdateSelfRestrictions implements PipeTransform {
  transform(value: any) {
    const forbiddenKeys = [
      'cpf',
      'role',
      'situation',
      'workday_begin',
      'workday_end',
    ];

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
