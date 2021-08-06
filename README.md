# Object-Relation Mapping

### Quickstart
```sh
$ npm install

# after db setup
$ npx nodemon app.js
# now, point your browser to localhost:3000
```

### Database setup using sequelize-cli

First, initialize sequelize in your project using the CLI
```sh
$ npx sequelize-cli init
```
Then, update `config/config.js` so you can use env vars, and update the `.env` file with your env vars
```js
// config/config.js
require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: '127.0.0.1',
    dialect: 'postgres'
  }
}
```

Now, create your database
```sh
$ createdb catbook # set up your development database
```

### Generating models and migrations with the CLI

```sh
# To generate a `Cat` model with attributes `name`, `breed`, `owner`
$ npx sequelize-cli model:generate --name Cat --attributes name:string,breed:string,owner:string

# To run migrations
$ npx sequelize-cli db:migrate
```

### Instructions

#### Associating Cats and Comments
> Cat `hasMany` Comments, Comment `belongsTo` Cat

To create the table associations using sequelize,

1. Use sequelize-cli to generate a model for Comment, with attributes `text:string,CatId:integer`
2. Edit the migration file to specify that `CatId` is a foreign key by adding a reference to the `Cats` table primary key (`id`)
3. Run the migration
4. Set properties on the model with values of the invoked association methods so that sequelize associates the models

```js
// models/cat.js
class Cat extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.Comments = this.hasMany(models.Comment, { onDelete: 'cascade' })
  }
}
```
```js
// models/comment.js
class Comment extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.Cat = this.belongsTo(models.Cat)
  }
}
```

### Further
- Use sequelize-cli to generate a model `Owner` with a name attribute and the corresponding migration file.
- Associate the models and tables in 1:many relationships.
```
An owner has many cats and has many comments
A cat belongs to an owner (this might not be representative given cats think owners belong to them, but this is just an exercise..)
A comment belongs to an owner
```
### Resources

- [Sequelize Basic Queries](https://sequelize.org/master/manual/model-querying-basics.html)
- [Sequelize CLI](https://sequelize.org/master/manual/migrations.html)
- [Sequelize Associations](https://sequelize.org/master/manual/assocs.html)
