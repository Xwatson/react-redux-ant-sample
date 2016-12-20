/**
 * Created by xwatson on 2016/12/9.
 */
import React from 'react'
import { browserHistory, Link } from 'react-router'
import { Breadcrumb } from 'antd'

export default class Breadcrumbs extends React.Component {
    static propTypes = {
        menus: React.PropTypes.object
    }
    _setBreadcrumb() {
        let location = browserHistory.getCurrentLocation()
        let reg = /^(\/)(items)(\/)?/
        let match = location.pathname.match(reg)
        let path = match ? '/' + match[2] : ''
        let isDetail = match && match[3]
        let _bread = [<Breadcrumb.Item key={'bread-0'}>{match ? <Link to="/">首页</Link> : '首页'}</Breadcrumb.Item>]
        let subs = this.props.menus.subs
        let count = 1
        for (let key in subs) {
            let items = subs[key].items
            for (let item in items) {
                if (items[item].router === path) {
                    _bread.push(<Breadcrumb.Item key={'bread-' + count}>{!isDetail ? items[item].name : <Link to={items[item].router}>{items[item].name}</Link>}</Breadcrumb.Item>)
                    if (isDetail) {
                        _bread.push(<Breadcrumb.Item key={'bread-' + count}>{items[item].name}详情</Breadcrumb.Item>)
                    }
                    count++
                }
            }
        }
        return _bread
    }
    render() {
        return (
            <Breadcrumb>
                {this._setBreadcrumb()}
            </Breadcrumb>
        )
    }
}
