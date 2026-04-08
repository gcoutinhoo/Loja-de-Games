import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { ProdutoModule } from './produto/produto.module';
import { ProdutoController } from './produto/controller/produto.controller';
import { ProdutoService } from './produto/services/produto.service';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'db_lojagames',
      entities: [Produto, Categoria], // vai virar Produto e Categoria
      synchronize: true
    }),
    ProdutoModule,
    CategoriaModule
  ],
  controllers: [ProdutoController], //Vai virar produto controller
  providers: [ProdutoService], //Vai virar produto service
})
export class AppModule {}
