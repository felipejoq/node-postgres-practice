export class ArticleController {
  constructor() { }

  static getArticles = async (req, res) => {
    console.log('getArticles');
    res.json({
      ok: true
    })
  }

  static getArticleById = async (req, res) => {
    const { id } = req.params;
    console.log('getArticleById', { id });
    res.json({
      ok: true
    })
  }

  static createArticle = async (req, res) => {
    const body = req.body;
    console.log('createArticle', { body });
    res.json({
      ok: true
    })
  }

  static updateArticleById = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    console.log('updateArticleById', { id }, { body });
    res.json({
      ok: true
    })
  }

  static deleteArticleById = async (req, res) => {
    const { id } = req.params;

    console.log('deleteArticleById', { id });
    res.json({
      ok: true
    })
  }

}
