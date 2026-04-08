import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";


@Entity({name: "tb_produto"})
export class Produto {

    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome_produto!: string;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    descricao!: string;

    @IsNotEmpty()
    @Column('decimal', { precision: 10, scale: 2 })
    preco!: number; 

    @Column()
    quantidade!: number;

  @ManyToMany(() => Categoria, (categoria) => categoria.produtos, {
    onDelete: 'CASCADE'
  })
  categoria!: Categoria;
    

}