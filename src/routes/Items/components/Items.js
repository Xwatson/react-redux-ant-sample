/**
 * Created by xwatson on 2016/12/9.
 */
import React, { PropTypes } from 'react'
import { Table, Input, Popconfirm, Select, DatePicker, Calendar } from 'antd'
import { browserHistory } from 'react-router'
import moment from 'moment'

class EditableCell extends React.Component {
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
        return (<div>
            {
                editable ?
                    <div>
                        <Input value={value} onChange={e => this.handleChange(e)} />
                    </div> :
                    <div className="editable-row-text">
                        {value || ' '}
                    </div>
            }
        </div>)
    }

    static propTypes = {
        value: PropTypes.string,
        editable: PropTypes.bool,
        status: PropTypes.string,
        onChange: PropTypes.func
    }
}

class EditSelect extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        editable: PropTypes.bool,
        status: PropTypes.string,
        onChange: PropTypes.func
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
        return (<div>
            {
                editable ?
                    <div>
                        <Select showSearch style={{ width: 200 }} placeholder="Select a person" optionFilterProp="children"
                          onChange={this.handleChange} >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </div> :
                    <div className="editable-row-text">
                        {value || ' '}
                    </div>
            }
        </div>)
    }
}
export default class Items extends React.Component {
    static propTypes = {
        params: PropTypes.object
    }
    constructor(props) {
        super(props)
        const { params: { id } } = props
        this.columns = [{
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text)
        }, {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            render: (text, record, index) => this.renderColumnsSelect(this.state.data, index, 'age', text)
        }, {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'address', text)
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const { editable } = this.state.data[index].name
                return (<div className="editable-row-operations">
                    {
                        editable ?
                            <span>
                                <a onClick={() => this.editDone(index, 'save')}>Save</a>
                                <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                                    <a>Cancel</a>
                                </Popconfirm>
                            </span> :
                            <span>
                                <a onClick={() => this.edit(index)}>Edit</a>
                            </span>
                    }
                    &nbsp;&nbsp;<span><a onClick={() => this.detail(index)}>detail</a></span></div>)
            }
        }]
        this.state = {
            data: [{
                key: '0',
                name: {
                    editable: false,
                    value: 'Edward King 0'
                },
                age: {
                    editable: false,
                    value: '32'
                },
                address: {
                    value: 'London, Park Lane no. 0'
                }
            }]
        }
    }

    renderColumns(data, index, key, text) {
        const { editable, status } = data[index][key]
        if (typeof editable === 'undefined') {
            return text
        }
        return (<EditableCell editable={editable} value={text} onChange={value => this.handleChange(key, index, value)} status={status} />)
    }

    renderColumnsSelect(data, index, key, text) {
        const { editable, status } = data[index][key]
        if (typeof editable === 'undefined') {
            return text
        }
        return (<EditSelect editable={editable} value={text} onChange={value => this.handleChange(key, index, value)} status={status} />)
    }

    handleChange(key, index, value) {
        const { data } = this.state
        data[index][key].value = value
        this.setState({ data })
    }

    edit(index) {
        const { data } = this.state
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true
            }
        })
        this.setState({ data })
    }
    detail(index) {
        browserHistory.push('/items/123')
    }
    editDone(index, type) {
        const { data } = this.state
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false
                data[index][item].status = type
            }
        })
        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status
                }
            })
        })
    }

    render() {
        const { data } = this.state
        const dataSource = data.map((item) => {
            const obj = {}
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value
            })
            return obj
        })
        const columns = this.columns
        return (
            <div>
                <Table bordered dataSource={dataSource} columns={columns} />
                <DatePicker />
                <div style={{ width: 319, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar fullscreen={false} value={moment()} />
                </div>
            </div>
        )
    }
}
/* export default class Items extends Component{
 constructor(props) {
 super(props)
 console.log(props)
 }

 componentDidMount(){
 this.props.fetchItems()
 }
 componentWillReceiveProps(){

 }
 render() {
 let {tableDate} = this.props.items
 //console.log(this.props)
 return (
 <Table columns={columns} dataSource={tableDate} />
 )
 }
 }

 Items.propTypes = {
 columns : React.PropTypes.array,
 data : React.PropTypes.array
 } */
