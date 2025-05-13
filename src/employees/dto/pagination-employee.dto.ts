import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class PaginationDTO {
  @IsInt({
    message: 'Limite precisa ser um numero inteiro',
  })
  @Min(0, {
    message: 'Limite não pode ser menor que 0',
  })
  @Max(50, {
    message: 'Limite não pode ser maior que 30',
  })
  @Type(() => Number)
  limit: number;

  @IsInt({
    message: 'Offset precisa ser um numero inteiro',
  })
  @Min(1, {
    message: 'Offser deve ser maior que 0',
  })
  @Type(() => Number)
  offset: number;

  employeeSearchData: string;
}
