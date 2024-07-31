// Helper Functions
const getElement = (selector) => document.querySelector(selector)
const getElements = (selector) => document.querySelectorAll(selector)

// Header Control
class HeaderControl {
  constructor() {
    this.header = getElement("#header")
    this.links = Array.from(getElements("[data-link]"))
    this.refs = this.links.map(({ href }) => {
      const [, id] = href.split("#")
      return getElement(`#${id}`)
    })
    this.init()
  }

  init() {
    this.updateHeader()
    document.addEventListener("scroll", this.updateHeader.bind(this))
  }

  updateHeader() {
    const scrollY = window.scrollY
    const headerClasses = ["fixed", "bg-white", "border-b", "border-gray-200"]
    const headerClassToRemove = "absolute"

    if (scrollY >= 400 && this.header) {
      this.header.classList.add(...headerClasses)
      this.header.classList.remove(headerClassToRemove)
    } else {
      this.header.classList.remove(...headerClasses)
      this.header.classList.add(headerClassToRemove)
    }

    let current = ""
    for (const ref of this.refs) {
      const sectionTop = ref.offsetTop
      const sectionHeight = ref.clientHeight
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = ref.getAttribute("id")
      }
    }

    this.links.forEach((link) => {
      link.classList.remove("text-blue-500")
      link.classList.add("text-gray-700")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("text-blue-500")
        link.classList.remove("text-gray-700")
      }
    })
  }
}

// Menu Toggle
class MenuToggle {
  constructor() {
    this.menuToggle = getElement("#menu-toggle")
    this.menu = getElement("#menu")
    this.init()
  }

  init() {
    this.menuToggle.addEventListener("click", ({ currentTarget }) => {
      this.menu.classList.toggle("hidden")

      currentTarget.setAttribute(
        "aria-expanded",
        `${!this.menu.classList.contains("hidden")}`
      )
    })
  }
}

// Modal Control
class ModalControl {
  constructor() {
    this.showModalButton = getElement("#show-modal")
    this.closeModalButton = getElement("#close-modal")
    this.dialog = getElement(".dialog")
    this.init()
  }

  init() {
    this.showModalButton.addEventListener("click", () => {
      this.dialog.showModal()
      document.body.classList.add("overflow-hidden")
    })
    this.closeModalButton.addEventListener("click", this.closeModal.bind(this))

    this.dialog.addEventListener("click", (event) => {
      const dialogRect = this.dialog.getBoundingClientRect()
      if (
        event.clientX < dialogRect.left ||
        event.clientX > dialogRect.right ||
        event.clientY < dialogRect.top ||
        event.clientY > dialogRect.bottom
      ) {
        this.dialog.close()
      }
    })
  }

  closeModal() {
    this.dialog.close()
    document.body.classList.remove("overflow-hidden")
    const iframes = getElements("iframe")
    if (iframes.length > 0) {
      iframes.forEach((iframe) => {
        const src = iframe.src
        iframe.src = ""
        setTimeout(() => {
          iframe.src = src
        }, 200)
      })
    }
  }
}

// Accordion Control
class AccordionControl {
  constructor() {
    this.accordionItems = getElements(
      '[data-id="accordion"]  input[type="checkbox"]'
    )
    this.init()
  }

  init() {
    this.accordionItems.forEach((item) => {
      item.addEventListener("change", () => {
        this.accordionItems.forEach((i) => {
          if (i !== item) i.checked = false
        })
      })
    })
  }
}

// Carousel
class Carousel {
  _intervalId = null

  constructor({ selector = '[data-id="carousel"]', state = {} }) {
    this.element = getElement(selector)
    if (!this.element) return

    this.state = {
      active: "opacity-100",
      inactive: "opacity-50",
      ...state
    }
    this._currentIndex = 0
    this.init()
  }

  init() {
    this.bindEvents()
    this.bindAuto()
  }

  bindAuto() {
    if (this._intervalId) clearInterval(this._intervalId)
    this._intervalId = setInterval(() => {
      this._currentIndex++
      if (this._currentIndex >= this.items.length) this._currentIndex = 0
      this.control()
    }, 5000)
  }

  bindEvents() {
    this.actions.forEach((action, index) =>
      action.addEventListener("click", () => {
        this._currentIndex = index
        this.control()
      })
    )

    this.previousElement?.addEventListener("click", () => {
      this._currentIndex =
        (this._currentIndex - 1 + this.items.length) % this.items.length
      this.bindAuto()
      this.control()
    })

    this.nextElement?.addEventListener("click", () => {
      this._currentIndex = (this._currentIndex + 1) % this.items.length
      this.bindAuto()
      this.control()
    })
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
      btn.classList.toggle(this.state.active, btnIndex === this._currentIndex)
      btn.classList.toggle(this.state.inactive, btnIndex !== this._currentIndex)
    })
  }

  get items() {
    return this.element.querySelectorAll('[data-id="carousel-item"]')
  }

  get actions() {
    return this.element.querySelectorAll('[data-id="carousel-action"]')
  }

  get previousElement() {
    return this.element.querySelector('[data-id="carousel-previous"]')
  }

  get nextElement() {
    return this.element.querySelector('[data-id="carousel-next"]')
  }
}

// Form Control
class FormControl {
  constructor({
    selectorForm = "",
    selectorMessage = "",
    classToggle = "hidden"
  }) {
    this.formElement = getElement(selectorForm)
    this.formMessage = getElement(selectorMessage)
    this.classToggle = classToggle
    this.init()
  }

  init() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault()
      if (this.formElement.checkValidity()) {
        setTimeout(() => {
          this.formElement.classList.add(this.classToggle)
          this.formMessage.classList.remove(this.classToggle)
        }, 1000)
      }
    })
  }
}

// Instantiate Classes
new HeaderControl()
new MenuToggle()
new ModalControl()
new AccordionControl()

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

new FormControl({
  selectorForm: "#waiting-list",
  selectorMessage: "#waiting-list-message"
})
new FormControl({
  selectorForm: "#contact-form",
  selectorMessage: "#contact-form-message"
})
