import { Application, Request, Response } from 'express';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.get(`${BASE_PATH}/hello`, (req: Request, res: Response) => {
      res.send('Hello World!');
    });
    app.post(`${BASE_PATH}/signup`, (req: Request, res: Response) => {
      // Extract data from the request body
      const { username, password, email } = req.body;
      console.log(username, password);

      // Perform signup logic here (e.g., create a new user in a database)
      // For this example, we'll just send a response with the received data
      res.json({
        message: 'User signed up successfully',
        username,
        email,
        password,
      });
    });
  };
  routes();
};
