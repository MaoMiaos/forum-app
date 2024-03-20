import Mock from 'mockjs'

const  domain = '/api/';
Mock.mock(domain + 'login', function () {
    return {
        code: 200,
        message: '登录成功',
        data: {
            loginUid: '1',
            nickname: 'hello bro',
            token: 'helloBro',
        },
    }
})