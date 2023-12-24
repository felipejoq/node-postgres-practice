export const GET_ARTICLES_BY_USER_ID = `
SELECT
  a.id,
  a.title,
  a.excerpt,
  a.body,
  a.price,
  a.active,
  a.create_at,
  a.updated_at,
  u.name AS user_name,
  u.email,
  u.image,
  json_agg(json_build_object('id', i.id, 'url_img', i.url_img)) AS images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
WHERE a.active = true AND u.id = $1
GROUP BY a.id, a.title, a.excerpt, a.body, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
LIMIT $2
OFFSET $3
`;