import { Document } from 'mongoose'

export type Subcatalog = Catalog

export interface Catalog {
  parent: string // 该分类的父分类id
  title: string // 题目分类的标题
  id: string // 题目分类的id
  children: Catalog[] // 该分类下子分类的id
}

export interface CatalogDoc extends Omit<Catalog, 'id'>, Document { }

export function findSubcatalog(category: string, catalog: Catalog) {
  const _findSubcatalog = (category: string, current: Catalog): Catalog => {
    if (category === current.id) {
      return current
    }
    for (const child of current.children) {
      const r = _findSubcatalog(category, child)
      if (r) {
        return r
      }
    }
    return null
  }
  if (!category) {
    return catalog
  }
  return _findSubcatalog(category, catalog)
}
