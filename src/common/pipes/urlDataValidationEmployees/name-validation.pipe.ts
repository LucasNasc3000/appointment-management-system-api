import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindByNameValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const alphabetRegex = /^[a-zA-Z]+$/;
    const name = String(value.employeeSearchData);

    if (metadata.type !== 'query') {
      throw new BadRequestException('metadata type must be "query"');
    }

    if (name.length > 125) {
      throw new BadRequestException('Formato inválido');
    }

    if (!alphabetRegex.test(name)) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
