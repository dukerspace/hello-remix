import axios from 'axios'
// config()

// const env = getEnv()

const url = process.env.API_URL || 'http://localhost:3001'
const api = axios.create({
	baseURL: `${url}`
})

export default api
