const links = document.querySelectorAll("[data-link]")
const refs = [...links].map(({ href }) => {
  const [_, id] = href.split("#")

  return document.querySelector(`#${id}`)
})

// header
const header = document.querySelector("#header")
function headerControl() {
  let current = ""

  if (window.scrollY >= 400 && header) {
    header.classList.add("fixed")
    header.classList.add("bg-white")
    header.classList.add("border-b")
    header.classList.add("border-gray-200")
    header.classList.remove("absolute")
  } else {
    header.classList.remove("fixed")
    header.classList.remove("bg-white")
    header.classList.remove("border-b")
    header.classList.remove("border-gray-200")
    header.classList.add("absolute")
  }

  refs.forEach((ref) => {
    const sectionTop = ref.offsetTop
    const sectionHeight = ref.clientHeight
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = ref.getAttribute("id")
    }
  })

  links.forEach((link) => {
    link.classList.remove("text-blue-500")
    link.classList.add("text-gray-700")

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("text-blue-500")
      link.classList.remove("text-gray-700")
    }
  })
}
headerControl()
document.addEventListener("scroll", headerControl)

// menu header
const menuToggle = document.querySelector("#menu-toggle")
const menu = document.querySelector("#menu")

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden")
})

// modal
const showModalButton = document.querySelector("#show-modal")
const closeModalButton = document.querySelector("#close-modal")
const dialog = document.querySelector(".dialog")

showModalButton.addEventListener("click", () => {
  dialog.showModal()
  player = document.querySelector(".video-stream")
})

closeModalButton.addEventListener("click", () => {
  dialog.close()

  const iframes = document.querySelectorAll("iframe")
  if (iframes.length > 0)
    for (const iframe of iframes) {
      const src = iframe.src
      iframe.src = ""

      const timeoutId = setTimeout(() => {
        iframe.src = src
        clearTimeout(timeoutId)
      }, 200)
    }
})

// accordion
const accordionItemsSelector = '[data-id="accordion"]  input[type="checkbox"]'
const accordionItems = document.querySelectorAll(accordionItemsSelector)

for (const accordionItem of accordionItems)
  accordionItem.addEventListener("change", () => {
    accordionItems.forEach((item) => {
      if (item !== accordionItem) item.checked = false
    })
  })

// TODO: terminar a lógica do carousel para ser dinâmico
// carousel
class Carousel {
  _element = null
  _currentIndex = 0
  _state = { active: "opacity-100", inactive: "opacity-50" }

  constructor({ selector = '[data-id="carousel"]', state }) {
    const element = document.querySelector(selector)
    if (!element) return

    this._element = element
    this._state = {
      ...this._state,
      ...state
    }

    this.init()
  }

  init() {
    this.actions.forEach((action, index) =>
      action.addEventListener("click", () => {
        this._currentIndex = index
        this.control()
      })
    )

    this.previous?.addEventListener("click", () => {
      this._currentIndex -= 1

      if (this._currentIndex < 0) this._currentIndex = this.items.length - 1

      this.control()
    })

    const next = () => {
      this._currentIndex += 1

      if (this._currentIndex >= this.items.length) this._currentIndex = 0

      this.control()
    }

    this.next?.addEventListener("click", next)

    setInterval(next, 10000)
  }

  control() {
    const translateX = -(
      100 * this._currentIndex +
      ((32 * this._currentIndex) / this.items[this._currentIndex].clientWidth) *
        100
    )
    this.items.forEach((item) => {
      item.style.transform = `translateX(${translateX}%)`
    })
    this.actions.forEach((btn, btnIndex) => {
      if (btnIndex === this._currentIndex) {
        btn.classList.remove(this._state.inactive)
        btn.classList.add(this._state.active)
      } else {
        btn.classList.add(this._state.inactive)
        btn.classList.remove(this._state.active)
      }
    })
  }

  get items() {
    return this._element.querySelectorAll('[data-id="carousel-item"]')
  }

  get actions() {
    return this._element.querySelectorAll('[data-id="carousel-action"]')
  }

  get previous() {
    return this._element.querySelector('[data-id="carousel-previous"]')
  }

  get next() {
    return this._element.querySelector('[data-id="carousel-next"]')
  }
}

new Carousel({
  selector: "#showcase"
})

new Carousel({
  selector: "#testimonials",
  state: {
    active: "bg-blue-500",
    inactive: "bg-gray-300"
  }
})

const waitingListForm = document.querySelector("#waiting-list")
const waitingListMessage = document.querySelector("#waiting-list-message")
waitingListForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const timeoutId = setTimeout(() => {
    waitingListForm.classList.add("hidden")
    waitingListMessage.classList.remove("hidden")
    clearTimeout(timeoutId)
  }, 1000)
})

const contactForm = document.querySelector("#contact-form")
const contactMessage = document.querySelector("#contact-form-message")
contactForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const timeoutId = setTimeout(() => {
    contactForm.classList.add("hidden")
    contactMessage.classList.remove("hidden")
    clearTimeout(timeoutId)
  }, 1000)
})
