export const inDev = process.env.NODE_ENV === 'development'

export const ep = inDev ? 'http://localhost:1337/' : 'https://api.courseadvysr.com/'