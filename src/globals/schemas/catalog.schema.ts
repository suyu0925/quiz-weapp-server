import { Schema } from 'mongoose'

export const CatalogSchema = new Schema()

CatalogSchema.add({
  parent: String, // 该分类的父分类
  title: String, // 题目分类的标题
  children: [CatalogSchema], // 该分类下的子分类的id
})

CatalogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) { delete ret._id }
})
