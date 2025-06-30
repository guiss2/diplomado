// function validate(schema, target = 'body') {
//   return (req, res, next) => {
//     const data = req[target];
//     // paso 1 verificar que hayan datos
//     if (!data || Object.keys(data).length === 0) {
//       return res.status(400).json({ message: 'No data found' });
//     }
//     //paso 2 validar el esquema
//     const { error, value } = schema.validate(data, {
//       abortEarly: false, // para que devuelva todos los errores
//       stripUnknown: true, // para que elimine las propiedades que no esten en el esquema
//     })
//     // paso 3 si hay error, devolver el error
//     if (error) {
//       return res.status(400).json({
//         message: `Error de validacion en : ${target}`,
//         errores: error.details.map(err => err.message)
//       })
//     }
//     //paso 4 reemplzar el objeto principal con los datos likmpios
//     req[target] = value;
//     //continuamos.... 
//     next();
//   }
// }
// export default validate 
// validate.js

function validate(schema, target = 'body') {
  return (req, res, next) => {
    // 1 Obtener los datos que queremos validar (por defecto, req.body)
    const data = req[target];

    // 2️ Validamos los datos usando el esquema Joi
    const { error, value } = schema.validate(data, {
      abortEarly: false,    // muestra todos los errores a la vez
      stripUnknown: true    // elimina propiedades no definidas en el esquema
    });

    // 3️ Si hay error, lo devolvemos con código 400
    if (error) {
      return res.status(400).json({
        message: `Error de validación en: ${target}`,
        errores: error.details.map(err => err.message)
      });
    }

    // 4️ Creamos un objeto llamado req.validated si no existe
    if (!req.validated) {
      req.validated = {};
    }

    // 5️ Guardamos los datos validados según el tipo: 'query', 'body', etc.
    req.validated[target] = value;

    // 6️ Continuamos con el siguiente middleware o controlador
    next();
  };
}

export default validate;
