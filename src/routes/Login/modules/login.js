/**
 * Created by xwatson on 2016/12/28.
 */

const LOGIN_SINGIN = 'LOGIN_SINGIN' // 登录
const LOGIN_SINGOUT = 'LOGIN_SINGOUT' // 登出
const RECEIVE_USER = 'LOGIN_SINGOUT' // 接受用户

export function singIn() {
    return {
        type: LOGIN_SINGIN
    }
}
export function singOut(user = {}) {
    return {
        type: LOGIN_SINGOUT
    }
}
// 接受用户信息
export function receiveUser(user = {}) {
    return {
        type: RECEIVE_USER,
        payload:{
            User:user
        }
    }
}
// 接受退出信息
export function receiveSingOut(data = {}) {
    return {
        type: RECEIVE_USER,
        payload:{
            Data:data
        }
    }
}
export function fetchLogin(user) {
    return (dispatch, getState) => {
        if (getState().User.fetching) return
        console.log('接受登录：', user)
        // 发起请求
        dispatch(singIn())
        // 模拟请求
        setTimeout(function() {
            dispatch(receiveUser({
                name: 'test',
                token: 'SADASD12WWQSSD34DCSDCS1'
            }))
        }, 2000)
    }
}

export const actions = {
    singIn,
    singOut,
    fetchLogin
}

const ACTION_HANDLERS = {
    [LOGIN_SINGIN]: (state, action) => {
        return ({ ...state, fetching: true })
    },
    [LOGIN_SINGOUT]: (state, action) => {
        return ({ ...state, fetching: true })
    },
    [RECEIVE_USER] : (state, action) => {
        return { ...state, fetching: false, User: action.payload.User }
    }
}

const initialState = {
    fetching:false,
    User:{}
}
export default function loginReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
