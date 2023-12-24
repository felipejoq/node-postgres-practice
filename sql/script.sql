DROP TABLE IF EXISTS users, roles, users_roles, config, articles, images_article;

CREATE TABLE IF NOT EXISTS
  users (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 1) PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    image VARCHAR DEFAULT 'https://blog.uncodigo.com/wp-content/uploads/2023/12/profile.png' NOT NULL,
    active BOOLEAN DEFAULT true NOT NULL,
    password VARCHAR NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  roles (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 1) PRIMARY KEY,
    role VARCHAR(20)
  );

CREATE TABLE IF NOT EXISTS
  users_roles (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 1) PRIMARY KEY,
    user_id BIGINT,
    role_id BIGINT,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS
  config (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 1) PRIMARY KEY,
    site_name VARCHAR DEFAULT 'MyStore Demo' NOT NULL,
    site_description VARCHAR DEFAULT 'MyStore Demo Description' NOT NULL,
    enable_registration BOOLEAN DEFAULT true NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  articles (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 1) PRIMARY KEY,
    title VARCHAR NOT NULL,
    excerpt VARCHAR NOT NULL,
    body TEXT NOT NULL,
    price DECIMAL(10,2),
    active BOOLEAN DEFAULT true NOT NULL,
    create_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
    updated_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
    user_id BIGINT,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
  );

CREATE TABLE IF NOT EXISTS
  images_article (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 1) PRIMARY KEY,
    url_img VARCHAR DEFAULT 'https://blog.uncodigo.com/wp-content/uploads/2023/12/no-img.jpg' NOT NULL,
    article_id BIGINT,
    user_id BIGINT,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,
    CONSTRAINT fk_article_id FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE SET NULL
  );

INSERT INTO
  users (name, email, password)
VALUES
  ('Felipe','felipe@test.test','$2b$10$12HQGrt8GM0BmJut/I8.QuWRVKySK1HxJtJH3CeBxc.fFysQ7ReYa'),
  ('Hugo','hugo@test.test','$2b$10$j4O1oZg9BVcv7f0wPeGDT.c1Ckgxb5i.58dk59xlyWiyk15M9inXi'),
  ('Alicia','alicia@test.test','$2b$10$dfUJbJk7cmd8w8YS6B9BX.gtZ4TkLBguAXtq1bSzxCNg8s15nV9aS'),
  ('Tomas','tomas@test.test','$2b$10$A8m/YuIzpgsOHmLj8n1KG.ZG2XAUK81p1LY85TBRPDn1vLroYbcMC'),
  ('Hilda','hilda@test.test','$2b$10$iVKZei5YxkX8BPbntnkYjOqF70lf.zbMk2mClHZvAeKil.b7xHI4u'),
  ('Roberto','roberto@test.test','$2b$10$cS7XCMGbK4BpH1k/y34xUOxII3YMmBQ2eQDn7O1aCzXkSREG5td7K');

INSERT INTO
  users (name, email, active, password)
VALUES
  ('Maria','maria@test.test',false,'$2b$10$MG071U/B.mdPpoyzeMA5i.uTPSBZdkFi3gD/HTvoczJed2w/uJhmy');

INSERT INTO
  roles (role)
VALUES
  ('ADMIN'),
  ('SELLER'),
  ('USER');

INSERT INTO
  users_roles (user_id, role_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 2),
  (2, 3),
  (3, 3),
  (4, 3),
  (5, 3),
  (6, 3),
  (7, 3);

INSERT INTO articles (title, excerpt, body, price, user_id, create_at, updated_at, active)
VALUES (
  'Lindo vestido de verano',
  'Este hermoso vestido de verano es perfecto para cualquier ocasión. Hecho de un material ligero y transpirable, es cómodo de llevar y te hará lucir fabulosa.',
  'Este vestido es perfecto para una salida con amigos, una cena romántica o incluso una boda. Es elegante y sofisticado, pero también lo suficientemente informal para usarlo en el día a día.',
  20000,
  1,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  true
),(
  'Televisión inteligente 4K',
  'Disfruta de tus películas y programas favoritos con esta increíble televisión inteligente 4K. Con una resolución de 3840 x 2160 píxeles, obtendrás una imagen nítida y vibrante.',
  'Esta televisión es perfecta para cualquier hogar. Es fácil de usar y tiene todas las funciones que necesitas para disfrutar de tu entretenimiento.',
  60000,
  2,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  true
),(
  'Juego de herramientas de bricolaje',
  'Este completo juego de herramientas de bricolaje es perfecto para cualquier proyecto doméstico. Contiene todo lo que necesitas para arreglar tu casa, desde destornilladores hasta sierras.',
  'Este juego es una excelente inversión para cualquier hogar. Es duradero y te durará años.',
  33000,
  3,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  true
),(
  'Bicicleta de montaña',
  'Disfruta de la naturaleza con esta bicicleta de montaña. Es perfecta para cualquier terreno, desde senderos hasta caminos de tierra.',
  'Esta bicicleta es perfecta para cualquier ciclista entusiasta. Es duradera y te durará años.',
  120000,
  7,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  true
),(
  'Juego de mesa de estrategia',
  'Pasa horas de diversión con este juego de mesa de estrategia. Es perfecto para familias y amigos.',
  'Este juego es perfecto para cualquier amante de los juegos de mesa. Es desafiante y te mantendrá entretenido durante horas.',
  15500,
  7,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  false
),(
  'Libro de cocina vegana',
  'Aprende a cocinar deliciosas comidas veganas con este libro de cocina. Contiene recetas para todos los gustos.',
  'Este libro es perfecto para cualquier persona que quiera probar la cocina vegana. Es fácil de seguir y las recetas son deliciosas.',
  5690,
  1,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  true
), (
  'Tablet Samsung Galaxy Tab S8 Ultra',
  'Disfruta de una experiencia de entretenimiento increíble con esta tablet Samsung Galaxy Tab S8 Ultra. Con una pantalla de 14,6 pulgadas y un procesador potente, es perfecta para cualquier tarea.',
  'Esta tablet es perfecta para cualquier persona que quiera una tablet potente y versátil. Es ideal para ver películas, jugar, trabajar o estudiar.',
  47890,
  1,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  true
),(
  'Par de zapatillas Nike Air Jordan 1',
  'Luce genial con estas zapatillas Nike Air Jordan 1. Están hechas de materiales de alta calidad y son muy cómodas de llevar.',
  'Estas zapatillas son perfectas para cualquier ocasión. Son elegantes y modernas, pero también son muy duraderas.',
  32560,
  2,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  true
), (
  'Auriculares inalámbricos Sony WH-1000XM5',
  'Disfruta de una experiencia de audio inmersiva con estos auriculares inalámbricos Sony WH-1000XM5. Con cancelación de ruido activa, te aislarán del mundo exterior.',
  'Estos auriculares son perfectos para cualquier persona que quiera disfrutar de su música o audio sin distracciones. Son cómodos de llevar y tienen una batería de larga duración.',
  14600,
  3,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  true
), (
  'Bicicleta eléctrica',
  'Disfruta de una conducción cómoda y sostenible con esta bicicleta eléctrica. Es perfecta para recorrer la ciudad o hacer turismo.',
  'Esta bicicleta es perfecta para cualquier persona que quiera una forma de transporte ecológica y eficiente. Es fácil de usar y tiene una autonomía de hasta 50 kilómetros.',
  90500,
  7,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  true
), (
  'Set de herramientas de jardinería',
  'Este completo set de herramientas de jardinería es perfecto para cualquier jardinero entusiasta. Contiene todo lo que necesitas para cuidar de tus plantas.',
  'Este set es una excelente inversión para cualquier hogar. Es duradero y te durará años.',
  23000,
  7,
  '2023-12-24 12:37:00',
  '2023-12-24 12:37:00',
  false
);

INSERT INTO
  images_article (article_id, user_id )
VALUES
  (1, 1),
  (1, 1),
  (2, 2),
  (2, 2),
  (2, 2),
  (3, 3),
  (4, 7),
  (4, 7),
  (4, 7),
  (4, 7),
  (5, 7),
  (6, 1),
  (7, 1),
  (8, 2),
  (8, 2),
  (8, 2),
  (8, 2),
  (9, 3),
  (10, 7),
  (11, 7);