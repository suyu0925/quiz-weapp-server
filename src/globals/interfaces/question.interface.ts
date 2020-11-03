import { Document } from 'mongoose'

export type LearningType = 'sequence' | 'random' | 'favorite'

export type QuestionType = 'choice' | 'blank'

export type QuestionOption = {
  content: string // 选项内容
  option: string // 选项名称，比如'A'
}

export interface Question {
  category: string // 分类的id
  type?: QuestionType // 题目类型
  stem: string // 题干
  options: QuestionOption[]
  img: null | string // 图片的url
  answer: string // 答案
  id: string // 题目的唯一id
  explanation?: string // 解析
}

export interface QuestionDoc extends Omit<Question, 'id'>, Document { }
