
const base = 'http://localhost:8000/api/admin'


export const urls = Object.freeze({
  product: {
    create: base + '/product/save',
    get: base + '/product/fetch',
    update: base + '/product/update/:id',
    delete: base + '/product/:id',
    bulkSave: base + '/product/bulkUpload',
    getCount: base + '/product/count'
  },

  productType: {
    create: base + '/productType/save',
    get: base + '/productType/fetch',
    update: base + '/productType/update',
    delete: base + '/productType/:productId'
  },

})