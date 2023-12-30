import { handleError } from "../../config/errors/hendler.errors.js";
import { CreateArticleDto } from "../../domain/dtos/articles/create-article.dto.js";
import { PaginationDto, UpdateArticleDto } from "../../domain/dtos/index.js";

export class ArticleController {
  constructor(articleService) {
    this.articleService = articleService;
  }

  getArticles = (req, res) => {
    const { page, limit } = req.query;
    const [error, pagination] = PaginationDto.create({
      page, limit
    });

    if (error) return res.status(400).json({ error });

    this.articleService.getArticles(pagination)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  getAllArticles = (req, res) => {
    const { page, limit } = req.query;
    const [error, pagination] = PaginationDto.create({
      page, limit
    });

    if (error) return res.status(400).json({ error });

    this.articleService.getAllArticles(pagination)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  getArticleById = (req, res) => {
    const { articleId } = req.params;
    const { user } = req.body;

    if (isNaN(+articleId))
      return res.status(400).json({ error: 'El id no es válido' });

    this.articleService.getArticleById({ articleId, user })
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  getArticleBySlug = (req, res) => {
    const { slug } = req.params;

    this.articleService.getArticleBySlug(slug)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  getArticlesByUserId = (req, res) => {

    const { userId } = req.params;

    if (isNaN(+userId))
      return res.status(400).json({ error: 'El id no es válido' });

    const { page, limit } = req.query;
    const [error, pagination] = PaginationDto.create({
      page, limit
    });

    if (error) return res.status(400).json({ error });

    this.articleService.getArticlesByUserId({ userId, page: pagination.page, limit: pagination.limit })
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  createArticle = (req, res) => {

    const body = req.body;

    const [error, createArticleDto] = CreateArticleDto.create(body);

    if (error) return res.status(401).json({ error })

    this.articleService.createArticle(createArticleDto)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  updateArticleById = (req, res) => {

    const { articleId } = req.params;
    const body = req.body;

    if (isNaN(+articleId))
      return res.status(400).json({ error: 'El id no es válido' });

    const [error, updateArticleDto] = UpdateArticleDto.create({ articleId, body });

    if (error) return res.status(401).json({ error })

    this.articleService.updateArticleById(updateArticleDto)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  deleteArticleById = (req, res) => {
    const { articleId } = req.params;
    const { user } = req.body;

    if (isNaN(+articleId))
      return res.status(400).json({ error: 'El id no es válido' });

    this.articleService.deleteArticleById({ articleId, user })
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }


  addImagesToArticle = (req, res) => {
    const { articleId } = req.params;
    const { user, files } = req.body;

    if (isNaN(+articleId))
      return res.status(400).json({ error: 'El id no es válido' });

    this.articleService.addImagesToArticle({ articleId, user, files })
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  removeImageArticle = (req, res) => {

    const { articleId, imageId } = req.params;
    const { user } = req.body;

    if (isNaN(+articleId) || isNaN(+imageId))
      return res.status(400).json({ error: 'El id no es válido' });

    this.articleService.removeImageArticle({ articleId, imageId, user })
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

  changeStatusArticle = (req, res) => {

    const { articleId } = req.params;
    const { user, status } = req.body;

    if (isNaN(+articleId))
      return res.status(400).json({ error: 'El id no es válido' });

    this.articleService.changeStatusArticle({ articleId, user, status })
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

}
