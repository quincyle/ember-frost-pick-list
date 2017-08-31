import Ember from 'ember'
const {A, Controller} = Ember

export default Controller.extend({
  // BEGIN-SNIPPET pick-list-controller
  selectedItems: A([]),
  sortOrder: ['name'],
  sortingProperties: [
    {label: 'Name', value: 'name'},
    {label: 'Milk', value: 'milk'},
    {label: 'Espresso', value: 'espresso'},
    {label: 'Other', value: 'other'}
  ],

  actions: {
    onSelectChange (selected) {
      this.get('selectedItems').setObjects(selected)
    }
  }
  // END-SNIPPET
})
