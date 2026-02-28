const memberStore = [
  {
    id: 1,
    name: '张三',
    phone: '13800138001',
    email: 'zhangsan@example.com',
    level: '金卡会员',
    province: '北京',
    city: '北京',
    address: '朝阳区建国路88号SOHO现代城A座1201',
    avatar: '',
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139002',
    email: 'lisi@example.com',
    level: '钻石会员',
    province: '上海',
    city: '上海',
    address: '浦东新区陆家嘴环路1000号恒生银行大厦18层',
    avatar: '',
  },
  {
    id: 3,
    name: '王五',
    phone: '15012345678',
    email: 'wangwu@example.com',
    level: '普通会员',
    province: '广东',
    city: '广州',
    address: '天河区天河路385号太古汇一座3501',
    avatar: '',
  },
  {
    id: 4,
    name: '赵六',
    phone: '18698765432',
    email: 'zhaoliu@example.com',
    level: '银卡会员',
    province: '浙江',
    city: '杭州',
    address: '西湖区文三路478号华星时代广场B座602',
    avatar: '',
  },
]

let nextId = 5

export default [
  {
    url: '/api/members',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取成功',
        data: {
          list: memberStore,
          total: memberStore.length,
        },
      }
    },
  },
  {
    url: '/api/members',
    method: 'post',
    response: ({ body }) => {
      const member = {
        id: nextId++,
        name: body.name,
        phone: body.phone,
        email: body.email || '',
        level: body.level,
        province: body.province || '',
        city: body.city || '',
        address: body.address,
        avatar: body.avatar || '',
      }
      memberStore.push(member)
      return {
        code: 200,
        message: '添加成功',
        data: member,
      }
    },
  },
  {
    url: '/api/members/update',
    method: 'post',
    response: ({ body }) => {
      const idx = memberStore.findIndex(m => m.id === body.id)
      if (idx !== -1) {
        memberStore[idx] = { ...memberStore[idx], ...body }
        return {
          code: 200,
          message: '更新成功',
          data: memberStore[idx],
        }
      }
      return { code: 400, message: '会员不存在' }
    },
  },
  {
    url: '/api/members/delete',
    method: 'post',
    response: ({ body }) => {
      const idx = memberStore.findIndex(m => m.id === body.id)
      if (idx !== -1) {
        memberStore.splice(idx, 1)
        return {
          code: 200,
          message: '删除成功',
        }
      }
      return { code: 400, message: '会员不存在' }
    },
  },
]
