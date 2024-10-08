import Vue from 'vue';
import VueI18n from 'vue-i18n'

import locale from 'element-ui/lib/locale';

//element-ui自带多语言配置
import chLocale from 'element-ui/lib/locale/lang/zh-CN';
import enLocale from 'element-ui/lib/locale/lang/en';

// es6写法
import ch from './ch.ts'
import en from './en.ts'

const messages = {
  en:{
    ...en,
    ...enLocale
  },
  ch:{
    ...ch,
    ...chLocale
  }
}
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ch',		//默认显示的语言 
  messages,
  silentTranslationWarn: true,
})
locale.i18n((key, value) => i18n.t(key, value))
export default i18n; 