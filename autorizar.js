require("dotenv").config();
const pool = require("./db");

//ler a chave liberada

const api_key = process.env.API_KEY_SECRET

let contador = 0

// function autenticarApiKey(req, res, next) {

//     const api_key_front = req.header('minha-chave');

//     if (api_key_front === api_key && contador <= 3) {
//         console.log("a chave é valida ", api_key_front, ' ', api_key)
//         contador = contador + 1
//         console.log(contador)
//         next()

//     }

//     else {
//         console.log("a chave é invalida", api_key_front, ' ', api_key)
//         return res.status(500).json({ mensagem: "Chave Inválida" })
//     }
// }

async function autenticarApiKey(req, res, next) {
    const api_key_front = req.header('minha-chave');
    const result = await pool.query('select * from public.api_keys where api_key ilike $1;', [api_key_front])
    console.table(result.rows.length)
    if (result.rows.length == 1) {

        let consumo1 = result.rows[0].consumo

        consumo1 = consumo1 + 1

        const resultado = await pool.query(' update public.api_keys set consumo = $1 where api_key = $2', [consumo1, api_key_front])
        
        console.table(resultado.rows.length)

        next();
    } else {
        console.log("chave errada", api_key_front)
        return res.status(500).json({ mensagem: "chave invalida api" })
    }
}


module.exports = autenticarApiKey; 