import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTransacaoDto } from './create-transacao.dto.js';
import { TransacoesService } from './transacoes.service.js';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly service: TransacoesService) {}

  @Post()
  create(@Body() dto: CreateTransacaoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
