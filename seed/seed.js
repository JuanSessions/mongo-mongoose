// this is the way to check that it works before you actually put and store data in mongo



const mongoose = require("mongoose")
const User = require("../models/userSchema")
const faker = require("faker")


const main = async() => {
    mongoose.connect("mongodb://127.0.0.1:27017/record-shop-mongo", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.on("error", (err) => console.log(err))
    mongoose.connection.on("open", () => console.log("database connected"))

    try {
        await User.deleteMany({}) //passing empty object means u r deleting everything
        console.log("refresh/deleting users collection")
    } catch (err) {
        console.log(error)
    }

    //array with 10empty spaces and map through it like tic-tac-toe exercise
    const userPromises = Array(10).fill(null).map(() => {

        const user = new User({
            //will create a user for u
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        })
        return user.save() //in mongo u use method "save" to store
    })
    try {
        await Promise.all(userPromises)
        console.log("Users Added into the database")

    } catch (err) {
        console.log(err)
    }
    //10 random fake users created trough the faker
}

main();