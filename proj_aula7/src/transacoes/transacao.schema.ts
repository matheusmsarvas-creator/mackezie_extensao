import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export const TIPOS_TRANSACAO = ['receita', 'despesa'] as const;
export type TipoTransacao = (typeof TIPOS_TRANSACAO)[number];

@Schema({ timestamps: true })
export class Transacao {
  @Prop({ type: String, required: true, trim: true })
  descricao!: string;

  @Prop({ type: Number, required: true, min: 0 })
  valor!: number;

  @Prop({ type: String, required: true, enum: TIPOS_TRANSACAO })
  tipo!: TipoTransacao;

  @Prop({ type: String, required: true, trim: true })
  categoria!: string;

  @Prop({ type: Boolean, required: true, default: true })
  consumoConsciente!: boolean;
}

export type TransacaoDocument = HydratedDocument<Transacao>;
export const TransacaoSchema = SchemaFactory.createForClass(Transacao);
