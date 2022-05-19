import http from "../http-common"

export default {
  getAll: () => http.get('/tutorials'),
  get: (id) => http.get(`/tutorials/${id}`),
  create: (data) => http.post('/tutorials', data),
  update: (id, data) => http.put(`/tutorials/${id}`, data),
  delete: (id) => http.delete(`/tutorials/${id}`),
  deleteAll: () => http.delete('/tutorials'),
  findByKeyWord: (keyWord) => http.get(`/tutorials/search/keywords?keyWord=${keyWord}`)
}