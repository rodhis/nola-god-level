import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Validate required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD']
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
}

// PostgreSQL connection pool
// pg Pool manages multiple connections for better performance
const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

export default pool
