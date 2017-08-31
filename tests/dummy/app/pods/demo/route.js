import Ember from 'ember'
const {Route, A, copy} = Ember

export default Route.extend({
  aModel: [
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
  ],
  model () {
    return A(copy(this.get('aModel'), true))
  },
  actions: {
    willTransition (transition) {
      this.controllerFor(transition.targetName).set('model', A(copy(this.get('aModel'), true)))
    }
  }
})
