/**
 * Created by xwatson on 2016/12/22.
 */
import React, { PropTypes } from 'react'
import { Select } from 'antd'
const Option = Select.Option

export default class TableEditSelect extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        editable: PropTypes.bool,
        status: PropTypes.string,
        onChange: PropTypes.func,
        showSearch: PropTypes.bool,
        options: PropTypes.array
    }
    state = {
        value: this.props.value,
        editable: this.props.editable || false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({ editable: nextProps.editable })
            if (nextProps.editable) {
                this.cacheValue = this.state.value
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value)
            } else if (nextProps.status === 'cancel') {
                this.setState({ value: this.cacheValue })
                this.props.onChange(this.cacheValue)
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value
    }

    handleChange(e) {
        const value = e.target.value
        this.setState({ value })
    }

    render() {
        const { value, editable } = this.state
        const { showSearch, options } = this.props
        return (<div>
            {
                editable ?
                    <div>
                        <Select showSearch={showSearch} style={{ width: 200 }} placeholder="Select a person"
                          optionFilterProp="children"
                          onChange={this.handleChange}>
                            {
                                options.map((item, i) => {
                                    return <Option key={'select-option-' + i} value={item.value}>{item.text}</Option>
                                })
                            }
                        </Select>
                    </div> :
                    <div className="editable-row-text">
                        {value || ' '}
                    </div>
            }
        </div>)
    }
}
