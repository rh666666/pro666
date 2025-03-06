<div align="center">
  English | <a href="./README_zh-CN.md">中文</a>
</div>

# Project Overview

This project is a book management system with the following main features:

- Book List: Displays information about all books, including title, author, publication year, and read count.
- Most Popular Books: Displays the books with the highest read count.
- Most Popular Authors: Displays the authors with the highest total read count.
- Latest Borrowed Books: Displays the most recently borrowed books.
- Dashboard: Displays the total number of books, total number of users, and today's borrow count.

## Directory Structure

```
.
├── src
│   ├── components
│   │   ├── BookList.vue
│   │   ├── MostPopularBooks.vue
│   │   ├── TopAuthors.vue
│   │   ├── LatestBorrowedBooks.vue
│   │   └── DashBoard.vue
│   └── mock
│       └── mock.js
└── README.md
```

## Installation and Running

1. Clone the project to your local machine:
   ```bash
   git clone <project-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the project:
   ```bash
   npm run serve
   ```

## Technologies Used

- Vue 3
- Axios
- Mock.js

## Contribution

Feel free to submit issues and contribute code! Please make sure to run all tests and pass them before submitting.

## License

This project is licensed under the MIT License.
