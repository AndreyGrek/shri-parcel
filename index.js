import data from './data.json'

const params = new URLSearchParams(document.location.search);
const slide = params.get('slide') < 1 ? 1 :
              params.get('slide') > data.length ? 1 : params.get('slide')
const theme = params.get('theme') === 'light' ? 'light' : 'dark'

const selectedData = data.find((_, i) => i === +slide - 1)

document.title = selectedData.data.title

const body = document.querySelector('body')
body.classList.add(`theme_${theme || 'dark'}`)
body.innerHTML = window.renderTemplate(selectedData.alias, selectedData.data)
