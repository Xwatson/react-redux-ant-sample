import qs from 'qs'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

function addQuery(h) {
  const { location } = h
  h.location = { ...location, query: qs.parse(location.search, { ignoreQueryPrefix: true }) }
}
addQuery(history)

export const unlisten = history.listen(() => {
  addQuery(history)
})

export default history
