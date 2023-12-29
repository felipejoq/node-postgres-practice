import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUUUID } from "../config/plugins/uuid.js";
import { query } from "../database/db.js";
import { CustomError } from "../config/errors/custom.errors.js";
import {
  DELETE_IMAGE_BY_ARTICLE_IMAGE_ID,
  GET_IMAGE_BY_ID, SET_IMAGES_TO_ARTICLE,
} from "../database/queries/articles.query.js";

export class ImagesService {
  constructor(firebaseConfig) {
    this.app = initializeApp(firebaseConfig);
  }

  async uploadImage(
    file,
    folder = 'profile',
    validExtensions = ['png', 'gif', 'jpg', 'jpeg'],
  ) {

    const fileExtension = file.mimetype.split('/').at(1) ?? '';
    if (!validExtensions.includes(fileExtension)) {
      throw CustomError
        .badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions}`);
    }

    try {

      const storage = getStorage(this.app);
      const storageRef = ref(storage, `uploads/${folder}/${getUUUID()}.jpg`);
      const snapshot = await uploadBytes(storageRef, file.data);
      const urlImg = await getDownloadURL(storageRef);

      console.log({ snapshot });

      return urlImg;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async uploadMultiple(
    files,
    folder = 'articles',
    validExtensions = ['png', 'gif', 'jpg', 'jpeg'],
  ) {

    const fileUrls = await Promise.all(
      files.map(file => this.uploadImage(file, folder, validExtensions))
    );

    return fileUrls;

  }

  async setImagesToArticle(urlsImgs, articleId) {
    //url_img, article_id, user_id
    const result = await Promise.all(
      urlsImgs.map(url => {
        return query(SET_IMAGES_TO_ARTICLE, [url, articleId])
      })
    );

    return result.map(result => result.rows[0]);
  }

  async removeImageArticle(imageId, articleId) {

    const { rows: [imageFounded] } = await query(GET_IMAGE_BY_ID, [imageId]);

    if (!imageFounded)
      throw CustomError.badRequest(`La imagen no existe`);

    const { rows: [imageDeleted] } = await query(DELETE_IMAGE_BY_ARTICLE_IMAGE_ID, [articleId, imageId]);

    if (!imageDeleted)
      throw CustomError.badRequest(`Ninguna imágen eliminada`);

    return imageDeleted;

  }

}
