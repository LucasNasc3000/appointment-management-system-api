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

    if (metadata.type !== 'param') {
      throw new BadRequestException('metadata type must be "param"');
    }

    if (
      urlContent.includes('%') ||
      urlContent.includes('OR') ||
      urlContent.includes('AND') ||
      urlContent.includes('NOT') ||
      urlContent.includes('SELECT') ||
      urlContent.includes('FROM')
    ) {
      throw new ForbiddenException('Valores não permitidos');
    }
    return value;
  }
}
