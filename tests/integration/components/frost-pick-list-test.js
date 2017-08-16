import {expect} from 'chai'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'

const test = integration('frost-pick-list')
describe(test.label, function () {
  test.setup()

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value')
    // Handle any actions with this.on('myAction', function (val) { ... })
    // Template block usage:
    // this.render(hbs`
    //   {{#frost-pick-list}}
    //     template content
    //   {{/frost-pick-list}}
    // `)

    this.render(hbs`{{frost-pick-list}}`)
    expect(this.$()).to.have.length(1)
  })
})
