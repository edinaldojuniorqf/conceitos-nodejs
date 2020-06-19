const express = require('express')
const cors = require('cors')
const { uuid } = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get('/repositories', (request, response) => {
  response.status(200).json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repo)

  response.status(201).json(repo)
})

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  let index = repositories.findIndex(repo => repo.id === id)

  if (index === -1) {
    return response.status(400).send()
  }

  let repo = {
    ...repositories[index],
    title,
    url,
    techs,
  }

  repositories[index] = repo

  response.status(200).json(repo)
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params
  const index = repositories.findIndex(repo => repo.id === id)

  if (index === -1) {
    return response.status(400).send()
  }

  repositories.splice(index, 1)

  response.status(204).send()
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params

  let index = repositories.findIndex(repo => repo.id === id)

  if (index === -1) {
    return response.status(400).send()
  }

  let repo = repositories[index]
  repo.likes += 1

  response.status(201).json(repo)
})

module.exports = app
