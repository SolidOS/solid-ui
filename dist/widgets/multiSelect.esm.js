import { style as e } from "../lib/style_multiSelect.esm.js";
//#region src/widgets/multiSelect.js
var t = class {
	_data;
	_domElements;
	_event = () => {};
	_itemTemplate;
	_multiselect;
	_noData;
	_noResults;
	_options = [];
	_placeholder;
	_select;
	_selectContainer;
	_selectedOptions = [];
	_tagTemplate;
	_textField;
	_valueField;
	_cross = "\n    <svg\n      width=\"24\"\n      height=\"24\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        d=\"M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z\"\n        fill=\"currentColor\"\n      />\n    </svg>\n    ";
	constructor({ data: e, itemTemplate: t, noData: n, noResults: r, placeholder: i, select: a, container: o, tagTemplate: s, textField: c, valueField: l }) {
		this._data = e ?? [], this._itemTemplate = t ?? null, this._noData = n ?? "No data found.", this._noResults = r ?? "No results found.", this._placeholder = i ?? "Select...", this._select = a, this._selectContainer = o, this._tagTemplate = s ?? null, this._textField = c ?? null, this._valueField = l ?? null;
	}
	init() {
		if (this._select && this._select.nodeName === "SELECT") {
			if (this._itemTemplate && this._data.length === 0) throw Error("itemTemplate must be initialized with data from the component settings");
			if (this._tagTemplate && this._data.length === 0) throw Error("tagTemplate must be initialized with data from the component settings");
			this._options = this._data.length > 0 ? this._getDataFromSettings() : this._getDataFromSelectTag(), this._renderMultiselect(), this._renderOptionsList(), this._domElements = {
				clear: this._multiselect.querySelector(".multiselect__clear-btn"),
				input: this._multiselect.querySelector(".multiselect__input"),
				optionsContainer: this._multiselect.querySelector(".multiselect__options"),
				optionsContainerList: this._multiselect.querySelector(".multiselect__options > ul"),
				options: {
					list: this._multiselect.querySelectorAll(".multiselect__options > ul > li"),
					find: function(e) {
						for (let t = 0; t < this.list.length; t++) {
							let n = this.list[t];
							if (e(n)) return n;
						}
					},
					some: function(e) {
						for (let t = 0; t < this.list.length; t++) {
							let n = this.list[t];
							if (e(n, t)) return !0;
						}
						return !1;
					}
				}
			}, this._enableEventListenners(), this._initSelectedList();
		} else throw Error(`The selector '${this._select}' did not select any valid select tag.`);
	}
	subscribe(e) {
		if (typeof e == "function") this._event = e;
		else throw Error("parameter in the subscribe method is not a function");
	}
	_addOptionToList(t, n) {
		let r = `<span class="multiselect__selected" style="${e.multiselect__selected}" data-value="${t.value}">${this._tagTemplate ? this._processTemplate(this._tagTemplate, n) : t.text}<span class="multiselect__remove-btn" style="${e.multiselect__remove_btn}">${this._cross}</span></span>`;
		this._domElements.input.insertAdjacentHTML("beforebegin", r);
		let { lastElementChild: i } = this._multiselect.querySelector(`span[data-value="${t.value}"]`);
		i.addEventListener("click", () => {
			let e = this._domElements.options.find((e) => e.dataset.value === t.value);
			this._handleOption(e);
		});
	}
	_clearSelection() {
		for (let t = 0; t < this._selectedOptions.length; t++) {
			let n = this._selectedOptions[t], r = this._domElements.options.find((e) => e.dataset.value === n.value);
			r.classList.remove("multiselect__options--selected"), r.setAttribute("style", e.multiselect__options), this._removeOptionFromList(r.dataset.value);
		}
		this._selectedOptions = [], this._handleClearSelectionBtn(), this._handlePlaceholder(), this._dispatchEvent({
			action: "CLEAR_ALL_OPTIONS",
			selection: this._selectedOptions
		});
	}
	_closeList() {
		this._domElements.input.value = "", this._domElements.optionsContainer.classList.remove("visible"), this._domElements.optionsContainer.setAttribute("style", e.multiselect__options), this._filterOptions(""), this._removeAllArrowSelected();
	}
	_dispatchEvent(e) {
		this._event(e);
	}
	_enableEventListenners() {
		document.addEventListener("mouseup", ({ target: e }) => {
			this._multiselect.contains(e) || (this._filterOptions(""), this._closeList(), this._handlePlaceholder());
		}), this._domElements.clear.addEventListener("click", () => {
			this._clearSelection();
		});
		for (let e = 0; e < this._domElements.options.list.length; e++) this._domElements.options.list[e].addEventListener("click", ({ target: e }) => {
			this._handleOption(e), this._closeList();
		});
		this._domElements.input.addEventListener("focus", () => {
			this._domElements.optionsContainer.classList.add("visible"), this._domElements.optionsContainer.setAttribute("style", e.multiselect__options_visible);
		}), this._domElements.input.addEventListener("input", ({ target: { value: e } }) => {
			this._domElements.options.list.length > 0 && this._filterOptions(e);
		}), this._domElements.input.addEventListener("keydown", (e) => {
			this._handleArrows(e), this._handleBackspace(e), this._handleEnter(e);
		});
	}
	_filterOptions(t) {
		let n = this._domElements.optionsContainer.classList.contains("visible"), r = t.toLowerCase();
		if (!n && t.length > 0 && (this._domElements.optionsContainer.classList.add("visible"), this._domElements.optionsContainer.setAttribute("style", e.multiselect__options_visible)), this._domElements.options.list.length > 0) {
			for (let e = 0; e < this._domElements.options.list.length; e++) {
				let t = this._domElements.options.list[e];
				(this._itemTemplate ? this._data[e][this._textField] : t.textContent).toLowerCase().substring(0, r.length) === r ? this._domElements.optionsContainerList.appendChild(t) : t.parentNode && t.parentNode.removeChild(t);
			}
			let e = this._domElements.options.some((e, t) => (this._itemTemplate ? this._data[t][this._textField] : e.textContent).toLowerCase().substring(0, r.length) === r);
			this._showNoResults(!e);
		}
	}
	_generateId(e) {
		let t = "";
		for (let n = 0; n < e; n++) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
		return t;
	}
	_getDataFromSelectTag() {
		let e = [], { options: t } = this._select;
		for (let n = 0; n < t.length; n++) {
			let r = t[n];
			e.push({
				text: r.text,
				value: r.value,
				selected: r.hasAttribute("selected")
			});
		}
		return e;
	}
	_getDataFromSettings() {
		if (this._data.length > 0 && this._valueField && this._textField) {
			let e = typeof this._valueField == "string", t = typeof this._textField == "string", n = [];
			if (!e || !t) throw Error("textField and valueField must be of type string");
			for (let e = 0; e < this._data.length; e++) {
				let t = this._data[e];
				n.push({
					value: t[this._valueField],
					text: t[this._textField],
					selected: typeof t.selected == "boolean" && t.selected
				});
			}
			return n;
		} else return null;
	}
	_handleArrows(t) {
		if (t.keyCode === 40 || t.keyCode === 38) {
			t.preventDefault();
			let n = this._domElements.optionsContainer.classList.contains("visible"), r = this._multiselect.querySelector(".multiselect__options > ul");
			if (!n) this._domElements.optionsContainer.classList.add("visible"), this._domElements.optionsContainer.setAttribute("style", e.multiselect__options_visible), r.firstElementChild.classList.add("arrow-selected"), r.firstElementChild.setAttribute("style", e.multiselect__options_ul_li_arrow_selected), r.firstElementChild.scrollIntoView(!1);
			else {
				let n = this._multiselect.querySelector(".multiselect__options ul li.arrow-selected"), i = {
					ArrowUp: "previous",
					Up: "previous",
					ArrowDown: "next",
					Down: "next"
				};
				if (!n) {
					r.firstElementChild.classList.add("arrow-selected"), r.firstElementChild.setAttribute("style", e.multiselect__options_ul_li_arrow_selected), r.firstElementChild.scrollIntoView(!1);
					return;
				}
				if (n.classList.remove("arrow-selected"), n.setAttribute("style", e.multiselect__options_ul_li), n = n[i[t.key] + "ElementSibling"], !n) {
					n = r.children[i[t.key] === "next" ? 0 : r.children.length - 1], n.classList.add("arrow-selected"), n.setAttribute("style", e.multiselect__options_ul_li_arrow_selected), this._scrollIntoView(r, n);
					return;
				}
				n.classList.add("arrow-selected"), n.setAttribute("style", e.multiselect__options_ul_li_arrow_selected), this._scrollIntoView(r, n);
			}
		}
	}
	_handleBackspace(t) {
		if (t.keyCode === 8 && t.target.value === "") {
			let t = this._selectedOptions.length > 0 ? this._selectedOptions[this._selectedOptions.length - 1] : null;
			if (t) {
				let n = this._multiselect.querySelector(`li[data-value="${t.value}"]`);
				this._handleOption(n), this._selectedOptions.length === 0 && (this._domElements.optionsContainer.classList.remove("visible"), this._domElements.optionsContainer.setAttribute("style", e.multiselect__options));
			}
		}
	}
	_handleClearSelectionBtn() {
		this._selectedOptions.length > 0 ? this._domElements.clear.style.display = "flex" : this._domElements.clear.style.display = "none";
	}
	_handleEnter(e) {
		if (e.keyCode === 13) {
			let e = this._multiselect.querySelector(".multiselect__options ul li.arrow-selected");
			e && (this._handleOption(e), this._closeList());
		}
	}
	_handleOption(t, n = !0) {
		for (let r = 0; r < this._selectedOptions.length; r++) if (this._selectedOptions[r].value === t.dataset.value) return t.classList.remove("multiselect__options--selected"), t.setAttribute("style", e.multiselect__options), this._selectedOptions.splice(r, 1), this._removeOptionFromList(t.dataset.value), this._handleClearSelectionBtn(), this._handlePlaceholder(), n && this._dispatchEvent({
			action: "REMOVE_OPTION",
			value: t.dataset.value,
			selection: this._selectedOptions
		});
		for (let r = 0; r < this._options.length; r++) {
			let i = this._options[r];
			if (i.value === t.dataset.value) return t.classList.add("multiselect__options--selected"), t.setAttribute("style", e.multiselect__options_selected), this._selectedOptions = [...this._selectedOptions, i], this._addOptionToList(i, r), this._handleClearSelectionBtn(), this._handlePlaceholder(), n && this._dispatchEvent({
				action: "ADD_OPTION",
				value: t.dataset.value,
				selection: this._selectedOptions
			});
		}
	}
	_handlePlaceholder() {
		this._domElements.input.placeholder = this._placeholder;
	}
	_initSelectedList() {
		let t = !1;
		for (let n = 0; n < this._options.length; n++) {
			let r = this._options[n];
			if (r.selected) {
				t = !0;
				let i = this._domElements.options.find((e) => e.dataset.value === r.value);
				i.classList.add("multiselect__options--selected"), i.setAttribute("style", e.multiselect__options_selected), this._selectedOptions = [...this._selectedOptions, r], this._addOptionToList(r, n);
			}
		}
		t && this._handleClearSelectionBtn(), this._handlePlaceholder();
	}
	_processTemplate(e, t) {
		let n = e, r = e.match(/\$\{(\w+)\}/g).map((e) => e.replace(/\$\{|\}/g, ""));
		for (let e = 0; e < r.length; e++) {
			let i = r[e];
			n = n.replace(`\$\{${i}\}`, this._data[t][i] ?? "");
		}
		return n;
	}
	_removeAllArrowSelected() {
		let t = "arrow-selected", n = this._domElements.options.find((e) => e.classList.contains(t));
		n && n.classList.remove(t) && n.setAttribute("style", e.multiselect__options_ul_li);
	}
	_removeOptionFromList(e) {
		let t = this._multiselect.querySelector(`span[data-value="${e}"]`);
		t && t.parentNode && t.parentNode.removeChild(t);
	}
	_renderOptionsList() {
		let t = `
        <div class="multiselect__options" style="${e.multiselect__options}">
          <ul style="${e.multiselect__options_ul}">
          ${this._options.length > 0 && !this._itemTemplate ? this._options.map((t) => `
              <li data-value="${t.value}" style="${e.multiselect__options_ul_li}">${t.text}</li>
            `).join("") : ""}

          ${this._options.length > 0 && this._itemTemplate ? this._options.map((t, n) => `
              <li data-value="${t.value}" style="${e.multiselect__options_ul_li}">${this._processTemplate(this._itemTemplate, n)}</li>
            `).join("") : ""}
          ${this._showNoData(this._options.length === 0)}
          </ul>
        </div>
      `;
		this._multiselect.insertAdjacentHTML("beforeend", t);
	}
	_renderMultiselect() {
		this._select.style.display = "none";
		let t = "iconic-" + this._generateId(20);
		this._multiselect = document.createElement("div"), this._multiselect.setAttribute("id", t), this._multiselect.setAttribute("class", "multiselect__container"), this._multiselect.setAttribute("style", e.multiselect__container);
		let n = `
        <div class="multiselect__wrapper" style="${e.multiselect__wrapper}">
          <input class="multiselect__input" style="${e.multiselect__input}" placeholder="${this._placeholder}" />
        </div>
        <span style="display: none;" class="multiselect__clear-btn" style="${e.multiselect__clear_btn}">${this._cross}</span>
    `;
		this._multiselect.innerHTML = n, this._selectContainer.appendChild(this._multiselect);
	}
	_scrollIntoView(e, t) {
		let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
		n.top < r.bottom - t.offsetHeight || (e.scrollTop = t.clientHeight + (t.offsetTop - t.offsetHeight)), n.bottom > r.top + t.offsetHeight || (e.scrollTop = t.clientHeight + (t.offsetTop - t.offsetHeight) - (e.offsetHeight - (t.offsetHeight + (t.offsetHeight - t.clientHeight))));
	}
	_showNoData(t) {
		return t ? `<p class="multiselect__options--no-data" style="${e.multiselect__options_ul_p_multiselect__options_no_data}">${this._noData}</p>` : "";
	}
	_showNoResults(t) {
		let n = this._multiselect.querySelector(".multiselect__options--no-results");
		if (t) {
			let t = `<p class="multiselect__options--no-results" style="${e.multiselect__options_ul_p_multiselect__options_no_results}">${this._noResults}</p>`;
			!n && this._domElements.optionsContainerList.insertAdjacentHTML("beforeend", t);
		} else n && n.parentNode && n.parentNode.removeChild(n);
	}
};
//#endregion
export { t as IconicMultiSelect };

//# sourceMappingURL=multiSelect.esm.js.map