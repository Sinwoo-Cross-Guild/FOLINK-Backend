/* eslint-disable prettier/prettier */
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common'
import { AppService } from './app.service'
import { Test } from './app.test.entity'
import { TestDto } from './app.test.dto'
import { ok } from 'assert'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello(): { status: string } {
    return { status: 'ok' }
  }

  @Get('test')
  getTestData(): Test[] {
    return this.appService.getDate()
  }

  @Get('test/:id')
  getOneTestData(@Param('id', ParseIntPipe) id: number) {
    const test = this.appService.getOneDate(id)

    if (!test) {
      throw new NotFoundException(`${id} Not found.`)
    }

    return test
  }
}
