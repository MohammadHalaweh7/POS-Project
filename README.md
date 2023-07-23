# POS-Project

## Table Of Content

- [Overview](#overview)
- [Features](#features)

- [Installation](#installation)

  - [Prerequisites](#prerequisites)
  - [Frontend](#frontend)
  - [Backend](#backend)

- [Pages](#pages)
  - [Login Page](#loginPage)
  - [Signup page](#signupPage)
  - [POS Page](#posPage)
  - [Dashboard Page](#dashboardPage)
  - [Products Page](#productsPage)
  - [Categories Page](#categoriesPage)
  - [Unit Of Measure Page](#unitOfMeasurePage)
- [Technologies Used](#technologiesUsed)

## Overview

The Point of Sale project is an all-inclusive web application meticulously designed for supermarkets, aiming to optimize sales and product management processes. It encompasses a wide range of functionalities, including efficient product management, seamless handling of product categories and unit of measures, and the facilitation of multiple carts for customers. With this system, users can effortlessly perform actions such as adding, updating, and deleting products, while also gaining full control over product categories and unit of measures. Additionally, customers are empowered to create and manage multiple carts to streamline their purchases, with the application providing the capability to accurately calculate the total amount for each order. Furthermore, the project incorporates a secure login page, ensuring robust authentication for authorized access.

## Installation

### Prerequisites

To successfully run the POS Project on your local machine, please ensure that you have the following prerequisites:

- Node.js
- npm

Once you have these installed, kindly proceed with the following steps to install and set up the project:

- Clone the repository: git clone https://github.com/MohammadHalaweh7/POS-Project.git

### Frontend

- cd client
- npm install
- npm start

### Backend

- cd Backend
- cd POS-Backend
- npm install
- npm run dev

## Pages : -

### Login Page:

The login page serves as a gateway, granting access to authorized users and enabling them to navigate through various system pages. Users are granted entry by providing their email and password, thus initiating the login process.

![Login Page](./Screenshoots/18.jpg)

### Signup page:

Users can utilize this page to initiate the registration process and create a new account.

![Signup Page](./Screenshoots/19.jpg)
If you neglect to fill in the fields, this scenario appears due to the use of the Formik validation schema.

And when you enter existing data, a popup will show you that the user already exists by using React-Toastify
![Signup Page - Validation](./Screenshoots/20.jpg)

### POS Page:

The cashier's cart management page provides comprehensive functionality for efficiently handling customers' carts. It enables cashiers to create and manage multiple carts, accompanied by the option to include descriptions for additional information.

Key Features:

- The page incorporates a user-friendly interface to initiate new cart checkouts.
- Multiple carts can be effortlessly managed simultaneously, each assigned a unique identifier.
- Custom descriptions can be seamlessly added to individual carts, enhancing cart organization.
- Users have the ability to add products to the cart, ensuring accurate tracking of customer purchases.
- The quantity of added products can be easily modified as per user requirements.
- Effortless removal of unwanted products from the cart is facilitated through the deletion feature.
- Users can conveniently edit the applied tax, accommodating various tax rates and regulations.
- The flexibility to apply discounts allows cashiers to implement special offers and promotions.
- An intuitive product search and filter system empowers users to locate specific items based on categories.
  In summary, the cashier's cart management page streamlines the process of managing customers' carts, providing essential features to facilitate efficient checkout operations.

![POS Page](./Screenshoots/22.jpg)

Dark mode : 

![POS Page dark mode](./Screenshoots/30.jpg)

After successfully adding a product to your cart, a pop-up message will appear stating "Product added to cart successfully."
![POS Page](./Screenshoots/23.jpg)

#### Multiple Carts:

- Individual carts store their own sets of products, quantities, tax rates, and discount information, ensuring accurate and independent cart management.
- Seamlessly switching between different carts is facilitated, allowing cashiers to handle multiple customers and transactions efficiently.
- Each cart features a dedicated checkout button, streamlining the process of finalizing the selected items and completing the transaction.

In this scenario, you have the option to create a new cart.
![POS Page](./Screenshoots/24.jpg)
After click on add cart button the popup will appear for you to make sure that you actually want to create it or not
![POS Page](./Screenshoots/25.jpg)
If you create a cart that already exists, the following message will appear.
![POS Page](./Screenshoots/26.jpg)
![POS Page](./Screenshoots/27.jpg)
When you click on checkout button, It will calculate the total price for the selected cart.
![POS Page](./Screenshoots/28.jpg)
When you click on cancel button, It will delete the items in the cart
![POS Page](./Screenshoots/29.jpg)

### Dashboard Page

This page displays a comprehensive set of statistics and graphs illustrating the existing categories along with their respective percentages. Additionally, it provides detailed information about all the products available, including relevant data and attributes.

![Dashboard Page](./Screenshoots/1.jpg)
![Dashboard Page](./Screenshoots/2.jpg)
![Dashboard Page](./Screenshoots/3.jpg)

### Products Page

The Products page showcases a comprehensive list of all system products, granting users the ability to seamlessly perform various actions:

- View product details, including the product name, code, category, image, price, and unit of measure.
- Add a new product by providing the required information.
- Update an existing product's details.
- Delete a product from the system.
- Search by the product name and filter the list of products by category.

![Products Page](./Screenshoots/4.jpg)
When you click on "Add New Product," a modal window will appear.
![Products Page](./Screenshoots/5.jpg)

### Categories Page

The Product Categories page serves as a centralized platform within the system, presenting users with a comprehensive list of all available product categories. This page provides users with the necessary functionality to effortlessly view, add, update, and delete product categories.

Each product category listed on the page possesses a single defining property:

- Category Name: Clearly identifies the name or title assigned to each product category, providing a distinctive label for categorization purposes.
  Functionality:
- Viewing Categories.
- Adding Categories.
- Updating Categories.
- Deleting Categories.

![Categories Page](./Screenshoots/6.jpg)
![Categories Page](./Screenshoots/7.jpg)

### Unit Of Measure Page

The Unit of Measure page offers users an intuitive and streamlined experience in managing unit of measures. By providing the functionality to view, add, update, and delete unit of measures, this page promotes accuracy and consistency in measurements across the system.

Each unit of measure listed on the page possesses the following properties:

- Unit of Measure Name.
- Base Unit of Measure.
- Conversion Factor to the Base Unit of Measure.

Functionality:

- View all units of measure and their details, including the name, base unit of measure, and conversion factor.
- Add a new unit of measure.
- Update an existing unit of measure's details.
- Delete a unit of measure from the system.
- Search by the unit name

![Unit Of Measure Page](./Screenshoots/8.jpg)
![Unit Of Measure Page](./Screenshoots/9.jpg)
![Unit Of Measure Page](./Screenshoots/10.jpg)

Here are some scenarios where you may want to perform operations on a table like adding, deleting, Updating and Searching
![Some scenarios](./Screenshoots/11.jpg)
![Some scenarios](./Screenshoots/12.jpg)
![Some scenarios](./Screenshoots/13.jpg)
![Some scenarios](./Screenshoots/14.jpg)
![Some scenarios](./Screenshoots/15.jpg)
![Some scenarios](./Screenshoots/16.jpg)
![Some scenarios](./Screenshoots/17.jpg)

## Technologies Used

- [React](https://reactjs.org/): The library for web user interfaces.
- [React-router](https://reactrouter.com/): A declarative routing library for React that handles client-side routing

- [Redux Toolkit](https://redux-toolkit.js.org/): A predictable state container for JavaScript applications.
- [Formik](https://formik.org/): A form library for React that simplifies form management.
- [Yup](https://github.com/jquense/yup): Yup is a schema builder for runtime value parsing and validation.
- [Material UI](https://mui.com/material-ui/getting-started/): Material UI is a library of React UI components that implements Google's Material Design.
- [Font Awesome](https://fontawesome.com/): Font Awesome is the Internet's icon library and toolkit.
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/): Bootstrap is a powerful, feature-packed frontend toolkit.
- [Recharts](https://recharts.org/en-US/): A composable charting library built on React components.
- [SweetAlert2](https://sweetalert2.github.io/): A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes.
- [React-Toastify](https://www.npmjs.com/package/react-toastify): React-Toastify allows you to add notifications to your app with ease.
- [React slick](https://react-slick.neostack.com/docs/get-started): React slick is a carousel component built with React. It is a react port of slick carousel.
- [NodeJS Backend](https://nodejs.org/en): Node.js® is an open-source, cross-platform JavaScript runtime environment.
