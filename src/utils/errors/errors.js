const generateInvalidCredentialsUserData = ({ email, password }) => {
    return `Credenciales de usuario inválidas:
    * email: No puede enviar un string vacio ${email}(${typeof email})
    * password: No puede enviar un string vacio ${password} (${typeof password})`
}

const generateInvalidCartId = ({ id }) => {
    return `El carrito id ${id} no corresponde con ningún carrito cargado en la base de datos.`
}

const generateInvalidProductData = ({ title, description, price, thumbnail, code, status, stock, category }) => {
    return `Datos del producto inválidos:
    * titulo: No puede enviar un string vacio ${title}(${typeof title})
    * descripcion: No puede enviar un string vacio ${description}(${typeof description})
    * precio: No puede enviar un number vacio ${price}(${typeof price})
    * thumbnail: No requerido ${thumbnail}
    * code: No puede enviar un string vacio y debe ser único ${code}(${typeof code})
    * status: No requerido ${status}
    * stock: No puede enviar un number menor a 0 ${stock}(${typeof stock})
    * category: No puede enviar un string vacio ${category}(${typeof category})`
}

module.exports = { generateInvalidCredentialsUserData, generateInvalidCartId, generateInvalidProductData };