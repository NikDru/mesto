export default class Form {
  constructor(formSelector, handleSubmit, filled, fillBy) {
    this._form = document.querySelector(formSelector);
    this._handleSubmit = handleSubmit;
    this._bindedSubmitHandler = this._handleSubmitEvent.bind(this);
    if (filled) {
      this.setInputValues(fillBy);
    }
    this._setEventListeners();
  }

  setInputValues({userName, userAbout}) {
    const inputs = Array.from(this._form.querySelectorAll('input'));
    inputs.forEach((input) => {
      if (input.name.indexOf('name') > -1) {
        input.value = userName;
      }
      if (input.name.indexOf('input') > -1 && input.name.indexOf('name') === -1) {
        input.value = userAbout;
      }
    });
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll('input'));
    inputs.forEach((input) => {
      if (input.name.indexOf('name') > -1) {
        this._inputName = input.value;
        console.log(input.value);
        console.log(this);
        console.log(input.value);
      }
      if (input.name.indexOf('input') > -1 && input.name.indexOf('name') === -1) {
        this._inputExtra = input.value;
      }
    });
  }

  _handleSubmitEvent(evt) {
    evt.preventDefault();
    this._getInputValues();
    this._handleSubmit(this._inputName, this._inputExtra);
    this.cleanForm();
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this._bindedSubmitHandler);
  }

  _deleteEventListeners() {
    this._form.removeEventListener('submit', this._bindedSubmitHandler);
  }

  cleanForm() {
    this._deleteEventListeners();
    this._form.reset();
  }
}
