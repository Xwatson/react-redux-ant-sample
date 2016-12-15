/**
 * Created by xwatson on 2016/12/9.
 */

const ITEM_REQUIRE = 'ITEM_GETALL'
const ITEM_RECEIVE = 'ITEM_RECEIVE'

export function initItems() {
    return {
        type: ITEM_REQUIRE
    }
}
export function receiveItems(date = []) {
    return {
        type: ITEM_RECEIVE,
        payload:{
            tableDate:date
        }
    }
}
export function fetchItems() {
    return (dispatch, getState) => {
        if (getState().items.fetching) return
        // 发起请求
        dispatch(initItems())
        // 模拟请求
        setTimeout(function() {
            let data = [{
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号'
            }, {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }]
            dispatch(receiveItems(data))
        }, 2000)
    }
}

export const actions = {
    initItems,
    receiveItems,
    fetchItems
}

const ACTION_HANDLERS = {
    [ITEM_REQUIRE]: (state, action) => {
        return ({ ...state, fetching: true })
    },
    [ITEM_RECEIVE] : (state, action) => {
        return ({ ...state, fetching: false, tableDate: action.payload.tableDate })
    }
}

const initialState = {
    fetching:false,
    tableDate:[]
}
export default function itemsReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
