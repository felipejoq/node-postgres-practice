export class ProductController {
  constructor() { }

  static getProducts = async (req, res) => {
    console.log('getProducts');
    res.json({
      ok: true
    })
  }

  static getProductById = async (req, res) => {
    const { id } = req.params;
    console.log('getProductById', { id });
    res.json({
      ok: true
    })
  }

  static createProduct = async (req, res) => {
    const body = req.body;
    console.log('createProduct', { body });
    res.json({
      ok: true
    })
  }

  static updateProductById = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    console.log('updateProductById', { id }, { body });
    res.json({
      ok: true
    })
  }

  static deleteProductById = async (req, res) => {
    const { id } = req.params;

    console.log('deleteProductById', { id });
    res.json({
      ok: true
    })
  }

}
