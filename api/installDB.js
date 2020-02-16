/**
 * STARTUP DB on startup app with testing data
 * 0. Connect via mongoose & call Advert model
 * 1. Remove all previous adverts
 * 2. Generate a new set of values for add adverts collection
 * 3. Create adverts indexes
 * v2 4. Create User collection
 * v2 5. Create User example
 */
require('dotenv').config();

// const db = require('../lib/connectMongoose');
const db = require('./lib/connectMongoose');
const Advert = require('./models/Advert');
const User = require('./models/User');

const advertsArray = [
    {
        "_id": "5e435f80faf3a305e410e673",
        "type": "sell",
        "status": "",
        "image": "lifestyle1.jpg",
        "tags": [
            "lifestyle",
            "mobile"
        ],
        "active": true,
        "name": "Sem fringilla ut morbi tincidunt",
        "owner": "5e3fb4810223813c34921164",
        "price": 150,
        "description": "Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ",
        "created": "2020-02-01T07:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e674",
        "type": "sell",
        "status": "reserved",
        "image": "lifestyle2.jpg",
        "tags": [
            "lifestyle",
            "work"
        ],
        "active": true,
        "name": "Vulputate sapien nec sagittis aliquam",
        "owner": "5e40fb109f22490b1cd9b5a0",
        "price": 15,
        "description": "Eget gravida cum sociis natoque penatibus et. ",
        "created": "2020-02-01T06:50:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e675",
        "type": "sell",
        "status": "",
        "image": "lifestyle3.jpg",
        "tags": [
            "lifestyle"
        ],
        "active": true,
        "name": "Et odio pellentesque diam",
        "owner": "5e3fb4810223813c34921164",
        "price": 80.2,
        "description": "Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ",
        "created": "2020-01-31T19:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e676",
        "type": "sell",
        "status": "sold",
        "image": "motor1.jpg",
        "tags": [
            "motor",
            "mobile",
            "lifestyle"
        ],
        "active": true,
        "name": "Sem fringilla ut morbi tincidunt",
        "owner": "5e40faae9f22490b1cd9b59f",
        "price": 150,
        "description": "Eget gravida cum sociis natoque penatibus et. ",
        "created": "2020-01-31T07:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e677",
        "type": "buy",
        "status": "",
        "image": "motor2.jpg",
        "tags": [
            "motor",
            "work"
        ],
        "active": true,
        "name": "Ullamcorper dignissim cras tincidunt",
        "owner": "5e3fb4810223813c34921164",
        "price": 180,
        "description": "Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.",
        "created": "2020-01-30T07:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e678",
        "type": "buy",
        "status": "",
        "image": "motor3.jpg",
        "tags": [
            "motor",
            "lifestyle"
        ],
        "active": true,
        "name": "Ante metus dictum at tempor commodo",
        "owner": "5e40faae9f22490b1cd9b59f",
        "price": 80,
        "description": "Ullamcorper dignissim cras tincidunt lobortis. Ante metus dictum at tempor commodo.  Ullamcorper dignissim cras tincidunt lobortis.",
        "created": "2020-01-29T07:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e679",
        "type": "sell",
        "status": "",
        "image": "mobile1.jpg",
        "tags": [
            "mobile",
            "lifestyle"
        ],
        "active": true,
        "name": "Vulputate sapien nec sagittis aliquam malesuada",
        "owner": "5e40fb109f22490b1cd9b5a0",
        "price": 150,
        "description": "Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ",
        "created": "2020-01-28T17:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e67a",
        "type": "sell",
        "status": "reserved",
        "image": "mobile2.jpg",
        "tags": [
            "mobile",
            "work"
        ],
        "active": true,
        "name": "Mauris a diam maecenas sed enim ut sem viverra",
        "owner": "5e3fb4810223813c34921164",
        "price": 45,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim ut sem viverra. ",
        "created": "2020-02-10T17:00:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e67b",
        "type": "sell",
        "status": "reserved",
        "image": "mobile3.jpg",
        "tags": [
            "mobile"
        ],
        "active": true,
        "name": "Lorem ipsum dolor sit amet",
        "owner": "5e3fb4810223813c34921164",
        "price": 120,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim ut sem viverra. ",
        "created": "2020-02-09T18:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e67c",
        "type": "sell",
        "status": "sold",
        "image": "work1.jpg",
        "tags": [
            "work",
            "mobile",
            "lifestyle"
        ],
        "active": true,
        "name": "Qignissim cras tincidunt lobortis",
        "owner": "5e40fb109f22490b1cd9b5a0",
        "price": 150,
        "description": "Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.",
        "created": "2020-02-10T08:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e67d",
        "type": "buy",
        "status": "",
        "image": "work2.jpg",
        "tags": [
            "work"
        ],
        "active": true,
        "name": "Neque laoreet suspendisse interdum ",
        "owner": "5e40fb109f22490b1cd9b5a0",
        "price": 15,
        "description": "Eget gravida cum sociis natoque penatibus et. Neque laoreet suspendisse interdum consectetur libero. Nullam non nisi est sit. ",
        "created": "2020-02-03T17:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e67e",
        "type": "buy",
        "status": "",
        "image": "work3.jpg",
        "tags": [
            "work",
            "lifestyle"
        ],
        "active": true,
        "name": "Eu nisl nunc mi ipsum faucibus vitae",
        "owner": "5e3fb4810223813c34921164",
        "price": 80,
        "description": "Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ",
        "created": "2020-02-02T15:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e67f",
        "type": "sell",
        "status": "",
        "image": "lifestyle1.jpg",
        "tags": [
            "lifestyle",
            "mobile"
        ],
        "active": true,
        "name": "Aliquam malesuada bibendum",
        "owner": "5e3fb4810223813c34921164",
        "price": 150,
        "description": "Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ",
        "created": "2019-02-01T07:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e680",
        "type": "sell",
        "status": "reserved",
        "image": "lifestyle2.jpg",
        "tags": [
            "lifestyle",
            "work"
        ],
        "active": true,
        "name": "Natoque penatibus et",
        "owner": "5e40fb109f22490b1cd9b5a0",
        "price": 15,
        "description": "Eget gravida cum sociis natoque penatibus et. ",
        "created": "2019-02-01T06:50:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e681",
        "type": "sell",
        "status": "",
        "image": "lifestyle3.jpg",
        "tags": [
            "lifestyle"
        ],
        "active": true,
        "name": "Tapien nec sagittis aliquam malesuada bibendum",
        "owner": "5e3fb4810223813c34921164",
        "price": 80,
        "description": "Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ",
        "created": "2019-01-31T19:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e682",
        "type": "sell",
        "status": "sold",
        "image": "motor1.jpg",
        "tags": [
            "motor",
            "mobile",
            "lifestyle"
        ],
        "active": true,
        "name": "Patoque penatibus et",
        "owner": "5e40faae9f22490b1cd9b59f",
        "price": 150,
        "description": "Eget gravida cum sociis natoque penatibus et. ",
        "created": "2019-01-31T07:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e683",
        "type": "buy",
        "status": "",
        "image": "motor2.jpg",
        "tags": [
            "motor",
            "work"
        ],
        "active": true,
        "name": "Ante metus dictum at tempor commodo",
        "owner": "5e3fb4810223813c34921164",
        "price": 180,
        "description": "Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.",
        "created": "2019-01-30T07:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e684",
        "type": "buy",
        "status": "",
        "image": "motor3.jpg",
        "tags": [
            "motor",
            "lifestyle"
        ],
        "active": true,
        "name": "Eu nisl nunc mi ipsum faucibus vita",
        "owner": "5e40faae9f22490b1cd9b59f",
        "price": 80,
        "description": "Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ",
        "created": "2019-01-29T07:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e685",
        "type": "sell",
        "status": "",
        "image": "mobile1.jpg",
        "tags": [
            "mobile",
            "lifestyle"
        ],
        "active": true,
        "name": "Malesuada bibendum",
        "owner": "5e40fb109f22490b1cd9b5a0",
        "price": 150,
        "description": "Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ",
        "created": "2019-01-28T17:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e686",
        "type": "sell",
        "status": "reserved",
        "image": "mobile2.jpg",
        "tags": [
            "mobile",
            "work"
        ],
        "active": true,
        "name": "Ked do eiusmod tempor incididunt ut",
        "owner": "5e3fb4810223813c34921164",
        "price": 45,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim ut sem viverra. ",
        "created": "2019-02-10T17:00:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e687",
        "type": "sell",
        "status": "reserved",
        "image": "mobile3.jpg",
        "tags": [
            "mobile"
        ],
        "active": true,
        "name": "Xenim ut sem viverra",
        "owner": "5e3fb4810223813c34921164",
        "price": 120,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim ut sem viverra. ",
        "created": "2019-02-09T18:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e688",
        "type": "sell",
        "status": "sold",
        "image": "work1.jpg",
        "tags": [
            "work",
            "mobile",
            "lifestyle"
        ],
        "active": true,
        "name": "Pretincidunt lobortis",
        "owner": "5e40fb109f22490b1cd9b5a0",
        "price": 150,
        "description": "Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.",
        "created": "2019-02-10T08:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e689",
        "type": "buy",
        "status": "",
        "image": "work2.jpg",
        "tags": [
            "work"
        ],
        "active": true,
        "name": "Claoreet suspendisse interdum",
        "owner": "5e40fb109f22490b1cd9b5a0",
        "price": 15,
        "description": "Eget gravida cum sociis natoque penatibus et. Neque laoreet suspendisse interdum consectetur libero. Nullam non nisi est sit. ",
        "created": "2019-02-03T17:56:00.000+0000",
    },
    {
        "_id": "5e435f80faf3a305e410e68a",
        "type": "buy",
        "status": "",
        "image": "work3.jpg",
        "tags": [
            "work",
            "lifestyle"
        ],
        "active": true,
        "name": "Faucibus vitae aliquet",
        "owner": "5e3fb4810223813c34921164",
        "price": 80,
        "description": "Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ",
        "created": "2019-02-02T15:56:00.000+0000",
    }
];

const userArray = [
    {
        username: 'user',
        email: 'user@example.com',
        password: '1234567'
    },
    {
        username: 'testing',
        email: 'testing@wallaclone.dev',
        password: 'testing+'
    },
    {
        username: 'testing3',
        email: 'testing3@wallaclone.dev',
        password: '1'
    }
];


/**
 * 
 * Reseting adverts collection by specifications
 * Delete all adverts before now
 */
const deleteAll = async function () {

    console.log('Remove old adverts ...');

    const result = await Advert.deleteMany();

    console.log('Olds adverts removes: ', result.deletedCount);
};

/**
 * 
 * Reseting adverts collection by specifications
 */
const insertAdverts = async function () {

    console.log('Adding adverts ...');

    try {

        // next line must save ad an tigger imageService, but this (imageService) not launch. Why???
        const result = await Advert.insertMany(advertsArray);

        await Advert.createIndexes()
            .then(console.log('Indexes created'))
            .catch(
                (err) => {
                    console.log('Error on create Avert indexes', err.message)
                });
        console.log('DB  -> Adverts inserts: ', advertsArray.length);

    } catch (err) {

        console.log('DB not installed -> Err: ', err);
    }
};

// Create user collection 
db.model('user', User.schema);


async function initUsers() {
    await User.deleteMany();

    await User.insertMany([
        {
            "_id": "5e3fb4810223813c34921164",
            "forgotten_password": {
                "code": "",
                "time": null
            },
            "role": "user",
            "language": "es-ES",
            "username": "Programación",
            "password": "$2b$10$mLM36FBRhyHvgE5Vysj6kOW3NwcA47ENzgrvMgRmnv4tbaKkFoYfy",
            "email": "ma.cardenas@nexuscode.com",
            "created": "2020-02-09T07:28:01.760+0000",
            "lastLogin": "2020-02-09T07:28:01.760+0000",
        },
        {
            "_id": "5e40faae9f22490b1cd9b59f",
            "forgotten_password": {
                "code": "",
                "time": null
            },
            "role": "user",
            "language": "en",
            "username": "user",
            "password": "$2b$10$cxJyu8HdzXGzrlfD6j3YbehInpolxmN44oJDDSR36g7ppPvXcSkou",
            "email": "user@example.com",
            "created": "2020-02-10T06:39:42.941+0000",
            "lastLogin": "2020-02-10T06:39:42.941+0000",
        },
        {
            "_id": "5e40fb109f22490b1cd9b5a0",
            "forgotten_password": {
                "code": "",
                "time": null
            },
            "role": "user",
            "language": "en",
            "username": "wallaclone",
            "password": "$2b$10$g0ONzrqDRQiaSzB4wdN/1.mKJfJZH/JwRZ7Snj7huBf/bE7LIaM7S",
            "email": "wallaclone@wallaclone.dev",
            "created": "2020-02-10T06:41:20.213+0000",
            "lastLogin": "2020-02-10T06:41:20.213+0000",
        },
        {
            "_id": "5e44188f333a100cccd1575f",
            "forgotten_password": {
                "code": "",
                "time": null
            },
            "role": "user",
            "language": "es-ES",
            "username": "Programación2",
            "password": "$2b$10$/rzYWCATc2k867gL/87evO1eRc9Pg6XWwpoLDE.lYQzOgEQkOzT8S",
            "email": "testingpost7@wallaclone.dev",
            "created": "2020-02-12T15:23:59.999+0000",
            "lastLogin": "2020-02-12T15:23:59.999+0000",
        },
        {
            "_id": "5e466f12f31f23100499911d",
            "forgotten_password": {
                "code": "",
                "time": null
            },
            "role": "user",
            "language": "en",
            "username": "ProgramaciónN",
            "password": "$2b$10$PDTEVDHE3lxPAs8rcqsqaOlHg/4NtX0hN9Zov9dl9PGjFRCzRQ0fm",
            "email": "testingN@wallaclone.dev",
            "created": "2020-02-14T09:57:38.426+0000",
            "lastLogin": "2020-02-14T09:57:38.426+0000",
        }
    ]);


    await User.createIndexes()
        .then(console.log('User Indexes created'))
        .catch(
            (err) => {
                console.log('Error on User create indexes', err.message)
            });

    console.log('Initial user created on users collection');
}


// Create Advert collection and add adverts:
db.model('advert', Advert.schema);

deleteAll().then(() => {

    insertAdverts().then(() => {
        console.log('Initial adverts created');
    });
})
    .catch(err => {
        console.log('Error on install DB: ', err);
        process.exit();
    });

console.log('Initial data created');
