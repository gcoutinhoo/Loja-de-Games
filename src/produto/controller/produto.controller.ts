import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";



@Controller("/produto")
export class ProdutoController{
    constructor(private produtoService: ProdutoService){}

    @Get() // http://localhost:4000/produto
    @HttpCode(HttpStatus.OK)  
    findAll(): Promise<{ message: string; data: Produto[] }> {
    return this.produtoService.findAll();
    }

    @Get('/:id') // http://localhost:4000/produto/1
    findById(@Param('id', ParseIntPipe) id: number){ 
    return this.produtoService.findById(id);
    }

    @Get('/nome/:nome') // http://localhost:4000/produto/nome/Mouse
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('nome') titulo: string): Promise<Produto[]> {
    return this.produtoService.findAllByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) // http://localhost:4000/produto
    create(@Body() produto : Produto): Promise<Produto>{
    return this.produtoService.create(produto);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK) // http://localhost:4000/produto/1
    update(@Param("id") id: number,@Body() produto : Produto): Promise<Produto>{
    return this.produtoService.update(produto);
    }
    
    @Delete('/:id')
    @HttpCode(HttpStatus.OK) // http://localhost:4000/produto/1
    delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.produtoService.delete(id);
    }

}
