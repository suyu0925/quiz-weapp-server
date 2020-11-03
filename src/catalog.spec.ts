import Axios from 'axios'

const logger = console
const axios = Axios.create({
  baseURL: 'http://localhost:2333'
})

describe('catalog', () => {
  test('crud', async () => {
    const { data: beginning } = await axios.get('/catalog')
    logger.info(`get catalog: ${JSON.stringify(beginning)}`)
    expect(beginning.id).not.toBeNull()

    await axios.post('/category', { title: '测试添加的临时分类' })
    const { data: after } = await axios.get('/catalog')
    logger.info(`add category: ${JSON.stringify(after)}`)
    expect(after.children.length).toEqual(beginning.children.length + 1)

    const { data: afterDelete } = await axios.delete(`/category/${after.children[after.children.length - 1].id}`)
    logger.info(`delete category: ${JSON.stringify(afterDelete)}`)
    expect(afterDelete).toEqual(beginning)
  })
})
