import { Body, Controller, Delete, Get, Logger, Param, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'
import { QuestionFilter } from './dto.interface'
import { Question } from './globals/interfaces/question.interface'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private logger = new Logger(AppController.name)

  @Get()
  async hello() {
    this.logger.log(`hello`)
    return 'hello'
  }

  @Get('/catalog')
  async getCatalog() {
    this.logger.log(`get catalog`)
    return this.appService.getCatalog()
  }

  @Post('/category')
  async addRootCategory(@Body() { title }: { title: string }) {
    this.logger.log(`add category ${title} to root`)
    return await this.appService.addCategory(null, title)
  }

  @Post('/category/:id')
  async addCategory(@Param('id') parent: string, @Body() { title }: { title: string }) {
    this.logger.log(`add category ${title} to ${parent}`)
    return await this.appService.addCategory(parent, title)
  }

  @Delete('/category/:id')
  async deleteCategory(@Param('id') category: string) {
    this.logger.log(`delete category ${category}`)
    return await this.appService.deleteCategory(category)
  }

  @Get('/questions')
  async getQuestions(@Query() query: QuestionFilter) {
    this.logger.log(`get questions: ${JSON.stringify(query)}`)
    return await this.appService.getQuestions(query)
  }

  @Post('/questions')
  async postQuestions(@Body() { questions }: { questions: Question[] }) {
    this.logger.log(`add questions: ${JSON.stringify(questions)}`)
    return await this.appService.addQuestions(questions)
  }

  @Delete('/questions')
  async deleteQuestions(@Body() body: { ids: string[] }, @Query() query: { ids: string[] }) {
    this.logger.log(`delete questions: ${JSON.stringify(body)}, query ${JSON.stringify(query)}`)
    return await this.appService.deleteQuestions(query.ids)
  }
}
