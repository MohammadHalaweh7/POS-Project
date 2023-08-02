# POS Backend

Express.js-based web application for managing products, product categories, and unit of measures. Provides CRUD operations for each of them.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- npm

## Step 1: Clone the repository

Clone the repository to your local machine

## Step 2: Install Dependencies

Navigate to the project directory and run `npm install `

## Step 3: Start the App

Start the application by running `npm start`
The app will be running at http://localhost:5050.

# Usage

Access the application by visiting http://localhost:5050 in your web browser.
Use the provided API endpoints to manage products, product categories, and unit of measures.

# API Specifications

## Authentication

> #### Create a new user
>
> - Endpoint: `/sign-up`
> - Method: POST
> - Description: Creates a new user.
> - Request Body:
>   - `userName` (string) - The name of the user.
>   - `email` (string) - The email of the user (must be as email format).
>   - `password` (string) - The password of the usre (must be 5-length at least)
> - Response: Returns the created user object if successful, or an error message if unsuccessful.

> #### Login the user
>
> - Endpoint: `/login`
> - Method: POST
> - Description: Login the existed user
> - Request Body:
>   - `email` (string) - The email of the user 
>   - `password` (string) - The password of the usre 
> - Response: Returns the Access Token object if successful, or an error message if unsuccessful.

### Important Notes

- Ensure that the access token is included in every authenticated API request header .
- Take note of token expiration and implement the necessary token refresh mechanism if applicable.

## Products

> #### Retrieve all products
>
> - Endpoint: `/products`
> - Method: GET
> - Description: Retrieves all products.
> - Response: Returns an array of product objects.

> #### Retrieve a specific product
>
> - Endpoint: `/products/:productId`
> - Method: GET
> - Description: Retrieves a specific product based on the provided productId.
> - Parameters:
>   - `productId` (number) - The ID of the product.
> - Response: Returns the product object if found, or an error message if not found.

> #### Create a new product
>
> - Endpoint: `/products`
> - Method: POST
> - Description: Creates a new product.
> - Request Body:
>   - `name` (string) - The name of the product.
>   - `code` (string) - The code of the product.
>   - `quantity` (number) - The quantity of the product.
>   - `image` (optional, string) - The image URL of the product.
>   - `price` (number) - The price of the product.
>   - `categoryId` (number) - The ID of the product category.
>   - `unitId` (number) - The ID of the unit of measure.
> - Response: Returns the created product object if successful, or an error message if unsuccessful.

> #### Update a specific product
>
> - Endpoint: `/products/:productId`
> - Method: PUT
> - Description: Updates a specific product based on the provided productId.
> - Parameters:
>   - `productId` (number) - The ID of the product.
> - Request Body:
>   - `name` (string) - The updated name of the product.
>   - `code` (string) - The updated code of the product.
>   - `quantity` (number) - The quantity of the product.
>   - `image` (optional, string) - The updated image URL of the product.
>   - `price` (number) - The updated price of the product.
>   - `categoryId` (number) - The updated ID of the product category.
>   - `unitId` (number) - The updated ID of the unit of measure.
> - Response: Returns the updated product object if successful, or an error message if unsuccessful.

> #### Delete a specific product
>
> - Endpoint: `/products/:productId`
> - Method: DELETE
> - Description: Deletes a specific product based on the provided productId.
> - Parameters:
>   - `productId` (number) - The ID of the product.
> - Response: Returns a success message if the product is deleted successfully, or an error message if not found.

## Product Categories

> #### Retrieve all categories
>
> - Endpoint: `/product-categories`
> - Method: GET
> - Description: Retrieves all product categories.
> - Response: Returns an array of product category objects.

> #### Retrieve a specific category
>
> - Endpoint: `/product-categories/:categoryId`
> - Method: GET
> - Description: Retrieves a specific product category based on the provided categoryId.
> - Parameters:
>   - `categoryId` (number) - The ID of the product category.
> - Response: Returns the product category object if found, or an error message if not found.

> #### Create a new category
>
> - Endpoint: `/product-categories`
> - Method: POST
> - Description: Creates a new product category.
> - Request Body:
>   - `categoryName` (string) - The name of the product category.
> - Response: Returns the created product category object if successful, or an error message if unsuccessful.

> #### Update a specific category
>
> - Endpoint: `/product-categories/:categoryId`
> - Method: PUT
> - Description: Updates a specific product category based on the provided categoryId.
> - Parameters:
>   - `categoryId` (number) - The ID of the product category.
> - Request Body:
>   - `categoryName` (string) - The updated name of the product category.
> - Response: Returns the updated product category object if successful, or an error message if unsuccessful.

> #### Delete a specific category
>
> - Endpoint: `/product-categories/:categoryId`
> - Method: DELETE
> - Description: Deletes a specific product category based on the provided categoryId.
> - Parameters:
>   - `categoryId` (number) - The ID of the product category.
> - Response: Returns a success message if the product category is deleted successfully, or an error message if not found.

## Unit of Measures

> #### Retrieve all unit of measures
>
> - Endpoint: `/unit-of-measures`
> - Method: GET
> - Description: Retrieves all unit of measures.
> - Response: Returns an array of unit of measure objects.

> #### Retrieve a specific unit of measure
>
> - Endpoint: `/unit-of-measures/:unitId`
> - Method: GET
> - Description: Retrieves a specific unit of measure based on the provided unitId.
> - Parameters:
>   - `unitId` (number) - The ID of the unit of measure.
> - Response: Returns the unit of measure object if found, or an error message if not found.

> #### Create a new unit of measure
>
> - Endpoint: `/unit-of-measures`
> - Method: POST
> - Description: Creates a new unit of measure.
> - Request Body:
>   - `unitName` (string) - The name of the unit of measure.
>   - `baseUnit` (string) - The base unit of measure.
>   - `conversionFactor` (number) - The conversion factor of the unit of measure.
> - Response: Returns the created unit of measure object if successful, or an error message if unsuccessful.

> #### Update a specific unit of measure
>
> - Endpoint: `/unit-of-measures/:unitId`
> - Method: PUT
> - Description: Updates a specific unit of measure based on the provided unitId.
> - Parameters:
>   - `unitId` (number) - The ID of the unit of measure.
> - Request Body:
>   - `unitName` (string) - The updated name of the unit of measure.
>   - `baseUnit` (string) - The updated base unit of measure.
>   - `conversionFactor` (number) - The updated conversion factor of the unit of measure.
> - Response: Returns the updated unit of measure object if successful, or an error message if unsuccessful.

> #### Delete a specific unit of measure
>
> - Endpoint: `/unit-of-measures/:unitId`
> - Method: DELETE
> - Description: Deletes a specific unit of measure based on the provided unitId.
> - Parameters:
>   - `unitId` (number) - The ID of the unit of measure.
> - Response: Returns a success message if the unit of measure is deleted successfully, or an error message if not found.

## Checkout

> - Endpoint: `/checkout`
> - Method: POST
> - Description: Creates a new unit of measure.
> - Request Body:
>   - `products` (array, required): An array of objects representing the products in the shopping cart. Each product object should have the following properties:
>      - `name` (string, required): The name of the product.
>      - `code` (string, required): The unique code or identifier of the product.
>      - `quantity` (number, required): The quantity of the product.
>      - `price` (number, required): The price of the product.
>   - `tax` (number, required): The tax rate to be applied to the total price.
>   - `discount` (number, required): The discount rate to be applied to the total price.
> - Response: Returns the totalPrice  if successful, or an error message if unsuccessful.
