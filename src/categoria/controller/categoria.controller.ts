import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

@Controller("/categoria")
export class CategoriaController {

  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get("/:id")
  findById(@Param("id") id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get("/nome/:nome")
  findByNome(@Param("nome") nome: string): Promise<Categoria[]> {
    return this.categoriaService.findByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

 @Put('/:id')
  @HttpCode(HttpStatus.OK) // http://localhost:4000/produto/1
  update(@Param("id") id: number,@Body() categoria: Categoria): Promise<Categoria> {
  return this.categoriaService.update(categoria);
  }

  @Delete("/:id")
  delete(@Param("id") id: number): Promise<{ message: string }> {
    return this.categoriaService.delete(id);
  }
}