let  users = [
    {
        "_id": "607365c283c5cd2a58ac6b3c",
        "firstName": "Thane",
        "lastName": "Garner",
        "birthday": "1906-06-04",
        "city": "Marseille",
        "playOn": "2015-02-11",
        "score": 9980,
        "__v": 0
    },
    {
        "_id": "607366a66b31ea2a5fbf85e6",
        "firstName": "Thane",
        "lastName": "Garner",
        "birthday": "1906-06-04",
        "city": "Marseille",
        "playOn": "2015-02-11",
        "score": 9986,
        "__v": 0
    }
]      


let usersorted = users.sort(function(a, b){return b.score - a.score})

console.log(usersorted)