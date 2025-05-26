import {
  ArgumentMetadata,
  ForbiddenException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AntiStatementUrl implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const urlContent = String(value);
    const forbiddenChars: string[] = [
      '%',
      'OR',
      'AND',
      'NOT',
      '/',
      'FROM',
      '*',
    ];

    if (metadata.type === 'param' || metadata.type === 'query') {
      forbiddenChars.forEach((element) => {
        if (urlContent.includes(element)) {
          throw new ForbiddenException('Valores não permitidos');
        }
      });
    }

    return value;
  }
}
