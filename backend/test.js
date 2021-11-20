a = [0,1,2,3,4,5,6,7,8,9]
console.log(a.slice(0,6))
console.log(a.slice(6,10))

const bcrypt = require('bcrypt')
const saltRounds = 10


a ='$2b$10$k.G7IApbDzI44knlof02WusR9JfMndgF1QWZx.WBGip4491C/1TyG'
b = '$2b$10$gJ77zknKjMoZ1gF2cFRYROzDsOOluwP1eYrhDyJkFbuclrpjQDhKy'

bcrypt.compare('blue1234', b, (err, result) => {
    console.log(err)
    console.log(result)
})