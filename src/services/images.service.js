import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUUUID } from "../config/plugins/uuid.js";
import { query } from "../database/db.js";
import { SET_IMAGES_TO_ARTICLE } from "../database/queries/articles.query.js";

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

  async setImagesToArticle (urlsImgs, articleId, userId) {
    //url_img, article_id, user_id
    const result = await Promise.all(
      urlsImgs.map(url => {
        return query(SET_IMAGES_TO_ARTICLE, [url, articleId, userId])
      })
    );

    return result.map(result => result.rows[0]);
  }

}
