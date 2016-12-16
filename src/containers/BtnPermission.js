/**
 * Created by xwatson on 2016/12/15.
 */
import React, { PropTypes } from 'react'

export default class BtnPermission extends React.Component {
    static propTypes = {
        permission: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        children: PropTypes.object
    }

    render() {
        console.log(this.props.children)
        let _p = this.props.permission
        if (_p[this.props.type]) {
            return (
                this.props.children
            )
        } else {
            return (
                <span>&nbsp;</span>
            )
        }
    }
}
