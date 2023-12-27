export const GET_ARTICLES_BY_USER_ID = `
SELECT
  a.id::integer,
  a.title,
  a.description,
  a.slug,
  a.price,
  a.active,
  a.create_at,
  a.updated_at,
  json_build_object(
    'id', u.id::integer,
    'name', u.name,
    'email', u.email,
    'image', u.image
  ) AS author,
  json_agg(json_build_object(
    'id', i.id::integer, 
    'url_img', 
    i.url_img)) AS article_images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
WHERE a.active = true AND u.id = $1
GROUP BY a.id, a.title, a.description, a.slug, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
ORDER BY a.id
OFFSET $2
LIMIT $3
`;

export const GET_ARTICLES_WHIT_PAGINATION = `
SELECT
a.id::integer,
a.title,
a.description,
a.slug,
a.price,
a.active,
a.create_at,
a.updated_at,
json_build_object(
  'id', u.id::integer,
  'name', u.name,
  'email', u.email,
  'image', u.image
) AS author,
json_agg(json_build_object(
  'id', i.id::integer, 
  'url_img', 
  i.url_img)) AS article_images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
WHERE a.active = true
GROUP BY a.id, a.title, a.description, a.slug, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
ORDER BY a.id
OFFSET $1
LIMIT $2
`;

export const GET_ALL_ARTICLES_WHIT_PAGINATION = `
SELECT
a.id::integer,
a.title,
a.description,
a.slug,
a.price,
a.active,
a.create_at,
a.updated_at,
json_build_object(
  'id', u.id::integer,
  'name', u.name,
  'email', u.email,
  'image', u.image
) AS author,
json_agg(json_build_object(
  'id', i.id, 
  'url_img', 
  i.url_img)) AS article_images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
GROUP BY a.id, a.title, a.description, a.slug, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
ORDER BY a.id
OFFSET $1
LIMIT $2
`;

export const GET_ARTICLE_BY_ID = `
SELECT
a.id::integer,
a.title,
a.description,
a.slug,
a.price,
a.active,
a.create_at,
a.updated_at,
json_build_object(
  'id', u.id::integer,
  'name', u.name,
  'email', u.email,
  'image', u.image
) AS author,
json_agg(json_build_object(
  'id', i.id::integer, 
  'url_img', 
  i.url_img)) AS article_images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
WHERE a.active = true AND a.id = $1
GROUP BY a.id, a.title, a.description, a.slug, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
`;

export const GET_ARTICLE_BY_SLUG = `
SELECT
a.id::integer,
a.title,
a.description,
a.slug,
a.price,
a.active,
a.create_at,
a.updated_at,
json_build_object(
  'id', u.id::integer,
  'name', u.name,
  'email', u.email,
  'image', u.image
) AS author,
json_agg(json_build_object(
  'id', i.id::integer, 
  'url_img', 
  i.url_img)) AS article_images
FROM articles a
INNER JOIN users u
ON a.user_id = u.id
LEFT JOIN images_article i
ON a.id = i.article_id
WHERE a.active = true AND a.slug = $1
GROUP BY a.id, a.title, a.description, a.slug, a.price, a.active, a.create_at, a.updated_at, u.name, u.email, u.image
`;

export const GET_TOTAL_ARTICLES = `
SELECT COUNT(*) FROM articles;
`;

export const CREATE_ARTICLE = `
INSERT INTO articles ( title, description, slug, price, active, user_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *, id::integer, user_id::integer
`;

export const SET_IMAGES_TO_ARTICLE = `
INSERT INTO images_article (url_img, article_id, user_id)
VALUES ($1, $2, $3) RETURNING id::integer, url_img
`;