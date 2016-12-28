/**
 * Created by xwatson on 2016/12/28.
 */
import { connect } from 'react-redux'
import { fetchLogin } from '../modules/login'

import Login from '../components/Login'

const mapDispatchToProps = {
    singIn : (user) => fetchLogin(user)
}

const mapStateToProps = (state) => ({
    User : state.User
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
