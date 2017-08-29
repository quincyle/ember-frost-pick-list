import Ember from 'ember'
const {Controller, A} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {sort} from 'ember-frost-sort'

export default Controller.extend({
  // BEGIN-SNIPPET pick-list-controller-list
  selectedItems: A([]),
  expandedItems: A([]),
  sortOrder: ['name'],
  sortingProperties: [
    {label: 'Name', value: 'name'},
    {label: 'Milk', value: 'milk'},
    {label: 'Espresso', value: 'espresso'},
    {label: 'Other', value: 'other'}
  ],

  actions: {
    onSelectionChange (selected) {
      this.get('selectedItems').setObjects(selected)
    },
    onExpansionChange (expandedItems) {
      this.get('expandedItems').setObjects(expandedItems)
    }
  }
  //END-SNIPPET
})
