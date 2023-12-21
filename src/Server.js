import express from 'express'

export class Server {

  constructor({ app, port, routes, publicPath = 'public' }) {
    this.app = app;
    this.port = port;
    this.routes = routes;
    this.publicPath = publicPath;
  }

  async start() {

    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });

  }

}