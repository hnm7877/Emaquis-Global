const { generateQuantityByLocker } = require('./utils/generateQuantityByLocker');

const tests = [
  { name: 'VALPIERRE', size: '50cl', locker: 1 },
  { name: 'Valpierre-50', size: '50cl', locker: 1 },
  { name: 'Valpierre-50', size: '50 cl', locker: 1 }, // Space in size
  { name: 'Valpierre-50', size: '50CL', locker: 1 }, // Caps in size
  { name: 'VALPIERRE', size: 'unknown', locker: 1 },
];

tests.forEach(test => {
  const produit = { nom_produit: test.name };
  const qty = generateQuantityByLocker({
    locker: test.locker,
    size: test.size,
    produit
  });
  console.log(`Name: '${test.name}', Size: '${test.size}', Locker: ${test.locker} -> Qty: ${qty}`);
});
