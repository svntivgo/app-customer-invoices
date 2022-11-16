import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.method === 'POST' || req.method === 'PUT') {
      const body = req.body;
      console.log('body:', body);
    }
    if (req.method === 'PUT') {
      const url = req.url.replace('/', '');
      console.log('url:', url);
    }
    next();
  }
}
