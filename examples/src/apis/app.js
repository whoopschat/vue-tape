export const list = () => {
  return Tape.request({
    url: `${Tape.config('API_SERVICE')}/admin/app/list`
  })
}

export const add = (data) => {
  return Tape.request({
    method: 'POST',
    url: `${Tape.config('API_SERVICE')}/admin/app/add`,
    data: data
  })
}

export const update = (id, data) => {
  return Tape.request({
    method: 'POST',
    url: `${Tape.config('API_SERVICE')}/admin/app/update/${id}`,
    data: data
  })
}

export const del = (id) => {
  return Tape.request({
    method: 'POST',
    url: `${Tape.config('API_SERVICE')}/admin/app/delete/${id}`,
  })
}