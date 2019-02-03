import Component from "../../component.js";

let debounce = _.debounce;

const QUERT_CHANGE_DELAY = 500;

export default class Filter extends Component {
  constructor({ element }) {
    super({ element });
    this._render();

    this._queryField = this._element.querySelector(
      '[data-element="query-field"]'
    );
    this._orderField = this._element.querySelector(
      '[data-element="order-field"]'
    );

    this.on("change", "order-field", () => {
      this.emit("order-changed");
    });

    const emitQueryChangeWithDebounce = debounce(() => {
      this.emit("query-changed");
    }, QUERT_CHANGE_DELAY);

    this.on("input", "query-field", emitQueryChangeWithDebounce);
	}
	
	getCurrentData() {
		return {
			query: this._queryField.value,
			sortBy: this._orderField.value,
		}
	}

  _render() {
    this._element.innerHTML = `
		<p>
			Search:
			<input data-element="query-field">
		</p>

		<p>
			Sort by:
			<select data-element="order-field">
				<option value="name">Alphabetical</option>
				<option value="age">Newest</option>
			</select>
		</p>
        `;
  }
}
