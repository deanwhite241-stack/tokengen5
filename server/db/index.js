const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'tokenforge',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Connect to MySQL
const connectDB = async () => {
  try {
    // Add connection timeout
    const connectionTimeoutMs = 30000; // 30 seconds
    const connectionPromise = pool.getConnection();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Connection timed out after ${connectionTimeoutMs}ms`));
      }, connectionTimeoutMs);
    });

    // Test connection
    const connection = await Promise.race([connectionPromise, timeoutPromise]);
    console.log(`MySQL Connected: ${connection.config.database} on ${connection.config.host}`);
    connection.release();

    // Initialize database if needed
    await initializeDatabase();

    // Set up connection health check
    if (process.env.NODE_ENV === 'production') {
      setInterval(async () => {
        try {
          const healthCheckConn = await pool.getConnection();
          await healthCheckConn.query('SELECT 1');
          healthCheckConn.release();
        } catch (error) {
          console.error('Database health check failed:', error.message);
        }
      }, 60000); // Check every minute
    }

    return pool;
  } catch (error) {
    console.error(`Error connecting to MySQL: ${error.message}`);
    // Retry logic with exponential backoff
    const retryDelay = Math.min(30000, Math.pow(2, retryCount) * 1000);
    console.log(`Retrying connection in ${retryDelay / 1000} seconds...`);
    setTimeout(() => connectDB(retryCount + 1), retryDelay);
  }
};

// Track retry attempts
let retryCount = 0;

// Initialize database tables if they don't exist
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();

    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8');
      // Split schema by semicolon to execute multiple statements
      const statements = schema
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);
      for (const stmt of statements) {
        await connection.query(stmt);
      }
      console.log('Database schema initialized');
    }

    connection.release();
  } catch (error) {
    console.error(`Error initializing database: ${error.message}`);
    throw error;
  }
};

// Query helper with error handling
const query = async (sql, params) => {
  const start = Date.now();
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.query(sql, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { sql, duration, rows: Array.isArray(rows) ? rows.length : 0 });
    }
    return rows;
  } catch (error) {
    console.error('Query error', { sql, error });
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  connectDB,
  query,
  pool
};
