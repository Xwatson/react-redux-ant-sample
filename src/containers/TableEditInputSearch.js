/**
 * Created by xwatson on 2016/12/23.
 */
import React from 'react'
import { Input, Select, Button, Icon } from 'antd'
const Option = Select.Option
import classNames from 'classnames'

export default class TableEditInputSearch extends React.Component {
    static propTypes = {
        value: React.PropTypes.string,
        editable: React.PropTypes.bool,
        status: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onSearch: React.PropTypes.func,
        placeholder: React.PropTypes.string,
        style: React.PropTypes.object,
        optionData : React.PropTypes.array
    }
    constructor(props) {
        super(props)
        this.handleChangeTimer = null
        this.cacheData = []
        this.isSelect = false
        this.handleBlur = this.handleBlur.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }
    state = {
        data: this.props.optionData,
        value: this.props.value,
        focus: false,
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
            nextState.value !== this.state.value || nextProps.optionData !== this.cacheData
    }
    handleChange(value) {
        if (!this.isSelect) {
            this.cacheData = this.state.data
            if (this.handleChangeTimer) clearTimeout(this.handleChangeTimer)
            this.handleChangeTimer = setTimeout(() => {
                this.setState({ value })
                this.props.onSearch(value)
            }, 300)
        } else {
            this.setState({ value })
            this.isSelect = false
        }
    }
    handleSubmit() {
        console.log('输入框内容是: ', this.state.value)
    }
    handleFocus() {
        this.setState({ focus: true })
    }
    handleBlur() {
        this.setState({ focus: false })
    }
    handleSelect() {
        this.isSelect = true
    }
    render() {
        const { value, editable, data } = this.state
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim()
        })
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus
        })
        const options = data.map((d, i) => <Option key={d.value + '-' + i} value={d.text}>{d.text}</Option>)
        this.cacheData = []
        return (
            editable ?
                <div className="ant-search-input-wrapper" style={this.props.style}>
                    <Input.Group className={searchCls}>
                        <Select combobox value={this.state.value} placeholder={this.props.placeholder} notFoundContent=""
                          defaultActiveFirstOption={false} showArrow={false} filterOption={false}
                          onChange={this.handleChange}
                          onFocus={this.handleFocus}
                          onBlur={this.handleBlur}
                          onSelect={this.handleSelect}
                        >
                            {options}
                        </Select>
                        <div className="ant-input-group-wrap">
                            <Button className={btnCls} onClick={e => this.handleSubmit}>
                                <Icon type="search" />
                            </Button>
                        </div>
                    </Input.Group>
                </div> :
                <div className="editable-row-text">
                    {value || ' '}
                </div>
        )
    }
}
