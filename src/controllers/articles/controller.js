import { handleError } from "../../config/errors/hendler.errors.js";
import { CreateArticleDto } from "../../domain/dtos/articles/create-article.dto.js";
import { PaginationDto, UpdateArticleDto } from "../../domain/dtos/index.js";

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
    const { user } = req.body;

    if (isNaN(+id))
      return res.status(400).json({ error: 'El id no es válido' });

    this.articleService.getArticleById({ id, user })
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

    const [error, createArticleDto] = CreateArticleDto.create(body);

    if (error) return res.status(401).json({ error })

    this.articleService.createArticle(createArticleDto)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  updateArticleById = async (req, res) => {

    const { id } = req.params;
    const body = req.body;

    const [error, updateArticleDto] = UpdateArticleDto.create({ id, body });

    if (error) return res.status(401).json({ error })

    this.articleService.updateArticleById(updateArticleDto)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  deleteArticleById = async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    if (isNaN(+id))
      return res.status(400).json({ error: 'El id no es válido' });

    this.articleService.deleteArticleById({ id, user })
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

}
