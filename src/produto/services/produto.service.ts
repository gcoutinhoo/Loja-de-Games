import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { DeleteResult } from "typeorm/browser";


@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        //private categoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<{ message: string; data: Produto[] }> {
    const produtos = await this.produtoRepository.find();

    return {
        message: produtos.length === 0
            ? 'A loja está sem produtos no momento'
            : 'Produtos encontrados',
        data: produtos
    };
    }


    async findById(id: number): Promise<{ message: string; data: Produto }> {
    const produto = await this.produtoRepository.findOne({
        where: { id }
    });
    if (!produto) {
        throw new HttpException(
            'Produto não encontrado',
            HttpStatus.NOT_FOUND
        );
    }
    return {
        message: 'Produto encontrado',
        data: produto
    };
    }


    async findAllByTitulo(nome_produto: string): Promise<Produto[]> {
    const produtos = await this.produtoRepository.find({
        where: {
            nome_produto: ILike(`%${nome_produto}%`)
        }
    });

    if (produtos.length === 0) {
        throw new HttpException(
            'Nenhum produto encontrado com esse nome',
            HttpStatus.NOT_FOUND
        );
    }
    return produtos;
    }

    async create(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<{ message: string }> {
    const result = await this.produtoRepository.delete(id);

    if (result.affected === 0) {
        throw new HttpException(
            'Produto não encontrado',
            HttpStatus.NOT_FOUND
        );
    }

    return {
        message: 'Produto deletado com sucesso'
    };
}

}

