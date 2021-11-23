import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meme {
    @PrimaryGeneratedColumn()
    id_meme: number;

    @Column()
    url: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    tags: string;

    @Column()
    publication_date: Date;

    @Column()
    like_nb: number;

    @Column()
    author_id: number
}
