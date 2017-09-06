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
  columns: A([
    {
      className:'flex-l',
      label:'Name',
      propertyName:'name'
    },
    {
      className:'flex-m',
      label:'Milk',
      propertyName:'milk'
    },
    {
      className:'flex-m',
      label:'Espresso',
      propertyName:'espresso'
    },
    {
      className:'flex-l',
      label:'Other',
      propertyName:'other'
    }
  ]),

  actions: {
    onSelectChange (selected) {
      this.get('selectedItems').setObjects(selected)
    }
  }
  // END-SNIPPET
})
