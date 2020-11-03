import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { QuestionFilter } from './dto.interface'
import { Catalog, CatalogDoc, findSubcatalog } from './globals/interfaces/category.interface'
import { Question, QuestionDoc } from './globals/interfaces/question.interface'

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel('question') private readonly questionModel: Model<QuestionDoc>,
    @InjectModel('catalog') private readonly catalogModel: Model<CatalogDoc>
  ) { }

  private logger = new Logger(AppService.name)

  async onModuleInit() {
    const catalog = await this.catalogModel.findOne()
    if (!catalog) {
      await this.catalogModel.create({
        parent: null,
        title: '根目录',
        children: []
      })
    }
  }

  async getCatalog() {
    let catalog = await this.catalogModel.findOne()
    return catalog
  }

  async addCategory(parent: string, title: string) {
    const catalog = await this.catalogModel.findOne()
    // find parent, create a new category and attach it
    const subcatalog = findSubcatalog(parent, catalog as Catalog)
    if (!subcatalog) {
      throw new Error(`can not find parent ${parent}`)
    }
    subcatalog.children.push({
      parent: subcatalog.id,
      title,
      children: [],
    } as Catalog)
    catalog.markModified('children')
    await catalog.save()
    return catalog
  }

  async deleteCategory(category: string) {
    const catalog = await this.catalogModel.findOne()
    // find category, create a new category and attach it
    let subcatalog = findSubcatalog(category, catalog as Catalog)
    if (!subcatalog) {
      throw new Error(`can not find parent ${parent}`)
    }
    // find parent
    const parentCatalog = findSubcatalog(subcatalog.parent, catalog as Catalog)
    const index = parentCatalog.children.indexOf(subcatalog)
    parentCatalog.children.splice(index, 1)
    catalog.markModified('children')
    await catalog.save()
    return catalog
  }

  async getQuestions(query: QuestionFilter) {
    const questions = await this.questionModel.find(query)
    return questions
  }

  async addQuestions(questions: Question[]) {
    return await this.questionModel.insertMany(questions)
  }

  async deleteQuestions(ids: string[]) {
    return await this.questionModel.deleteMany({ _id: { $in: ids } })
  }
}
