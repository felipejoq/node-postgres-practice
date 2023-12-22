DROP TABLE users, roles, users_roles;

CREATE TABLE
  users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    active BOOLEAN DEFAULT true NOT NULL,
    password VARCHAR NOT NULL
  );

INSERT INTO
  users (name, email, password)
VALUES
  ('Felipe', 'felipe@test.test', '$2b$10$12HQGrt8GM0BmJut/I8.QuWRVKySK1HxJtJH3CeBxc.fFysQ7ReYa'),
  ('Hugo', 'hugo@test.test', '$2b$10$j4O1oZg9BVcv7f0wPeGDT.c1Ckgxb5i.58dk59xlyWiyk15M9inXi'),
  ('Alicia', 'alicia@test.test', '$2b$10$dfUJbJk7cmd8w8YS6B9BX.gtZ4TkLBguAXtq1bSzxCNg8s15nV9aS'),
  ('Tomas', 'tomas@test.test', '$2b$10$A8m/YuIzpgsOHmLj8n1KG.ZG2XAUK81p1LY85TBRPDn1vLroYbcMC'),
  ('Hilda', 'hilda@test.test', '$2b$10$iVKZei5YxkX8BPbntnkYjOqF70lf.zbMk2mClHZvAeKil.b7xHI4u'),
  ('Roberto', 'roberto@test.test', '$2b$10$cS7XCMGbK4BpH1k/y34xUOxII3YMmBQ2eQDn7O1aCzXkSREG5td7K');

INSERT INTO users (name, email, active, password)
VALUES ('Maria', 'maria@test.test', false, '$2b$10$MG071U/B.mdPpoyzeMA5i.uTPSBZdkFi3gD/HTvoczJed2w/uJhmy');


CREATE TABLE
  roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(20)
  );

INSERT INTO
  roles (role)
VALUES
  ('ADMIN'), ('SELLER'), ('USER');

CREATE TABLE
  users_roles (
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    role_id BIGINT,
    CONSTRAINT fk_user_id
      FOREIGN KEY(user_id) 
	      REFERENCES users(id)
          ON DELETE CASCADE,
    CONSTRAINT fk_role_id
      FOREIGN KEY(role_id)
        REFERENCES roles(id)
          ON DELETE CASCADE
  );

INSERT INTO
  users_roles (user_id, role_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(7, 3);