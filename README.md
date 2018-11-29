# Project Overview

This project was developed to access a `lease Web API`, to gather information about
all the available tenants and their rental payments.

# Running the app

### `$ git clone https://github.com/andresrgallo/rental-app.git`

### `$ cd rental-app`

### `$ npm install`

### `$ npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Running the Tests

### `$ npm test`

### `type <a> to run all the tests`

## Languages and Tools

- The project was build using the React library and plain CSS.
- The project includes media queries for small phones, tablets and laptops.
- For testing, two libraries were installed: `Jest` and `Enzyme`

# Project Construction

## User Stories

**Feature** See a welcome page When accessing http://localhost:3000

- When I type the app url I want to see a navigation bar with links to
  where I want to go
- I should always be able to go back to the home page by clicking the companies logo or name at the navigation bar.

**Feature** Navigation Bar

- I want to see at all times a navigation bar so I can move around easily.

**Feature** Browse app by clicking the tenants link at the navigation bar

- When clicking the tenants link, I want to be redirected to a list with all the tenants available.

**Feature** Browse to Tenants page by accessing http://localhost:3000/leases

- When typing the url I want to be redirected to the `Tenants` list page.

**Feature** Tenant page

- When clicking any of the `Lease IDs` I want to be redirected to the corresponding `Tenant` payments page.

**Feature** Browse to Tenants page by accessing http://localhost:3000/leases.html?leaseId=123

- I will be redirected to the tenant page with ID=123
- A list with all the payments will be displayed

**Feature** Tenants page

- I want to see all the Tenant payment ledger for all the tenancy contract.
- I want to see all the payment details, from the start of the lease to the end.
- I want to see all frequency periods, from - to dates, days per period and total amount to be paid.

**Feature** Browse to wrong URL

- I want to see a page with a message saying that the requested page has not been found.

## Components

In order to fulfil user stories, the following react components were built:

- **Home:** A welcome page with the companies industry
- **NavBar:** A navigation bar with two links, home and tenants list.
- **NotFound:** A 404 page displayed when a url not recognized by the router is typed.
- **Tenants:** A Table-list with all the Tenants available.
- **Tenant:** A component that renders a Table-list with the payment ledger of a specific tenant. It renders the RentPayments component.
- **RentPayments:** A component that encapsulates all the logic and manipulation of dates.
- **AsyncComponent:** To enable `lazy loading`

### Lazy loading

Lazy loading was added to decrease loading times by only uploading the components that are needed. If the app continues to grow, lazy loading benefits will increase.
