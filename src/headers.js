//requerendo o dotenv para poder criar e não somente ler variáveis de ambiente no backend
require('dotenv').config({ path: '../.env' })

export default {
    Accept: 'application/json',
    Authorization: process.env.API_TOKEN,
    'Content-Type': 'application/json'
}
