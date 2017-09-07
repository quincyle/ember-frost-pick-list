import Ember from 'ember'
const {A, Component, copy} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {sort} from 'ember-frost-sort'
import layout from '../templates/components/frost-pick-list'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Properties ============================================================

  classNames: ['frost-pick-list'],
  itemsCached: A([]),
  inputFilter: '',
  onlySelected: false,
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    listComponent: PropTypes.object.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.object),
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
  buttonPriority (onlySelected) {
    return {
      all: onlySelected ? 'tertiary' : 'primary',
      selected: onlySelected ? 'primary' : 'tertiary'
    }
  },

  @readOnly
  @computed('onlySelected')
  /**
   * Shows either the whole list or on the selected items
   * @param {Boolean} onlySelected - Should show only the selected items?
   * @returns {Array} One of either the whole list or only the selected items
   */
  list (onlySelected) {
    if (onlySelected) {
      return this.get('selectedItems')
    }
    return this.get('itemsCached')
  },

  @readOnly
  @computed('sortedItems.[]', 'selectedItems.[]')
  /**
   * Show amount of visible data
   * @param {Array} items - all items
   * @param {Array} selectedItems - all selected items
   * @returns {String} the sub title
   */
  subTitle (items, selectedItems) {
    const total = this.get('itemsCached').length
    const amtSelected = selectedItems ? selectedItems.length : 0

    return `Showing ${items.length} of ${total} (${amtSelected} selected)`
  },

  @readOnly
  @computed('list.@each.' + this.itemKey, 'inputFilter')
  /**
   * Shows the filtered items
   * @param {Array} list - The list to filter
   * @param {String} inputFilter - to filter against selectedItems
   * @returns {Array} The filtered list
   */
  filteredItems (list, inputFilter) {
    if (inputFilter) {
      return list.filter((item) => {
        let allKeys = Object.keys(item)
        return allKeys.some((aKey) => {
          if (typeof item[aKey] !== 'string') {
            return false
          }
          if (item[aKey].toLowerCase().indexOf(inputFilter.toLowerCase()) !== -1) {
            return true
          }
          return false
        })
      })
    }
    return list
  },

  @readOnly
  @computed('filteredItems.[]', 'sortOrder')
  /**
   * Sorts the data to display
   * @param {Array} filteredItems - The items to filter
   * @param {Array} sortOrder - The sorting strings
   * @returns {Array} The sorted items
   */
  sortedItems (filteredItems, sortOrder) {
    const sorted = sort(filteredItems, sortOrder)
    return sorted.compact()
  },

  // == Functions =============================================================

  init () {
    this._super(...arguments)
    this.get('itemsCached').setObjects(copy(this.get('items')))
  },

  // == Events ================================================================

  // == Actions ===============================================================

  actions: {
    sort (sortOrder) {
      this.set('sortOrder', sortOrder)
    },
    handleInput (input) {
      this.set('inputFilter', input.value)
    },
    showSelected () {
      this.set('onlySelected', true)
    },
    showAll () {
      this.set('onlySelected', false)
    }
  }
})
