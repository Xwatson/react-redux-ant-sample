import appLocaleData from 'react-intl/locale-data/zh'
import zhMessages from '../../locales/zh.json'

const appLocale = {
    messages: {
        ...zhMessages
    },
    antd: null,
    locale: 'zh-CN',
    data: appLocaleData
}

export default appLocale
