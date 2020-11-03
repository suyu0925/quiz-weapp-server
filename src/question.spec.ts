import Axios from 'axios'

const logger = console
const axios = Axios.create({
  baseURL: 'http://localhost:2333'
})

describe('question', () => {
  test('crud', async () => {
    const { data: questions } = await axios.get('/questions', { params: { category: null } })
    // logger.info(`get questions with no category: ${JSON.stringify(questions)}`)

    await axios.post('/questions', { questions: [{ stem: '测试题目' }] })
    const { data: afterAdd } = await axios.get('/questions', { params: { category: null } })
    // logger.info(`get questions with no category after add: ${JSON.stringify(afterAdd)}`)
    expect(afterAdd.length).toEqual(questions.length + 1)

    await axios.delete('/questions', { params: { ids: [afterAdd[afterAdd.length - 1].id] } })
    const { data: afterDelete } = await axios.get('/questions', { params: { category: null } })
    // logger.info(`get questions with no category after delete: ${JSON.stringify(afterDelete)}`)
    expect(afterDelete.length).toEqual(questions.length)
  })
})
