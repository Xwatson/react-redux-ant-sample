/**
 * Created by xwatson on 2016/12/9.
 */
import { connect } from 'react-redux'
import { fetchItems } from '../modules/items'

import Items from '../components/Items'

const mapDispatchToProps = {
    fetchItems : () => fetchItems()
}

const mapStateToProps = (state) => ({
    items : state.items
})

export default connect(mapStateToProps, mapDispatchToProps)(Items)
