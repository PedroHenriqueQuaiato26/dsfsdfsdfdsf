const crypto = require("crypto");

const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes256",
    segredo: "chavessegurasuficientementeparaaes256!", // Certifique-se de que a chave tem exatamente 32 caracteres
    tipo: "hex",
    iv: crypto.randomBytes(16) // Vetor de inicialização de 16 bytes
};

// Função para garantir que a chave tenha 32 bytes
function getKey(key) {
    return crypto.createHash('sha256').update(String(key)).digest();
}

function criptografar(senha) {
    const key = getKey(DADOS_CRIPTOGRAFAR.segredo);
    const cipher = crypto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, key, DADOS_CRIPTOGRAFAR.iv);
    let encrypted = cipher.update(senha, 'utf8', DADOS_CRIPTOGRAFAR.tipo);
    encrypted += cipher.final(DADOS_CRIPTOGRAFAR.tipo);
    return encrypted;
}

function descriptografar(senhaCriptografada) {
    const key = getKey(DADOS_CRIPTOGRAFAR.segredo);
    const decipher = crypto.createDecipheriv(DADOS_CRIPTOGRAFAR.algoritmo, key, DADOS_CRIPTOGRAFAR.iv);
    let decrypted = decipher.update(senhaCriptografada, DADOS_CRIPTOGRAFAR.tipo, 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function criptografarDuasSenhas(senha1, senha2) {
    const senhaCriptografada1 = criptografar(senha1);
    const senhaCriptografada2 = criptografar(senha2);

    return {
        senha1: senhaCriptografada1,
        senha2: senhaCriptografada2
    };
}

function descriptografarDuasSenhas(senhaCriptografada1, senhaCriptografada2) {
    const senha1 = descriptografar(senhaCriptografada1);
    const senha2 = descriptografar(senhaCriptografada2);

    return {
        senha1: senha1,
        senha2: senha2
    };
}

// Exemplo de uso
const resultadoCriptografia = criptografarDuasSenhas('postgres', 'postgres');
console.log('Criptografado:', resultadoCriptografia);

const resultadoDescriptografia = descriptografarDuasSenhas(resultadoCriptografia.senha1, resultadoCriptografia.senha2);
console.log('Descriptografado:', resultadoDescriptografia);
