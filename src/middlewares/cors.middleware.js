import cors from 'cors';

export class CorsMiddleware {

  static corsAllow({ domains = [] }) {
    return cors({
      origin: domains,
      credentials: true,
    })
  }

}