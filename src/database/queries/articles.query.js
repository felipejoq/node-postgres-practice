export const GET_ARTICLES_BY_USER_ID = `
SELECT
  a.id,
  a.title,
  a.excerpt,
  a.body,
  a.slug,
  a.price,
  a.active,
  a.create_at,
  a.updated_at,
  u.name AS user_name,
  u.email,
  u.image AS user_profile_img,
  json_agg(json_build_object('id', i.id, 'url_img', i.url_img)) AS article_images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
WHERE a.active = true AND u.id = $1
GROUP BY a.id, a.title, a.excerpt, a.body, a.slug, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
ORDER BY a.id
OFFSET $2
LIMIT $3
`;

export const GET_ARTICLES_WHIT_PAGINATION = `
SELECT
  a.id,
  a.title,
  a.excerpt,
  a.body,
  a.slug,
  a.price,
  a.active,
  a.create_at,
  a.updated_at,
  u.name AS user_name,
  u.email,
  u.image AS user_profile_img,
  json_agg(json_build_object('id', i.id, 'url_img', i.url_img)) AS article_images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
WHERE a.active = true
GROUP BY a.id, a.title, a.excerpt, a.body, a.slug, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
ORDER BY a.id
OFFSET $1
LIMIT $2
`;

export const GET_ALL_ARTICLES_WHIT_PAGINATION = `
SELECT
  a.id,
  a.title,
  a.excerpt,
  a.body,
  a.slug,
  a.price,
  a.active,
  a.create_at,
  a.updated_at,
  u.name AS user_name,
  u.email,
  u.image AS user_profile_img,
  json_agg(json_build_object('id', i.id, 'url_img', i.url_img)) AS article_images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
GROUP BY a.id, a.title, a.excerpt, a.body, a.slug, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
ORDER BY a.id
OFFSET $1
LIMIT $2
`;

export const GET_ARTICLE_BY_ID = `
SELECT
  a.id,
  a.title,
  a.excerpt,
  a.body,
  a.slug,
  a.price,
  a.active,
  a.create_at,
  a.updated_at,
  u.name AS user_name,
  u.email,
  u.image AS user_profile_img,
  json_agg(json_build_object('id', i.id, 'url_img', i.url_img)) AS article_images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
WHERE a.active = true AND a.id = $1
GROUP BY a.id, a.title, a.excerpt, a.body, a.slug, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
`;

export const GET_ARTICLE_BY_SLUG = `
SELECT
  a.id,
  a.title,
  a.excerpt,
  a.body,
  a.slug,
  a.price,
  a.active,
  a.create_at,
  a.updated_at,
  u.name AS user_name,
  u.email,
  u.image AS user_profile_img,
  json_agg(json_build_object('id', i.id, 'url_img', i.url_img)) AS article_images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
WHERE a.active = true AND a.slug = $1
GROUP BY a.id, a.title, a.excerpt, a.body, a.slug, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
`;

export const GET_TOTAL_ARTICLES = `
SELECT COUNT(*) FROM articles;
`;