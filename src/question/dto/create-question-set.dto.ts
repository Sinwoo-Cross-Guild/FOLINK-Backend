import { Expose } from 'class-transformer'
import { IsEnum, IsNumber, IsString } from 'class-validator'
import { ProjectQuestionDto } from './response-project-question.dto'
import { TechStackQuestionDto } from './response-stack-question.dto'
import { DifficultyType } from 'src/answer/enum/difficulty.type'

export class CreateQuestionSetDto {
  @Expose()
  @IsNumber()
  public readonly id!: number

  @Expose()
  @IsString()
  public readonly originalText!: string

  @Expose()
  @IsEnum(DifficultyType)
  public difficulty!: DifficultyType // 추가

  @Expose()
  public projectQuestions!: ProjectQuestionDto[]

  @Expose()
  public techStackQuestions!: TechStackQuestionDto[]
}
