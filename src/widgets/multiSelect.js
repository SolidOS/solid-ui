/*
 * IconicMultiSelect v0.7.0
 * Licence:  MIT
 * (c) 2021 Sidney Wimart.
 * repo & configuration: https://github.com/sidneywm/iconic-multiselect
 */

/**
 * @version IconicMultiSelect v0.7.0
 * @licence  MIT
 */

export class IconicMultiSelect {
  _data
  _domElements
  _event = () => {}
  _itemTemplate
  _multiselect
  _noData
  _noResults
  _options = []
  _placeholder
  _select
  _selectContainer
  _selectedOptions = []
  _tagTemplate
  _textField
  _valueField
  _cross = `
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
        fill="currentColor"
      />
    </svg>
    `

  /**
   * Iconic Multiselect constructor.
   * @param { Object[] } data - Array of objects.
   * @param { string } noData - Defines the message when there is no data input.
   * @param { string } noResults - Defines the message when there is no result if options are filtered.
   * @param { string } placeholder -  Defines the placeholder's text.
   * @param { string } select - DOM element to be selected. It must be a HTML Select tag - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   * @param { string } textField - Field to select in the object for the text.
   * @param { string } valueField - Field to select in the object for the value.
   */
  constructor ({ data, itemTemplate, noData, noResults, placeholder, select, container, tagTemplate, textField, valueField }) {
    this._data = data ?? []
    this._itemTemplate = itemTemplate ?? null
    this._noData = noData ?? 'No data found.'
    this._noResults = noResults ?? 'No results found.'
    this._placeholder = placeholder ?? 'Select...'
    this._select = select
    // Timea added a container here
    this._selectContainer = container
    this._tagTemplate = tagTemplate ?? null
    this._textField = textField ?? null
    this._valueField = valueField ?? null
  }

  /**
   * Initialize the Iconic Multiselect component.
   * @public
   */
    init() {
    // Timea change to use this._select instead of this._selectContainer
    if (this._select && this._select.nodeName === 'SELECT') {
      if (this._itemTemplate && this._data.length === 0) { throw new Error('itemTemplate must be initialized with data from the component settings') }
      if (this._tagTemplate && this._data.length === 0) { throw new Error('tagTemplate must be initialized with data from the component settings') }

      this._options = this._data.length > 0 ? this._getDataFromSettings() : this._getDataFromSelectTag()

      this._renderMultiselect()
      this._renderOptionsList()

      this._domElements = {
        clear: this._multiselect.querySelector('.multiselect__clear-btn'),
        input: this._multiselect.querySelector('.multiselect__input'),
        optionsContainer: this._multiselect.querySelector('.multiselect__options'),
        optionsContainerList: this._multiselect.querySelector('.multiselect__options > ul'),
        options: {
          list: this._multiselect.querySelectorAll('.multiselect__options > ul > li'),
          find: function (callbackFn) {
            for (let i = 0; i < this.list.length; i++) {
              const node = this.list[i]
              if (callbackFn(node)) return node
            }
            return undefined
          },
          some: function (callbackFn) {
            for (let i = 0; i < this.list.length; i++) {
              const node = this.list[i]
              if (callbackFn(node, i)) return true
            }
            return false
          }
        }
      }

      this._enableEventListenners()
      this._initSelectedList()
    } else {
      throw new Error(`The selector '${this._select}' did not select any valid select tag.`)
    }
  }

  /**
   * Subscribes to the emitted events.
   * @param { Function } callback - Callback function which emits a custom event object.
   * @public
   */
  subscribe (callback) {
    if (typeof callback === 'function') {
      this._event = callback
    } else {
      throw new Error('parameter in the subscribe method is not a function')
    }
  }

  /**
   * Add an option to the selection list.
   * @param { Object: { text: string; value: string; }} option
   * @private
   */
  _addOptionToList (option, index) {
    const html = `<span class="multiselect__selected" data-value="${option.value}">${
      this._tagTemplate ? this._processTemplate(this._tagTemplate, index) : option.text
    }<span class="multiselect__remove-btn">${this._cross}</span></span>`

    this._domElements.input.insertAdjacentHTML('beforebegin', html)

    const { lastElementChild: removeBtn } = this._multiselect.querySelector(`span[data-value="${option.value}"]`)
    removeBtn.addEventListener('click', () => {
      const target = this._domElements.options.find((el) => el.dataset.value == option.value)
      this._handleOption(target)
    })
  }

  /**
   * Clears all selected options.
   * @private
   */
  _clearSelection () {
    for (let i = 0; i < this._selectedOptions.length; i++) {
      const option = this._selectedOptions[i]
      const target = this._domElements.options.find((el) => el.dataset.value == option.value)
      target.classList.remove('multiselect__options--selected')
      this._removeOptionFromList(target.dataset.value)
    }
    this._selectedOptions = []
    this._handleClearSelectionBtn()
    this._handlePlaceholder()
    this._dispatchEvent({
      action: 'CLEAR_ALL_OPTIONS',
      selection: this._selectedOptions
    })
  }

  /**
   * Close the options container.
   * @private
   */
  _closeList () {
    this._domElements.input.value = ''
    this._domElements.optionsContainer.classList.remove('visible')
    this._filterOptions('')
    this._removeAllArrowSelected()
  }

  /**
   * Dispatches new events.
   * @param { object : { action: string; selection: { option: string; text: string; }[]; value?: string; } } event
   * @private
   */
  _dispatchEvent (event) {
    this._event(event)
  }

  /**
   * Enables all main event listenners.
   * @private
   */
  _enableEventListenners () {
    document.addEventListener('mouseup', ({ target }) => {
      if (!this._multiselect.contains(target)) {
        this._filterOptions('')
        this._closeList()
        this._handlePlaceholder()
      }
    })

    this._domElements.clear.addEventListener('click', () => {
      this._clearSelection()
    })

    for (let i = 0; i < this._domElements.options.list.length; i++) {
      const option = this._domElements.options.list[i]
      option.addEventListener('click', ({ target }) => {
        this._handleOption(target)
        this._closeList()
      })
    }

    this._domElements.input.addEventListener('focus', () => {
      this._domElements.optionsContainer.classList.add('visible')
      this._domElements.input.placeholder = ''
    })

    this._domElements.input.addEventListener('input', ({ target: { value } }) => {
      if (this._domElements.options.list.length > 0) {
        this._filterOptions(value)
      }
    })

    this._domElements.input.addEventListener('keydown', (e) => {
      this._handleArrows(e)
      this._handleBackspace(e)
      this._handleEnter(e)
    })
  }

  /**
   * Filters user input.
   * @param { string } value
   * @private
   */
  _filterOptions (value) {
    const isOpen = this._domElements.optionsContainer.classList.contains('visible')
    const valueLowerCase = value.toLowerCase()

    if (!isOpen && value.length > 0) {
      this._domElements.optionsContainer.classList.add('visible')
    }

    if (this._domElements.options.list.length > 0) {
      for (let i = 0; i < this._domElements.options.list.length; i++) {
        const el = this._domElements.options.list[i]
        const text = this._itemTemplate ? this._data[i][this._textField] : el.textContent

        if (text.toLowerCase().substring(0, valueLowerCase.length) === valueLowerCase) {
          this._domElements.optionsContainerList.appendChild(el)
        } else {
          el.parentNode && el.parentNode.removeChild(el)
        }
      }

      const hasResults = this._domElements.options.some(
        (el, index) =>
          (this._itemTemplate ? this._data[index][this._textField] : el.textContent)
            .toLowerCase()
            .substring(0, valueLowerCase.length) === valueLowerCase
      )
      this._showNoResults(!hasResults)
    }
  }

  _generateId (length) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  /**
   * Gets data from select tag.
   * @private
   */
  _getDataFromSelectTag () {
    const arr = []
    const { options } = this._select
    for (let i = 0; i < options.length; i++) {
      const item = options[i]
      arr.push({
        text: item.text,
        value: item.value,
        selected: item.hasAttribute('selected')
      })
    }
    return arr
  }

  /**
   * Gets data from settings.
   * @private
   */
  _getDataFromSettings () {
    if (this._data.length > 0 && this._valueField && this._textField) {
      const isValueFieldValid = typeof this._valueField === 'string'
      const isTextFieldValid = typeof this._textField === 'string'
      const arr = []

      if (!isValueFieldValid || !isTextFieldValid) {
        throw new Error('textField and valueField must be of type string')
      }

      for (let i = 0; i < this._data.length; i++) {
        const item = this._data[i]
        arr.push({
          value: item[this._valueField],
          text: item[this._textField],
          selected: typeof item.selected === 'boolean' ? item.selected : false
        })
      }
      return arr
    } else {
      return null
    }
  }

  /**
   * Handles Arrow up & Down. Selection of an option is also possible with these keys.
   * @param { Event } event
   * @private
   */
  _handleArrows (event) {
    if (event.keyCode === 40 || event.keyCode === 38) {
      event.preventDefault()
      const isOpen = this._domElements.optionsContainer.classList.contains('visible')
      // An updated view of the container is needed because of the filtering option
      const optionsContainerList = this._multiselect.querySelector('.multiselect__options > ul')

      if (!isOpen) {
        this._domElements.optionsContainer.classList.add('visible')
        optionsContainerList.firstElementChild.classList.add('arrow-selected')
        optionsContainerList.firstElementChild.scrollIntoView(false)
      } else {
        let selected = this._multiselect.querySelector('.multiselect__options ul li.arrow-selected')
        const action = {
          ArrowUp: 'previous',
          Up: 'previous',
          ArrowDown: 'next',
          Down: 'next'
        }

        if (!selected) {
          optionsContainerList.firstElementChild.classList.add('arrow-selected')
          optionsContainerList.firstElementChild.scrollIntoView(false)
          return
        }

        selected.classList.remove('arrow-selected')

        selected = selected[action[event.key] + 'ElementSibling']

        // Go to start or end of the popup list
        if (!selected) {
          selected =
            optionsContainerList.children[action[event.key] === 'next' ? 0 : optionsContainerList.children.length - 1]
          selected.classList.add('arrow-selected')
          this._scrollIntoView(optionsContainerList, selected)
          return
        }

        selected.classList.add('arrow-selected')
        this._scrollIntoView(optionsContainerList, selected)
      }
    }
  }

  /**
   * Handles the backspace key event - Deletes the preceding option in the selection list.
   * @param { Event } e
   * @private
   */
  _handleBackspace (e) {
    if (e.keyCode === 8 && e.target.value === '') {
      const lastSelectedOption =
        this._selectedOptions.length > 0 ? this._selectedOptions[this._selectedOptions.length - 1] : null

      if (lastSelectedOption) {
        const targetLastSelectedOption = this._multiselect.querySelector(
          `li[data-value="${lastSelectedOption.value}"]`
        )
        this._handleOption(targetLastSelectedOption)

        if (this._selectedOptions.length === 0) {
          this._domElements.optionsContainer.classList.remove('visible')
        }
      }
    }
  }

  /**
   * Shows clear selection button if some options are selected.
   * @private
   */
  _handleClearSelectionBtn () {
    if (this._selectedOptions.length > 0) {
      this._domElements.clear.style.display = 'flex'
    } else {
      this._domElements.clear.style.display = 'none'
    }
  }

  /**
   * Handles the enter key event.
   * @param { Event } event
   * @private
   */
  _handleEnter (event) {
    if (event.keyCode === 13) {
      const selected = this._multiselect.querySelector('.multiselect__options ul li.arrow-selected')
      if (selected) {
        this._handleOption(selected)
        this._closeList()
      }
    }
  }

  _handleOption (target, dispatchEvent = true) {
    // Remove
    for (let i = 0; i < this._selectedOptions.length; i++) {
      const el = this._selectedOptions[i]
      if (el.value == target.dataset.value) {
        target.classList.remove('multiselect__options--selected')
        this._selectedOptions.splice(i, 1)
        this._removeOptionFromList(target.dataset.value)
        this._handleClearSelectionBtn()
        this._handlePlaceholder()

        return (
          dispatchEvent &&
          this._dispatchEvent({
            action: 'REMOVE_OPTION',
            value: target.dataset.value,
            selection: this._selectedOptions
          })
        )
      }
    }

    // Add
    for (let i = 0; i < this._options.length; i++) {
      const option = this._options[i]
      if (option.value == target.dataset.value) {
        target.classList.add('multiselect__options--selected')
        this._selectedOptions = [...this._selectedOptions, option]
        this._addOptionToList(option, i)
        this._handleClearSelectionBtn()
        this._handlePlaceholder()

        return (
          dispatchEvent &&
          this._dispatchEvent({
            action: 'ADD_OPTION',
            value: target.dataset.value,
            selection: this._selectedOptions
          })
        )
      }
    }
  }

  /**
   * Shows the placeholder if no options are selected.
   * @private
   */
  _handlePlaceholder () {
    if (this._selectedOptions.length > 0) {
      this._domElements.input.placeholder = ''
    } else {
      this._domElements.input.placeholder = this._placeholder
    }
  }

  _initSelectedList () {
    let hasItemsSelected = false

    for (let i = 0; i < this._options.length; i++) {
      const option = this._options[i]
      if (option.selected) {
        hasItemsSelected = true
        const target = this._domElements.options.find((el) => el.dataset.value == option.value)
        target.classList.add('multiselect__options--selected')
        this._selectedOptions = [...this._selectedOptions, option]
        this._addOptionToList(option, i)
      }
    }

    if (hasItemsSelected) { this._handleClearSelectionBtn() }
    this._handlePlaceholder()
  }

  /**
   * Process the custom template.
   * @param { string } template
   * @private
   */
  _processTemplate (template, index) {
    let processedTemplate = template
    const objAttr = template.match(/\$\{(\w+)\}/g).map((e) => e.replace(/\$\{|\}/g, ''))

    for (let i = 0; i < objAttr.length; i++) {
      const attr = objAttr[i]
      processedTemplate = processedTemplate.replace(`\$\{${attr}\}`, this._data[index][attr] ?? '')
    }

    return processedTemplate
  }

  _removeAllArrowSelected () {
    const className = 'arrow-selected'
    const target = this._domElements.options.find((el) => el.classList.contains(className))
    target && target.classList.remove(className)
  }

  /**
   * Removes an option from the list.
   * @param { string } value
   * @private
   */
  _removeOptionFromList (value) {
    const optionDom = this._multiselect.querySelector(`span[data-value="${value}"]`)
    optionDom && optionDom.parentNode && optionDom.parentNode.removeChild(optionDom)
  }

  /**
   * Renders the multiselect options list view.
   * @private
   */
  _renderOptionsList () {
    const html = `
        <div class="multiselect__options">
          <ul>
          ${
            this._options.length > 0 && !this._itemTemplate
              ? this._options
                  .map((option) => {
                    return `
              <li data-value="${option.value}">${option.text}</li>
            `
                  })
                  .join('')
              : ''
          }

          ${
            this._options.length > 0 && this._itemTemplate
              ? this._options
                  .map((option, index) => {
                    return `
              <li data-value="${option.value}">${this._processTemplate(this._itemTemplate, index)}</li>
            `
                  })
                  .join('')
              : ''
          }
          ${this._showNoData(this._options.length === 0)}
          </ul>
        </div>
      `

    this._multiselect.insertAdjacentHTML('beforeend', html)
  }

  /**
   * Renders the multiselect view.
   * @private
   */
  _renderMultiselect () {
    this._select.style.display = 'none'
    const id = 'iconic-' + this._generateId(20)
    // Timea created dedicated div element because previous code was not rendering
    this._multiselect = document.createElement('div')
    this._multiselect.setAttribute('id', id)
    this._multiselect.setAttribute('class', 'multiselect__container')
    const html = `
        <div class="multiselect__wrapper">
          <input class="multiselect__input" placeholder="${this._placeholder}" />
        </div>
        <span style="display: none;" class="multiselect__clear-btn">${this._cross}</span>
    `
    this._multiselect.innerHTML = html
    this._selectContainer.appendChild(this._multiselect)
  }

  /**
   * ScrollIntoView - This small utility reproduces the behavior of .scrollIntoView({ block: "nearest", inline: "nearest" })
   * This is for IE compatibility without a need of a polyfill
   * @private
   */
  _scrollIntoView (parent, child) {
    const rectParent = parent.getBoundingClientRect()
    const rectChild = child.getBoundingClientRect()

    // Detect if not visible at top and then scroll to the top
    if (!(rectParent.top < rectChild.bottom - child.offsetHeight)) {
      parent.scrollTop = child.clientHeight + (child.offsetTop - child.offsetHeight)
    }

    // Detect if not visible at bottom and then scroll to the bottom
    if (!(rectParent.bottom > rectChild.top + child.offsetHeight)) {
      parent.scrollTop =
        child.clientHeight +
        (child.offsetTop - child.offsetHeight) -
        (parent.offsetHeight - (child.offsetHeight + (child.offsetHeight - child.clientHeight)))
    }
  }

  /**
   * Shows a no data message.
   * @param { boolean } condition
   * @private
   */
  _showNoData (condition) {
    return condition ? `<p class="multiselect__options--no-data">${this._noData}</p>` : ''
  }

  /**
   * Shows a no results message.
   * @param { boolean } condition
   * @private
   */
  _showNoResults (condition) {
    const dom = this._multiselect.querySelector('.multiselect__options--no-results')
    if (condition) {
      const html = `<p class="multiselect__options--no-results">${this._noResults}</p>`
      !dom && this._domElements.optionsContainerList.insertAdjacentHTML('beforeend', html)
    } else {
      dom && dom.parentNode && dom.parentNode.removeChild(dom)
    }
  }
}
