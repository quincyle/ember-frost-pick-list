import Ember from 'ember'
const {A, Controller, inject} = Ember

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
  columns: A([
    {
      className: 'flex-l',
      label: 'Name',
      propertyName: 'name'
    },
    {
      className: 'flex-m',
      label: 'Milk',
      propertyName: 'milk'
    },
    {
      className: 'flex-m',
      label: 'Espresso',
      propertyName: 'espresso'
    },
    {
      className: 'flex-l',
      label: 'Other',
      propertyName: 'other'
    }
  ]),

  actions: {
    onSelectChange (selected) {
      // this.get('selectedItems').setObjects(selected)
      this.get('selectedItems').clear()
      this.get('selectedItems').pushObjects(selected)
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
