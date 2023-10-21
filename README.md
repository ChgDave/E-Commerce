# 13 Object-Relational Mapping (ORM): E-Commerce Back End

## Description

This is the week 13 challenge project for the Northwestern coding bootcamp. Internet retail, also known as **e-commerce**, plays a significant role within the electronics industry, as it empowers businesses and consumers alike to conveniently engage in online buying and selling of electronic products. In the latest available data from 2021, the industry in the United States alone was estimated to have generated the substantial amount of US$2.54 trillion, according to the United Nations Conference on Trade and Development. E-commerce platforms like Shopify and WooCommerce provide a suite of services to businesses of all sizes. Due to the prevalence of these platforms, developers should understand the fundamental architecture of e-commerce sites.

This application builds the back end for an e-commerce site. This application uses Express.js API to use Sequelize to interact with a MySQL database.

## Table of Contents

- [User Story](#user-story)

- [Installation](#installation)

- [Usage](#usage)

- [License](#license)

- [Github Repo](#github-repo)

- [Video Link](#video-link)

- [Questions](#questions)

## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Installation

To insall necessary dependencies, run the following command:

```
npm i
npm i inquirer@8.2.4
npm i mysql2
npm i express
npm i sequelize
npm i dotenv
```

## Usage

```
Before you start the server, you need to run the MySQL db schema files first, then seed the database with data by running npm run seed command.
Then you can start the server by npm start command.
WHEN you enter the command to invoke the application then the server is started and the Sequelize models are synced to the MySQL database.
WHEN you open API GET routes in Insomnia for categories, products, or tags, the data for each of these routes is displayed in a formatted JSON.
WHEN you test API POST, PUT, and DELETE routes in Insomnia,
you are able to successfully create, update, and delete data in my database
```

### Database Models

The database in this application contains the following four models, including the requirements listed for each model:

- `Category`

  - `id`

    - Integer.

    - Doesn't allow null values.

    - Set as primary key.

    - Uses auto increment.

  - `category_name`

    - String.

    - Doesn't allow null values.

- `Product`

  - `id`

    - Integer.

    - Doesn't allow null values.

    - Set as primary key.

    - Uses auto increment.

  - `product_name`

    - String.

    - Doesn't allow null values.

  - `price`

    - Decimal.

    - Doesn't allow null values.

    - Validates that the value is a decimal.

  - `stock`

    - Integer.

    - Doesn't allow null values.

    - Set a default value of `10`.

    - Validates that the value is numeric.

  - `category_id`

    - Integer.

    - References the `Category` model's `id`.

- `Tag`

  - `id`

    - Integer.

    - Doesn't allow null values.

    - Set as primary key.

    - Uses auto increment.

  - `tag_name`

    - String.

- `ProductTag`

  - `id`

    - Integer.

    - Doesn't allow null values.

    - Set as primary key.

    - Uses auto increment.

  - `product_id`

    - Integer.

    - References the `Product` model's `id`.

  - `tag_id`

    - Integer.

    - References the `Tag` model's `id`.

### Associations

The following relationships are created for the sequelize Models between them:

- `Product` belongs to `Category`, and `Category` has many `Product` models, as a category can have multiple products but a product can only belong to one category.

- `Product` belongs to many `Tag` models, and `Tag` belongs to many `Product` models. Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model.

## License

This project is licensed under MIT License

## Github Repo

https://github.com/ChgDave/E-Commerce

## Video Link

https://drive.google.com/file/d/1WklotD-I7olnadKsP5WyyIFPfwEyjgqO/view

## Questions

If you have any qustions about the repo, open an issue or contact me directly at chgdave@gmail.com. You can also find more of my work at [chgdave](https://github.com/chgdave).

## Review

You are required to submit BOTH of the following for review:

- A walkthrough video demonstrating the functionality of the application and all of the acceptance criteria being met.

- The URL of the GitHub repository. Give the repository a unique name and include a readme describing the project.

---

© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.

```

```
