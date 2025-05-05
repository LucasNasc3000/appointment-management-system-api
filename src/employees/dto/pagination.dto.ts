import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsInt({
    message: 'Limite precisa ser um numero inteiro',
  })
  @Min(1)
  @Max(50, {
    message: 'Limite não pode ser maior que 30',
  })
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsInt({
    message: 'Offset precisa ser um numero inteiro',
  })
  @Min(0)
  @Type(() => Number)
  offset: number;
}
