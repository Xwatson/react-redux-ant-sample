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
        console.log(match)
        let path = match ? '/' + match[2] : ''
        let _bread = [<Breadcrumb.Item key={'bread-0'}>首页</Breadcrumb.Item>]
        let subs = this.props.menus.subs
        let count = 1
        for (let key in subs) {
            let items = subs[key].items
            for (let item in items) {
                if (items[item].router === path) {
                    _bread.push(<Breadcrumb.Item key={'bread-' + count}>{items[item].name}</Breadcrumb.Item>)
                    if (match && match[3]) {
                        _bread.push(<Breadcrumb.Item key={'bread-' + count}>{items[item].name}详情</Breadcrumb.Item>)
                    }
                }
                count++
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
