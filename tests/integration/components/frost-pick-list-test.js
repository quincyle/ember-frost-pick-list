import {expect} from 'chai'
import Ember from 'ember'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'
const {$, A, run} = Ember

const test = integration('frost-pick-list')
describe(test.label, function () {
  test.setup()
  let sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    initializeHook()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('Rendering a pick-list with a frost-table', function () {
    beforeEach(function () {
      let selectedItems = A()
      let sortOrder = A(['name'])
      let sortingProperties = A([
        {label: 'Name', value: 'name'},
        {label: 'Milk', value: 'milk'},
        {label: 'Espresso', value: 'espresso'},
        {label: 'Other', value: 'other'}
      ])
      const columns = A([
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
      ])

      this.setProperties({
        model: A([
          {
            uuid: 1,
            name: 'Cappuccino',
            milk: '60ml',
            other: '-',
            espresso: '60ml'
          },
          {
            uuid: 2,
            name: 'Mocha',
            milk: '30ml',
            other: 'chocolate: 60ml',
            espresso: '60ml'
          },
          {
            uuid: 3,
            name: 'Latte',
            milk: '300ml',
            other: 'foamed milk: 2ml',
            espresso: '60ml'
          },
          {
            uuid: 4,
            name: 'Americano',
            milk: '0ml',
            other: 'Water: 6ml',
            espresso: '30ml'
          },
          {
            uuid: 5,
            name: 'Macchiato',
            milk: '0ml',
            other: 'Dot of foamed milk',
            espresso: '60-120ml'
          },
          {
            uuid: 6,
            name: 'Cafe noisette',
            milk: '30ml',
            other: 'Dot of foamed milk',
            espresso: '60ml'
          },
          {
            uuid: 7,
            name: 'Espresso',
            milk: '0ml',
            other: '-',
            espresso: '30ml'
          }
        ]),
        columns: columns,
        selectedItems: selectedItems,
        sortOrder: sortOrder,
        sortingProperties: sortingProperties,
        onSelectionChange: (selectedItems) => {
          this.get('selectedItems').setObjects(selectedItems)
        }
      })

      this.render(hbs`
        {{frost-pick-list
          hook='myPickList'
          listComponent=(component 'frost-table'
            columns=columns
            itemKey='uuid'
            onSelectionChange=(action onSelectionChange)
          )
          selectedItems=selectedItems
          items=model
          sortOrder=sortOrder
          sortingProperties=sortingProperties
          sortOrderMax=2
        }}
      `)
      return wait()
    })

    it('Should render the "frost-pick-list" with a frost-table', function () {
      expect($hook('myPickList')).to.have.length(1)
    })
    it('Should render a "frost-text" filter', function () {
      expect($hook('myPickList-filterText')).to.have.length(1)
    })
    it('Should render a "frost-sort"', function () {
      expect($hook('myPickList-mySort')).to.have.length(1)
    })
    it('Should render a sub title', function () {
      expect(this.$('.sub-title')).to.have.length(1)
    })
    it('Should display proper sub title', function () {
      expect(this.$('.sub-title').text().trim()).to.eql('Showing 7 of 7 (0 selected)')
    })
    it('Should display proper record', function () {
      expect($hook('list-component-body-row-cell', {column: 0, row: 0}).text().trim()).to.eql('Americano')
    })
    describe('When clicking on sort button', function () {
      beforeEach(function () {
        $hook('myPickList-mySort-item-direction', {index: 0}).click()
        return wait()
      })
      it('Should display ', function () {
        expect($hook('list-component-body-row-cell', {column: 0, row: 0}).text().trim()).to.eql('Mocha')
      })
    })
    describe('When clicking on a row', function () {
      beforeEach(function () {
        this.$('.frost-table tr:first-of-type td:nth-child(1) input').click()
        return wait()
      })
      it('Should change the subtitle', function () {
        expect(this.$('.sub-title').text().trim()).to.eql('Showing 7 of 7 (1 selected)')
      })
      describe('When clicking on a second row', function () {
        beforeEach(function () {
          this.$('.frost-table tr:nth-child(2) td:nth-child(1) input').click()
          return wait()
        })
        it('Should change the subtitle', function () {
          expect(this.$('.sub-title').text().trim()).to.eql('Showing 7 of 7 (2 selected)')
        })
        describe('When changing filtering', function () {
          beforeEach(function () {
            run(() => $hook('myPickList-filterText-input').val('am').trigger('input'))
            return wait()
          })
          it('Should change the subtitle', function () {
            expect(this.$('.sub-title').text().trim()).to.eql('Showing 4 of 7 (2 selected)')
          })
          describe('When changing sorting', function () {
            beforeEach(function () {
              const clickEvent = $.Event('click')
              $hook('myPickList-mySort-item-direction', {index: 0}).trigger(clickEvent)
              return wait()
            })
            it('Should change the subtitle', function () {
              expect(this.$('.frost-table tr:first-of-type td:nth-child(2)').text().trim()).to.eql('Macchiato')
            })
            describe('When clicking to show the selected records only', function () {
              beforeEach(function () {
                $hook('myPickList-selectedButton').click()
                return wait()
              })
              it('Should change the subtitle', function () {
                expect(this.$('.sub-title').text().trim()).to.eql('Showing 2 of 7 (2 selected)')
              })
              it('Should change the display on the table', function () {
                expect(this.$('.frost-table tr:first-of-type td:nth-child(2)').text().trim()).to.eql('Cafe noisette')
              })
              describe('When clicking to show all the records', function () {
                beforeEach(function () {
                  $hook('myPickList-allButton').click()
                  return wait()
                })
                it('Should change the subtitle', function () {
                  expect(this.$('.sub-title').text().trim()).to.eql('Showing 4 of 7 (2 selected)')
                })
                it('Should change the display on the table', function () {
                  expect(this.$('.frost-table tr:first-of-type td:nth-child(2)').text().trim()).to.eql('Macchiato')
                })
              })
            })
          })
        })
      })
    })
  })
  describe('Rendering a pick-list with a frost-list', function () {
    beforeEach(function () {
      let selectedItems = A()
      let expandedItems = A([])
      let sortOrder = A(['name'])
      let sortingProperties = A([
        {label: 'Name', value: 'name'},
        {label: 'Milk', value: 'milk'},
        {label: 'Espresso', value: 'espresso'},
        {label: 'Other', value: 'other'}
      ])

      this.setProperties({
        model: A([
          {
            uuid: 1,
            name: 'Cappuccino',
            milk: '60ml',
            other: '-',
            espresso: '60ml'
          },
          {
            uuid: 2,
            name: 'Mocha',
            milk: '30ml',
            other: 'chocolate: 60ml',
            espresso: '60ml'
          },
          {
            uuid: 3,
            name: 'Latte',
            milk: '300ml',
            other: 'foamed milk: 2ml',
            espresso: '60ml'
          },
          {
            uuid: 4,
            name: 'Americano',
            milk: '0ml',
            other: 'Water: 6ml',
            espresso: '30ml'
          },
          {
            uuid: 5,
            name: 'Macchiato',
            milk: '0ml',
            other: 'Dot of foamed milk',
            espresso: '60-120ml'
          },
          {
            uuid: 6,
            name: 'Cafe noisette',
            milk: '30ml',
            other: 'Dot of foamed milk',
            espresso: '60ml'
          },
          {
            uuid: 7,
            name: 'Espresso',
            milk: '0ml',
            other: '-',
            espresso: '30ml'
          }
        ]),
        selectedItems: selectedItems,
        expandedItems: expandedItems,
        sortOrder: sortOrder,
        sortingProperties: sortingProperties,
        onSelectionChange: (selectedItems) => {
          this.get('selectedItems').setObjects(selectedItems)
        },
        onExpansionChange (expandedItems) {
          this.get('expandedItems').setObjects(expandedItems)
        }
      })

      this.render(hbs`
        {{frost-pick-list
          hook='frostPickListFromList'
          listComponent=(component 'frost-list'
            expandedItems=expandedItems
            item=(component 'frost-list-item')
            itemExpansion=(component 'frost-list-item')
            itemKey='uuid'
            onExpansionChange=onExpansionChange
            onSelectionChange=onSelectionChange
          )
          selectedItems=selectedItems
          items=model
          sortOrder=sortOrder
          sortingProperties=sortingProperties
          sortOrderMax=2
        }}
      `)
      return wait()
    })

    it('Should render the "frost-pick-list" with a frost-list', function () {
      expect($hook('frostPickListFromList')).to.have.length(1)
    })
    it('Should render a "frost-text" filter', function () {
      expect($hook('frostPickListFromList-filterText')).to.have.length(1)
    })
    it('Should render a "frost-sort"', function () {
      expect($hook('frostPickListFromList-mySort')).to.have.length(1)
    })
    it('Should render a sub title', function () {
      expect(this.$('.sub-title')).to.have.length(1)
    })
    it('Should display proper sub title', function () {
      expect(this.$('.sub-title').text().trim()).to.eql('Showing 7 of 7 (0 selected)')
    })
    describe('When clicking on a row', function () {
      beforeEach(function () {
        this.$('.frost-list vertical-item:first-of-type input').click()
        return wait()
      })
      it('Should change the subtitle', function () {
        expect(this.$('.sub-title').text().trim()).to.eql('Showing 7 of 7 (1 selected)')
      })
      describe('When clicking on a second row', function () {
        beforeEach(function () {
          this.$('.frost-list vertical-item:nth-child(2) input').click()
          return wait()
        })
        it('Should change the subtitle', function () {
          expect(this.$('.sub-title').text().trim()).to.eql('Showing 7 of 7 (2 selected)')
        })
        describe('When changing filtering', function () {
          beforeEach(function () {
            run(() => $hook('frostPickListFromList-filterText-input').val('am').trigger('input'))
            return wait()
          })
          it('Should change the subtitle', function () {
            expect(this.$('.sub-title').text().trim()).to.eql('Showing 4 of 7 (2 selected)')
          })
          describe('When clicking to show the selected records only', function () {
            beforeEach(function () {
              $hook('frostPickListFromList-selectedButton').click()
              return wait()
            })
            it('Should change the subtitle', function () {
              expect(this.$('.sub-title').text().trim()).to.eql('Showing 2 of 7 (2 selected)')
            })
            it('Should show only 2 records in the list', function () {
              expect(this.$('.frost-list vertical-item')).to.have.length(2)
            })
            describe('When clicking to show all the records', function () {
              beforeEach(function () {
                $hook('frostPickListFromList-allButton').click()
                return wait()
              })
              it('Should change the subtitle', function () {
                expect(this.$('.sub-title').text().trim()).to.eql('Showing 4 of 7 (2 selected)')
              })
              it('Should show only 4 records in the list', function () {
                expect(this.$('.frost-list vertical-item')).to.have.length(4)
              })
            })
          })
        })
      })
    })
  })
})
