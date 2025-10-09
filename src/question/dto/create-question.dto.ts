import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { DifficultyType } from 'src/answer/enum/difficulty.type'

export class CreateQuestionDto {
  @ApiProperty({
    description: '사용자가 입력한 텍스트',
    default: '저는 열정적인 인재이며 NestJS를 활용한 프로젝트 경험이 다수 있습니다.'
  })
  @IsNotEmpty({ message: 'userResponse는 필수입니다' })
  @IsString({ message: 'userResponse는 문자열이어야 합니다' })
  public userResponse!: string

  @ApiProperty({
    description: '면접 난이도',
    enum: DifficultyType,
    default: DifficultyType.NORMAL
  })
  @IsEnum(DifficultyType, { message: '유효한 난이도를 선택하세요 (easy, normal, hard)' })
  public difficulty: DifficultyType = DifficultyType.NORMAL
}
