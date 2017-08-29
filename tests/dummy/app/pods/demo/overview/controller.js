import Ember from 'ember'
const {Controller, A, inject} = Ember

export default Controller.extend({
  notifications: inject.service('notification-messages'),
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
      if (selected.length > 0) {
        this.get('notifications').success(selected.getEach('name'), {
          autoClear: true,
          clearDuration: 2000
        })
      } else {
        this.get('notifications').success('Nothing selected', {
          autoClear: true,
          clearDuration: 2000
        })
      }
    }
  }
})
