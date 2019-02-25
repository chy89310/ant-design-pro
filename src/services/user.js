import request from '@/utils/request';

export async function query() {
  console.log('query');
  return request('/api/users');
}

export async function queryCurrent() {
  console.log('queryCurrent');
  return request('http://localhost:8080/Original_technology/account/UserRetrieveById', {
    method: 'POST',
    header: {
      Authorization:
        'Basic YXBpX3Rva2VuOmVSQ3lkYW1aVUdwTzFSNjMwcVF0UWhsU3g0MWxueVQzOFU5N2p0TUt6aGx0VFB5bG9pZW1yQzRFU2xMcw==',
    },
    body: {
      data: { userId: 1 },
    },
  });
}

export async function accountLogin(params) {
  console.log('accountLogin');
  console.log(params);
  return request('http://localhost:8080/Original_technology/account/login', {
    method: 'POST',
    body: {
      data: params,
    },
  });
}
