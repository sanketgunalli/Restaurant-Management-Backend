const testUserController = (req,res) => {
    try {
        res.status(200).send("<h1> Test user Data</h1>")
// res.status(200).send({
//     success:true,
//     message: "test user Data API",
// })
    } catch (error) {
console.log('error in test API', error)
    }
};

module.exports = {testUserController};