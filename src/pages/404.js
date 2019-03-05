
import * as React from 'react'
import { Link } from 'react-router-dom'
import Exception from 'ant-design-pro/lib/Exception'

export default () => {
  const actions = (
    <div>
      返回
      <Link to="/">首页</Link>
    </div>
  )
  return <Exception type="404" actions={actions} />
}
