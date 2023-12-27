export class FileUploadMiddleware {

  static containFiles(req, res, next) {
    const maxNumberFiles = 10;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No seleccionó ningun archivo' });
    }

    if (!Array.isArray(req.files.file)) {
      req.body.files = [req.files.file];
    } else {
      req.body.files = req.files.file;
    }

    if(req.body.files.length > maxNumberFiles){
      return res.status(400).json({error: `Superó el número máximo de imagenes (${maxNumberFiles})`})
    }

    next();
  }

}