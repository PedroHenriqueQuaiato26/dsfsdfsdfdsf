// Criptografar a senha (Logica )


const crypto = require("crypto");

const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes256",
    segredo: "chavessegurasuficientementeparaaes256!", // Certifique-se de que a chave tem exatamente 32 caracteres
    tipo: "hex",
    iv: crypto.randomBytes(16) // Vetor de inicialização de 16 bytes
};

// Certifique-se de que a chave tem exatamente 32 bytes
function getKey(key) {
    return crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
}

function criptografar(senha) {
    const key = getKey(DADOS_CRIPTOGRAFAR.segredo);
    const cipher = crypto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, key, DADOS_CRIPTOGRAFAR.iv);
    let encrypted = cipher.update(senha, 'utf8', DADOS_CRIPTOGRAFAR.tipo);
    encrypted += cipher.final(DADOS_CRIPTOGRAFAR.tipo);
    return encrypted;
}

function criptografarDuasSenhas(senha1, senha2) {
    const senhaCriptografada1 = criptografar(senha1);
    const senhaCriptografada2 = criptografar(senha2);

    return {
        senha1: senhaCriptografada1,
        senha2: senhaCriptografada2
    };
}

// Exemplo de uso
const resultado = criptografarDuasSenhas('minhaSenhaSecreta1', 'minhaSenhaSecreta2');
console.log(resultado);
