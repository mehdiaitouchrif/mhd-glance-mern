const errorHandler = (errObj) => {
    let errors = [];
    Object.keys(errObj.errors).forEach(key => {
        const error =  { [key]: errObj.errors[key].message } 
        return errors.push(error)
    })
    return errors;
}


module.exports = errorHandler;