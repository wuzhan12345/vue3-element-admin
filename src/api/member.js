import request from '@/utils/request'

export const getMembers = () => {
  return request({
    url: '/api/members',
    method: 'get',
  })
}

export const addMember = data => {
  return request({
    url: '/api/members',
    method: 'post',
    data,
  })
}

export const updateMember = data => {
  return request({
    url: '/api/members/update',
    method: 'post',
    data,
  })
}

export const deleteMember = data => {
  return request({
    url: '/api/members/delete',
    method: 'post',
    data,
  })
}
