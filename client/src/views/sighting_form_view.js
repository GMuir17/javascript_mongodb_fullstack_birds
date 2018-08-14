const PubSub = require('../helpers/pub_sub.js')

const SightingFormView = function (form) {
  this.form = form;
};

SightingFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

SightingFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const newSighting = createSighting(evt.target);
  PubSub.publish(`SightingFormView:new-sighting`, newSighting);
  evt.target.reset();
};

module.exports = SightingFormView;

function createSighting(details) {
  return {
    species: details.species.value,
    location: details.location.value,
    date: details.date.value
  };
}
