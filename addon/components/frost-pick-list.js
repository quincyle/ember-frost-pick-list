import Ember from 'ember'
const {A, Component, copy} = Ember
import {sort} from 'ember-frost-sort'
import computed, {readOnly} from 'ember-computed-decorators'
import layout from '../templates/components/frost-pick-list'
import {PropTypes} from 'ember-prop-types'
import {ItemsPropType} from 'ember-frost-table/typedefs'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Properties ============================================================

  classNames: ['frost-pick-list'],
  selectedItems: A([]),
  itemsCached: A([]),
  inputFilter: '',
  onlySelected: false,
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    listComponent: PropTypes.object.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.arrayOf(PropTypes.object),
    sortOrder: PropTypes.arrayOf(PropTypes.string),
    sortingProperties: PropTypes.arrayOf(PropTypes.object),
    sortOrderMax: PropTypes.number
  },

  getDefaultProps () {
    return {
      // options
      items: A([]),
      sortOrder: A([]),
      selectedItems: A([]),
      sortingProperties: A([]),
      sortOrderMax: 1
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('onlySelected')
  /**
   * show all record or just selected
   * @param {Boolean} onlySelected - should show only selected?
   * @returns {Boolean} should show only selected?
   */
  onlySelectedComputed (onlySelected) {
    return {
      all: onlySelected ? 'tertiary' : 'primary',
      selected: onlySelected ? 'primary' : 'tertiary',
    }
  },

  @readOnly
  @computed('items.[]', 'selectedItems.[]')
  /**
   * Show amount of visible data
   * @param {Array} items - all items
   * @param {Array} selectedItems - all selected items
   * @returns {String} the sub title
   */
  subTitle (items, selectedItems) {
    let total = this.get('itemsCached').length
    let amtSelected = selectedItems ? selectedItems.length : 0

    return 'Showing ' + items.length + ' ' +
      'of ' + total + ' (' + amtSelected + ' ' + 'selected)'
  },

  // == Functions =============================================================

  init () {
    this._super(...arguments)
    this.get('itemsCached').setObjects(copy(this.get('items')))
    this.processItems('itemsCached')
  },

  processItems (itemsToProcess) {
    let items = sort(this.filterItems(this.get(itemsToProcess)), this.get('sortOrder'))
    this.get('items').setObjects(items)
  },

  filterItems (items) {
    return items.filter((item) => {
      let allKeys = Object.keys(item)
      return allKeys.some((aKey) => {
        if (Object.prototype.toString.call(item[aKey]) !== '[object String]') {
          return false
        }
        if (item[aKey].toLowerCase().indexOf(this.get('inputFilter').toLowerCase()) !== -1) {
          return true
        }
        return false
      })
    })
  },

  // == Events ================================================================

  // == Actions ===============================================================

  actions: {
    sort (sortOrder) {
      this.set('sortOrder', sortOrder)
      let onlySelected = this.get('onlySelected') ? 'selectedItems' : 'itemsCached'
      this.processItems(onlySelected)
    },
    handleInput (input) {
      this.set('inputFilter', input.value)
      let onlySelected = this.get('onlySelected') ? 'selectedItems' : 'itemsCached'
      this.processItems(onlySelected)
    },
    showSelected () {
      this.set('onlySelected', true)
      this.processItems('selectedItems')
    },
    showAll () {
      this.set('onlySelected', false)
      this.processItems('itemsCached')
    }
  }
})
