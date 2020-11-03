import { Schema } from 'mongoose'

const QuestionOptionSchema = {
  content: String, // 选项内容
  option: String, // 选项名称，比如'A'
}

export const QuestionSchema = new Schema({
  category: String, // 分类的id
  type: String, // 题目类型
  stem: String, // 题干
  options: [QuestionOptionSchema],
  img: String, // 图片的url
  answer: String, // 答案
  explanation: String, // 解析
})

QuestionSchema.index({
  category: 1,
  type: 1,
  stem: 1,
})

QuestionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) { delete ret._id }
})
