import { IsString, IsArray, IsUrl, Length } from 'class-validator';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// export enum ToolCategory {
//   MISC = 'misc',
//   API = 'api',
//   EMAIL = 'email',
//   DESGIN = 'design',
//   VISUALIZATION = 'visualization',
//   TEXT = 'text',
//   GENERATOR = 'generator/faker',
//   FORMATTER = 'formatter',
//   CODE_QUALITY = 'codeQuality',
//   TESTING = 'testing',
//   ML = 'ml',
//   COMMS = 'communincation',
//   DIAGRAMMING = 'diagramming',
//   MEDIA = 'media',
//   SECURITY = 'security',
//   OPS = 'operations',
// }
@Entity()
export class Tool {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(1, 25)
  @Column({ unique:true })
  name: string;

  @IsUrl()
  @Column()
  url: string;

  @IsString()
  @Length(1, 120)
  @Column()
  description: string;

  @IsUrl()
  @Column({ nullable: true })
  img: string;

  // @IsEnum(ToolCategory)
  // @Column({ type: 'enum', enum: ToolCategory })
  // category: ToolCategory;

  @IsArray()
  @Column({  type: "text",  array: true, default:[]})
  tags: string[];

  @Column('decimal', { scale: 2, default: 0.0 })
  ratings_sum: number;

  @Column({ type: 'int', default: 0 })
  ratings_count: number;

  protected avg_rating: number;

  @AfterLoad()
  calcAverageRating() {
    this.avg_rating =
      this.ratings_count == 0 ? -1 : this.ratings_sum / this.ratings_count;
  }

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
