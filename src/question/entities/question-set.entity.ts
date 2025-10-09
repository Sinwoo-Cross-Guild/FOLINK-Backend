import { IsDate, IsString } from 'class-validator'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Question } from './question.entity'
import { QuestionStack } from './question-stack.entity'
import { DifficultyType } from 'src/answer/enum/difficulty.type'

@Entity()
export class QuestionSet extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  public readonly id!: number

  @Column({ name: 'original_text', type: 'varchar', nullable: false })
  @IsString()
  public originalText: string

  @Column({ type: 'enum', enum: DifficultyType, default: DifficultyType.NORMAL }) // 추가
  public difficulty!: DifficultyType

  @CreateDateColumn({ name: 'create_At', type: 'timestamp', nullable: false })
  @IsDate()
  public readonly createdAt!: Date

  @OneToMany(() => Question, (question) => question.questionSet, { cascade: true })
  public questions!: Question[]

  @OneToMany(() => QuestionStack, (stack) => stack.questionSet, { cascade: true })
  public questionStacks!: QuestionStack[]

  private constructor(originalText: string, difficulty: DifficultyType = DifficultyType.NORMAL) {
    super()
    this.originalText = originalText
    this.difficulty = difficulty // 추가
  }

  static createQuestionSet(originalText: string, difficulty: DifficultyType = DifficultyType.NORMAL): QuestionSet {
    const set = new QuestionSet(originalText, difficulty)
    set.questions = []
    set.questionStacks = []
    return set
  }

  public addQuestion(question: Question): void {
    question.questionSet = this
    this.questions.push(question)
  }

  public addQuestionStack(questionStack: QuestionStack): void {
    questionStack.questionSet = this
    this.questionStacks.push(questionStack)
  }
}
