import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'db_loja-de-games',
      entities: [], // vai virar Produto e Categoria
      synchronize: true
    }),
    //ProdutoModule,
    //CategoriaModule
  ],
  controllers: [AppController], //Vai virar produto controller
  providers: [AppService], //Vai virar produto service
})
export class AppModule {}
