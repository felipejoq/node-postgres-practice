# 👨‍💻 MyStore

MyStore es un projecto para poner a prueba conocimientos desarrollando una API RESTful usando JavaScript con Node.js + Express y PostgreSQL entre otras tecnologías.

Intentando poner a prueba conocimientos de código limpio y algunos princiopios SOLID.

## Servicios

Lista de servicios que contiene esta api restful

### Users

- GET /api/v1/user
  - description: "Lista de usuarios"
  - authentication: true
  - authorization: ['ADMIN', 'SELLER']
  - query: limit?: number, page?: number
  - params: []
  - payload:

      ```javascript
      {
        "page": number,
        "limit": number,
        "total": number,
        "next": string,
        "prev": string,
        "users": [
          {
            "id": number,
            "name": string,
            "email": string,
            "image": string,
            "active": boolean,
            "roles": [
              {
                "id": number,
                "role": string
              }
              ...
            ]
          }
          ...
        ]

      }
      ```

- GET /api/v1/user/{userId}
  - description: "Obtención de un usuario por su Id"
  - authentication: false
  - authorization: []
  - params: {userId: number}
  - payload:

      ```javascript
      {
            "id": number,
            "name": string,
            "email": string,
            "image": string,
            "active": boolean,
            "roles": [
              {
                "id": number,
                "role": string
              }
              ...
            ]
      }
      ```

- POST /api/v1/user/register
  - description: "Creación o registro de un usuario"
  - authentication: false
  - authorization: []
  - params:

      ```javascript
        "body": {
          "name": string,
          "email": string,
          "password": string,
        }
      ```

  - payload:

      ```javascript
        {
          "id": number,
            "name": string,
            "email": string,
            "image": string,
            "active": boolean,
            "roles": [
              {
                "id": number,
                "role": string
              }
              ...
            ]
        }
      ```

- POST /api/v1/user/login
  - description: "Autenticación de un usuario con su email y password"
  - authentication: false
  - authorization: []
  - params:

      ```javascript
        "body": {
          "email": string,
          "password": string,
        }
      ```

  - payload:

      ```javascript
        {
          "id": number,
          "name": string,
          "email": string,
          "image": string,
          "active": boolean,
          "roles": [
           {
             "id": number,
             "role": string
            }
           ...
         ],
         "token": string
        }
      ```
  
- POST /api/v1/user/{userId}/status
  - description: "Activar o desactivar un usuario. Puede hacerlo un ADMIN o el mismo usuario"
  - authentication: true
  - authorization: ['ADMIN', 'USER'] (User owner)
  - params: { userId: number }

  - payload:

      ```javascript
        {
          "id": number,
          "name": string,
          "email": string,
          "image": string,
          "active": boolean,
          "roles": [
           {
             "id": number,
             "role": string
            }
           ...
         ]
        }
      ```

- POST api/v1/user/{userId}/role
  - description: "Añade o elimina roles a un usuario. Solo puede hacerlo un Admin."
  - authentication: true
  - authorization: ['ADMIN']
  - params: { userId: number }

      ```javascript
      "body": {
        "roles": number[] // Allow: 1. Admin, 2. Seller, 3. User.
      }
      ```

  - payload:

      ```javascript
        {
          "id": number,
          "name": string,
          "email": string,
          "image": string,
          "active": boolean,
          "roles": [
           {
             "id": number,
             "role": string
            }
           ...
         ]
        }
      ```

- PUT /api/v1/user/{userId}
  - description: "Edita los detalles de un usuario. Lo puede hacer un Admin o el mismo usuario."
  - authentication: true
  - authorization: ['ADMIN', 'USER'] (User owner)
  - params: { userId: number }

      ```javascript
        "body": {
          "name": string,
          "email": string,
          "password": string,
          "active"?: boolean
        }
      ```

  - payload:

      ```javascript
        {
          "id": number,
          "name": string,
          "email": string,
          "image": string,
          "active": boolean,
          "roles": [
            {
              "id": number,
              "role": string
            }
            ...
          ]
        }
      ```

- DELETE /api/v1/user/{userId}
  - description: "Eliminación de un perfil de usuario. Lo puede hacer un Admin o el mismo Usuario."
  - authentication: true
  - authorization: ['ADMIN', 'USER'] (User owner)
  - params: { userId: number }
  - payload:

      ```javascript
        {
          "id": number,
          "name": string,
          "email": string,
          "image": string,
          "active": boolean
        }
      ```

### Articles

- GET /api/v1/article
  - description: "Obtiene una lista de artículos con estado activo"
  - authentication: false
  - authorization: []
  - query: limit?: number, page?: number
  - params: []
  - payload:

      ```javascript
        {
          "page": number,
          "limit": number,
          "total": number,
          "next": string,
          "prev": string,
          "articles": [
            {
              "id": number,
              "title": string,
              "description": string,
              "slug": string,
              "price": float,
              "active": boolean,
              "created_at": date,
              "updated_at": date,
              "author": [
                {
                  "id": number,
                  "name": string,
                  "email": string,
                  "image": string
                },
                ...
              ],
              "article_images": [
                {
                  "id": number,
                  "url_img": string
                },
                ...
              ]
              "roles": [
                {
                  "id": number,
                  "role": string
                },
                ...
              ]
            }
            ...
          ]
        }
      ```

- GET /api/v1/article/all
  - description: "Obtiene una lista de artículos independiente de si está activo o no"
  - authentication: false
  - authorization: ['ADMIN', 'SELLER']
  - query: limit?: number, page?: number
  - params: []
  - payload:

      ```javascript
        {
          "page": number,
          "limit": number,
          "total": number,
          "next": string,
          "prev": string,
          "articles": [
            {
              "id": number,
              "title": string,
              "description": string,
              "slug": string,
              "price": float,
              "active": boolean,
              "created_at": date,
              "updated_at": date,
              "author": [
                {
                  "id": number,
                  "name": string,
                  "email": string,
                  "image": string,
                  "roles": [
                    {
                      "id": number,
                      "role": string
                    },
                    ...
                  ]
                },
                ...
              ],
              "article_images": [
                {
                  "id": number,
                  "url_img": string
                },
                ...
              ]
            }
            ...
          ]

        }
      ```

- GET /api/v1/article/user/{userId}
  - description: "Obtiene una lista de artículos dependiendo de la ID del usuario"
  - authentication: false
  - authorization: { userId: number }
  - params: []
  - payload:

      ```javascript
        {
          "page": number,
          "limit": number,
          "total": number,
          "next": string,
          "prev": string,
          "articles": [
            {
              "id": number,
              "title": string,
              "description": string,
              "slug": string,
              "price": float,
              "active": boolean,
              "created_at": date,
              "updated_at": date,
              "author": [
                {
                  "id": number,
                  "name": string,
                  "email": string,
                  "image": string
                },
                ...
              ],
              "article_images": [
                {
                  "id": number,
                  "url_img": string
                },
                ...
              ]
              "roles": [
                {
                  "id": number,
                  "role": string
                },
                ...
              ]
            }
            ...
          ]
        }
      ```

- GET /api/v1/article/{articleId}
  - description: "Obtiene un artículo mediante su ID"
  - authentication: true
  - authorization: ['ADMIN', 'SELLER', 'USER'] (User owner)
  - params: { articleId: number }
  - payload:

      ```javascript
        {
          "id": number,
          "title": string,
          "description": string,
          "slug": string,
          "price": float,
          "active": boolean,
          "created_at": date,
          "updated_at": date,
          "author": [
            {
              "id": number,
              "name": string,
              "email": string,
              "image": string,
              "roles": [
                {
                  "id": number,
                  "role": string
                },
                ...
              ]
            },
            ...
          ],
          "article_images": [
            {
              "id": number,
              "url_img": string
            },
            ...
          ]
        }
      ```

- GET /api/v1/article/slug/{articleSlug}
  - description: "Obtiene un artículo a través de su Slug"
  - authentication: false
  - authorization: []
  - params: { articleSlug: string }
  - payload:

      ```javascript
        {
          "id": number,
          "title": string,
          "description": string,
          "slug": string,
          "price": float,
          "active": boolean,
          "created_at": date,
          "updated_at": date,
          "author": [
            {
              "id": number,
              "name": string,
              "email": string,
              "image": string,
              "roles": [
                {
                  "id": number,
                  "role": string
                },
                ...
              ]
            },
            ...
          ],
          "article_images": [
            {
              "id": number,
              "url_img": string
            },
            ...
          ]
        }
      ```

- POST /api/v1/article
  - description: "Crea un artículo"
  - authentication: true
  - authorization: ['ADMIN', 'SELLER', 'USER']
  - params:

    ```javascript
      "Mutipart FormData": {
        "title": string,
        "description": string,
        "price": float | number,
        "file": File[]
      }
    ```

  - payload:

    ```javascript
      {
        "id": number,
        "title": string,
        "description": string,
        "slug": string,
        "price": float,
        "active": boolean,
        "created_at": date,
        "updated_at": date,
        "author": {
          "id": number,
          "name": string,
          "email": string,
          "image": string,
          "active": boolean,
          "roles": [
            {
              "id": number,
              "role": string
            },
            ...
          ]
        },
        "article_images": [
          {
            "id": number,
            "url_img": string,
          },
          ...
        ]
      }
    ```

- POST /api/v1/article/status/{articleId}
  - description: "Cambia el estado de un artículo a inactivo/activo"
  - authentication: true
  - authorization: ['ADMIN', 'SELLER', 'USER'] (User owner)
  - params: { articleId: number }
  - payload:

      ```javascript
      {
        "id": number,
        "title": string,
        "description": string,
        "slug": string,
        "price": float,
        "active": boolean,
        "created_at": date,
        "updated_at": date,
        "author": {
          "id": number,
          "name": string,
          "email": string,
          "image": string,
          "active": boolean,
          "roles": [
            {
              "id": number,
              "role": string
            },
            ...
          ]
        },
        "article_images": [
          {
            "id": number,
            "url_img": string,
          },
          ...
        ]
      }      
      ```

- PUT /api/v1/article/{articleId}
  - description: "Edita un artículo definido por su ID"
  - authentication: true
  - authorization: ['ADMIN', 'SELLER', 'USER'] (User owner)
  - params: { articleId: number }

      ```javascript
        "body": {
          "title": string,
          "description": string,
          "price": float
        }
      ```

  - payload:

      ```javascript
        {
          "id": integer,
          "title": string,
          "description": string,
          "slug": string,
          "price": float,
          "active": boolean,
          "created_at": date,
          "updated_at": date,
          "author": {
            "id": number,
            "name": string,
            "email": string,
            "image": string,
          },
          "article_images": [
            {
              "id": number,
              "url_img": string,
            },
            ...
          ]
        }
      ```

- PUT /api/v1/article/add/image/{articleId}
  - description: "Añade imágenes a un artículo dependiendo de su ID"
  - authentication: true
  - authorization: ['ADMIN', 'SELLER', 'USER'] (User owner)
  - params: { articleId: number }

      ```javascript
        "Multipart FormData": {
          "file": File[]
        }
      ```

  - payload:

      ```javascript
        "id": number,
        "title": string,
        "description": string,
        "slug": string,
        "price": float,
        "active": boolean,
        "created_at": date,
        "updated_at": date,
        "author": {
          "id": number,
          "name": string,
          "email": string,
          "image": string,
        },
        "article_images": [
          {
            "id": number,
            "url_image": string,
          },
          ...
        ]
      ```

- PUT /api/v1/article/{articleId}/remove/image/{imageId}
  - description: "Remueve imágenes de un artículo por su ID y el ID de la imagen a remover"
  - authentication: true
  - authorization: ['ADMIN', 'SELLER', 'USER'] (User owner)
  - params: { articleId: number, imageId: number }

      ```javascript
        "Multipart FormData": {
          "file": File[]
        }
      ```

  - payload:

      ```javascript
      {
        "id": number,
        "url_img": string,
        "article_id": number
      }
      ```

- DELETE /api/v1/article/{articleId}
  - description: "Elimina definitivamente un artículo"
  - authentication: true
  - authorization: ['ADMIN', 'SELLER', 'USER'] (User owner)
  - params: { articleId: number }
  - payload:

      ```javascript
      {
        "id": number,
        "title": string,
        "description": string,
        "slug": string,
        "price": float,
        "active": boolean,
        "created_at": date,
        "updated_at": date,
        "user_id": number
      }
      ```

### 💡 Contexto del proyecto

Este proyecto sigue más o menos la Arquitectura MVC (Modelos, Vistas y Controladores) pero además añade capas como las de los servicios para gestionar las lecturas, inserciones, ediciones y eliminaciones de la Base de datos.

### 🚀 Para desarrollar

1. Clonar el proyecto.
2. Instalar los módulos de node.
3. Completar las variables de entorno.
4. Asegurarse de tener la base de datos creada y las tablas (Script sql en la carpera sql)
5. Ejecutar el proyecto con npm o yarn según su preferencia

### Congrats! 🤠
