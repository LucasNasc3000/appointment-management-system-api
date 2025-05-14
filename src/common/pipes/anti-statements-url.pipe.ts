import {
  ArgumentMetadata,
  BadRequestException,
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

    if (metadata.type !== 'param' && metadata.type !== 'query') {
      throw new BadRequestException('metadata type must be "param" or "query"');
    }

    for (let i: number = 0; i < forbiddenChars.length; i++) {
      if (urlContent.includes(forbiddenChars[i])) {
        throw new ForbiddenException('Valores não permitidos');
      }
    }

    return value;
  }
}
