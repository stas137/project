import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  userId: '4',
  title: 'TEST ARTICLE',
  subtitle: 'Hey hey 2023',
  img: 'https://codeguida.com/media/post_title/g3033.png',
  views: 1020,
  createdAt: '10.10.2023',
  type: [
    'IT',
  ],
  blocks: [
    {
      id: '1',
      type: 'TEXT',
      title: 'Block title',
      paragraphs: [
        'lorem1',
        'lorem2',
        'lorem3',
      ],
    },
    {
      id: '4',
      type: 'CODE',
      code: "<!DOCTYPE html>\n<html>\n  <body>\n    <p id='hello'></p>script>\ndocument.getElementById('hello').innerHTML = 'Hello, world!';\n              </script>\n            </body>\n          </html>",
    },
    {
      id: '2',
      type: 'IMAGE',
      src: 'https://habrastorage.org/r/w1560/webt/4u/wm/uq/4uwmuqhslkvvnsgt-kr_ggu7skg.png',
      title: 'Picture 1',
    },
  ],
};

export const createArticle = (article?: Article) => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:8000/articles',
    headers: {
      Authorization: 'ok',
    },
    body: article ?? defaultArticle,
  }).then((response) => response.body);
};

export const removeArticle = (articleId: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: {
      Authorization: 'ok',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
