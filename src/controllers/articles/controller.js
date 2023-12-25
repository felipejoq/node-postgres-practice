import { handleError } from "../../config/errors/hendler.errors.js";
import { PaginationDto } from "../../domain/dtos/index.js";

export class ArticleController {
  constructor(articleService) {
    this.articleService = articleService;
  }

  getArticles = async (req, res) => {
    const { page, limit } = req.query;
    const [error, pagination] = PaginationDto.create({
      page, limit
    });

    if (error) return res.status(400).json({ error });

    this.articleService.getArticles(pagination)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  getAllArticles = async (req, res) => {
    const { page, limit } = req.query;
    const [error, pagination] = PaginationDto.create({
      page, limit
    });

    if (error) return res.status(400).json({ error });

    this.articleService.getAllArticles(pagination)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  getArticleById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(+id))
      return res.status(400).json({ error: 'El id no es válido' });

    this.articleService.getArticleById(+id)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  getArticleBySlug = async (req, res) => {
    const { slug } = req.params;

    this.articleService.getArticleBySlug(slug)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  createArticle = async (req, res) => {
    const body = req.body;
    console.log('createArticle', { body });
    res.json({
      ok: true
    })
  }

  updateArticleById = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    console.log('updateArticleById', { id }, { body });
    res.json({
      ok: true
    })
  }

  deleteArticleById = async (req, res) => {
    const { id } = req.params;

    console.log('deleteArticleById', { id });
    res.json({
      ok: true
    })
  }

}
