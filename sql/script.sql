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
  ('Felipe', 'felipe@test.test', '$2b$10$MG071U/B.mdPpoyzeMA5i.uTPSBZdkFi3gD/HTvoczJed2w/uJhmy'),
  ('Hugo', 'hugo@test.test', '$2b$10$MG071U/B.mdPpoyzeMA5i.uTPSBZdkFi3gD/HTvoczJed2w/uJhmy'),
  ('Alicia', 'alicia@test.test', '$2b$10$MG071U/B.mdPpoyzeMA5i.uTPSBZdkFi3gD/HTvoczJed2w/uJhmy'),
  ('Tomas', 'tomas@test.test', '$2b$10$MG071U/B.mdPpoyzeMA5i.uTPSBZdkFi3gD/HTvoczJed2w/uJhmy'),
  ('Hilda', 'hilda@test.test', '$2b$10$MG071U/B.mdPpoyzeMA5i.uTPSBZdkFi3gD/HTvoczJed2w/uJhmy'),
  ('Roberto', 'roberto@test.test', '$2b$10$MG071U/B.mdPpoyzeMA5i.uTPSBZdkFi3gD/HTvoczJed2w/uJhmy');

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