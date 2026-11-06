import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TransacoesModule } from './transacoes/transacoes.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Defina MONGODB_URI no arquivo .env (string de conexão do MongoDB Atlas)
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/controle_financeiro',
    ),
    TransacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
