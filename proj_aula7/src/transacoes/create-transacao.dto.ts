import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { TIPOS_TRANSACAO } from './transacao.schema.js';
import type { TipoTransacao } from './transacao.schema.js';

export class CreateTransacaoDto {
  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsNumber()
  @IsPositive()
  valor!: number;

  @IsIn(TIPOS_TRANSACAO, { message: 'tipo deve ser "receita" ou "despesa"' })
  tipo!: TipoTransacao;

  @IsString()
  @IsNotEmpty()
  categoria!: string;

  // true = gasto essencial/consciente; false = gasto por impulso
  @IsOptional()
  @IsBoolean()
  consumoConsciente?: boolean;
}
