import './loading.css'

const doc = window.document
const $body = doc.body || doc.head
const $loading = doc.createElement('div')
$loading.classList.add('loader-over')
// $loading.innerHTML = `<div class="logo">
//                           <div class="white"></div>
//                           <div class="orange"></div>
//                           <div class="red"></div>
//                       </div>`
$loading.innerHTML = `<mu-circular-progress :size="60" :strokeWidth="5"/>`

const Loading = {
  show() {
    try {
      $body.appendChild($loading)
    } catch (e) {
    }
  },
  hide() {
    try {
      if ($loading.parentNode === $body) {
        $body.removeChild($loading)
      }
    } catch (e) {
    }
  }
}

export default Loading
