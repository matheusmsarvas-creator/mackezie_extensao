import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransacaoDto } from './create-transacao.dto.js';
import { Transacao } from './transacao.schema.js';

export interface Metricas {
  saldoTotal: number;
  totalDespesas: number;
  totalGastoImpulso: number;
}

const arredondar = (n: number) => Math.round(n * 100) / 100;

export function calcularMetricas(
  transacoes: Pick<Transacao, 'valor' | 'tipo' | 'consumoConsciente'>[],
): Metricas {
  let receitas = 0;
  let totalDespesas = 0;
  let totalGastoImpulso = 0;

  for (const t of transacoes) {
    if (t.tipo === 'receita') {
      receitas += t.valor;
    } else if (t.tipo === 'despesa') {
      totalDespesas += t.valor;
      if (t.consumoConsciente === false) totalGastoImpulso += t.valor;
    }
  }

  return {
    saldoTotal: arredondar(receitas - totalDespesas),
    totalDespesas: arredondar(totalDespesas),
    totalGastoImpulso: arredondar(totalGastoImpulso),
  };
}

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name) private readonly model: Model<Transacao>,
  ) {}

  create(dto: CreateTransacaoDto) {
    return this.model.create(dto);
  }

  async findAll() {
    const historico = await this.model.find().sort({ createdAt: -1 }).lean();
    return { historico, metricas: calcularMetricas(historico) };
  }
}
