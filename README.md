# 🧪 Cypress API Test Automation — Restful Booker

This project is an automated API test suite for the [Restful Booker](https://restful-booker.herokuapp.com) application, using [Cypress](https://www.cypress.io/) and supporting libraries.

## 🚀 Technologies Used

- [Cypress](https://docs.cypress.io/) — API testing framework  
- [Faker.js](https://fakerjs.dev/) — dynamic data generation  
- [dotenv](https://www.npmjs.com/package/dotenv) — environment variable management  
- [cypress-plugin-api](https://www.npmjs.com/package/cypress-plugin-api) — simplifies API requests in Cypress  

## 📁 Project Structure

```
📁 cypress
 ┣ 📁 e2e              → test files (e.g., create, update, delete bookings)
 ┣ 📁 fixtures         → mock data (e.g., login credentials)
 ┣ 📁 support
 ┃ ┣ 📄 commands.js    → custom Cypress commands (auth, createBooking, etc.)
 ┃ ┗ 📄 utils.js       → helper functions (e.g., date generators)
📄 .env                → environment variables (e.g., BASE_URL)
📄 cypress.config.js   → main Cypress configuration
```

## ✅ Test Coverage

- Authentication (`POST /auth`)
- Create booking (`POST /booking`)
- Get booking by ID (`GET /booking/:id`)
- Update booking (`PUT /booking/:id`)
- Delete booking (`DELETE /booking/:id`)
- Negative test scenarios for validation

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file with the following content:

```
BASE_URL=https://restful-booker.herokuapp.com
```

Or copy the example file:

```bash
cp .env.example .env
```

### 4. Run the tests

#### Using Cypress UI

```bash
npx cypress open
```

#### Headless (CLI mode)

```bash
npx cypress run
```

## 🤖 Continuous Integration

This project uses **GitHub Actions** to automatically run the Cypress tests on every `push` and `pull request`.  
You can find the workflow file under `.github/workflows/ci.yml`.

## 💡 Notes

- All requests use `cy.api()` and are based on the `baseUrl` defined in the `.env` file.
- Tests are isolated and dynamically generate data using Faker.js.
- Authentication is handled via a custom command `cy.auth()` before each test.

## 👩‍💻 Author

Giovana Oliveira