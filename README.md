# Outline
- See demo video "How it works"
- Main user features
- Used technologies and architecture
    - SPA
    - Docker
    - PHP Symfony4
    - PostgreSQL
    - Angular 7(NgRx)
    - Secure picture retrieving
    - Behat tests

### 1. See demo video "How it works"
##### You can take a look a demo video of this project on https://www.youtube.com/watch?v=gqJZ1np0eHg


### 2. Main user features
The main idea of this application is to give user to manage their own text notes.
1. There is a security system. User can login by email and password or create a new account as well.
2. User can manage their notepads - to create, edit, delete and see list of items.
3. User can manage their notes - to create, edit, delete, look at details and manage of list.
Note form allows to attach pictures to note as well.

### 3. Used technologies and architecture
This project is developed as a single page application with backend json api. Client application is based on Angular 7
javascript framework and uses http protocol to interact with server. To manage frontend state the library NgRx is used.

In the same time, backend uses php symfony 4 and provides json api to manage database entities.
To secure any requests between client and server the JWT(JSON Web Token) technology is used.

Any attachments are protected by token as well. Each request should provide a secure token to get file.

The backend part is represented as composition of microservices which was put in docker containers: nginx web server, php application and postgresql database.

To test json api the behat framework is used.

The frontend application is placed at /frontend directory.

