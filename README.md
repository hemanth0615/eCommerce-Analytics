# Performance Dashboard Application

This project is a comprehensive performance dashboard that visualizes sales data, offering insights into company performance. Built using React, Node.js, Express.js, PostgreSQL, JavaScript, and Highcharts, the application leverages three interconnected databases to provide detailed analytics based on customer and company selections.

## Features

- **Database Integration:** Utilizes three interconnected PostgreSQL databases (Sales, Customers, Company) with established relationships between them.
- **Data Filtering:** Allows users to filter sales data based on customer or company selection.
- **Date Picker:** Provides a date picker to select specific dates or date ranges for data analysis.
- **Charts and Visualization:** Displays various types of charts (bar, pie, line, etc.) to visualize data.
  - **Weekly, Monthly, Yearly Data:** Enables users to view company performance over different time periods.
  - **Highcharts Integration:** Uses Highcharts for creating interactive and dynamic charts.

## Technologies Used

- **Frontend:** 
  - React
  - JavaScript
  - Highcharts

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - PostgreSQL

## Installation

1. **Clone the repository:**
   ```bash
   git clone [repository URL]
   cd [repository directory]
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../server
   npm install
   ```

## Usage

1. **Run the backend server:**
   ```bash
   cd server
   npm start
   ```

2. **Run the frontend application:**
   ```bash
   cd client
   npm start
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

- **client/**: Contains the React frontend code.
- **server/**: Contains the Node.js and Express.js backend code.
- **models/**: Defines the PostgreSQL schemas and models.
- **routes/**: Contains the API routes for data retrieval.
- **controllers/**: Implements the logic for handling requests and responses.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or bugs.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries or questions, please contact M.V.V.J Naidu at whemanthnaidu@gmail.com
