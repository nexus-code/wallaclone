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

const db   = require('./lib/connectMongoose');
const Advert = require('./models/Advert');
const User = require('./models/User');

const advertsArray = [
        {
            name: 'lifestyle 1',
            type: 'sell',
            owner: '5e3fb4810223813c34921164',
            status: '',
            price: 150,
            tags: ['lifestyle', 'mobile'],
            image: 'lifestyle1.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ',
            created: '2020-02-01 8:56'
        },
        {
            name: 'lifestyle 2',
            type: 'sell',
            owner: '5e40fb109f22490b1cd9b5a0',
            status: 'reserved',
            price: 15,
            tags: ['lifestyle', 'work'],
            image: 'lifestyle2.jpg',
            description: 'Eget gravida cum sociis natoque penatibus et. ',
            created: '2020-02-01 7:50'
        },
        {
            name: 'lifestyle 3',
            type: 'sell',
            owner: '5e3fb4810223813c34921164',
            status: '',
            price: 80,
            tags: ['lifestyle'],
            image: 'lifestyle3.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ',
            created: '2020-01-31 20:56'
        },
        {
            name: 'motor 1',
            type: 'sell',
            owner: '5e40faae9f22490b1cd9b59f',
            status: 'sold',
            price: 150,
            tags: ['motor', 'mobile', 'lifestyle'],
            image: 'motor1.jpg',
            description: 'Eget gravida cum sociis natoque penatibus et. ',
            created: '2020-01-31 8:56'
        }, {
            name: 'motor 2',
            type: 'buy',
            owner: '5e3fb4810223813c34921164',
            status: '',
            price: 180,
            tags: ['motor', 'work'],
            image: 'motor2.jpg',
            description: 'Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.',
            created: '2020-01-30 8:56'
        }, {
            name: 'motor 3',
            type: 'buy',
            owner: '5e40faae9f22490b1cd9b59f',
            status: '',
            price: 80,
            tags: ['motor', 'lifestyle'],
            image: 'motor3.jpg',
            description: '',
            created: '2020-01-29 8:56'
        },
        {
            name: 'mobile 1',
            type: 'sell',
            owner: '5e40fb109f22490b1cd9b5a0',
            status: '',
            price: 150,
            tags: ['mobile', 'lifestyle'],
            image: 'mobile1.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ',
            created: '2020-01-28 18:56'
        }, {
            name: 'mobile 2',
            type: 'sell',
            owner: '5e3fb4810223813c34921164',
            status: 'reserved',
            price: 45,
            tags: ['mobile', 'work'],
            image: 'mobile2.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim ut sem viverra. ',
            created: '2020-02-10 18:00'
        }, {
            name: 'mobile 3',
            type: 'sell',
            owner: '5e3fb4810223813c34921164',
            status: 'reserved',
            price: 120,
            tags: ['mobile'],
            image: 'mobile3.jpg',
            description: '',
            created: '2020-02-09 19:56'
        },
        {
            name: 'work 1',
            type: 'sell',
            owner: '5e40fb109f22490b1cd9b5a0',
            status: 'Sold',
            price: 150,
            tags: ['work', 'mobile', 'lifestyle'],
            image: 'work1.jpg',
            description: 'Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.',
            created: '2020-02-10 9:56'
        }, {
            name: 'work 2',
            type: 'buy',
            owner: '5e40fb109f22490b1cd9b5a0',
            status: '',
            price: 15,
            tags: ['work'],
            image: 'work2.jpg',
            description: 'Eget gravida cum sociis natoque penatibus et. Neque laoreet suspendisse interdum consectetur libero. Nullam non nisi est sit. ',
            created: '2020-02-03 18:56'
        }, {
            name: 'work 3',
            type: 'buy',
            owner: '5e3fb4810223813c34921164',
            status: '',
            price: 80,
            tags: ['work', 'lifestyle'],
            image: 'work3.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ',
            created: '2020-02-02 16:56'
        },
        {
            name: 'lifestyle 1 - 2019 -',
            type: 'sell',
            owner: '5e3fb4810223813c34921164',
            status: '',
            price: 150,
            tags: ['lifestyle', 'mobile'],
            image: 'lifestyle1.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ',
            created: '2019-02-01 8:56'
        },
        {
            name: 'lifestyle 2 - 2019 -',
            type: 'sell',
            owner: '5e40fb109f22490b1cd9b5a0',
            status: 'reserved',
            price: 15,
            tags: ['lifestyle', 'work'],
            image: 'lifestyle2.jpg',
            description: 'Eget gravida cum sociis natoque penatibus et. ',
            created: '2019-02-01 7:50'
        },
        {
            name: 'lifestyle 3 - 2019 -',
            type: 'sell',
            owner: '5e3fb4810223813c34921164',
            status: '',
            price: 80,
            tags: ['lifestyle'],
            image: 'lifestyle3.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ',
            created: '2019-01-31 20:56'
        },
        {
            name: 'motor 1 - 2019 -',
            type: 'sell',
            owner: '5e40faae9f22490b1cd9b59f',
            status: 'sold',
            price: 150,
            tags: ['motor', 'mobile', 'lifestyle'],
            image: 'motor1.jpg',
            description: 'Eget gravida cum sociis natoque penatibus et. ',
            created: '2019-01-31 8:56'
        }, {
            name: 'motor 2 - 2019 -',
            type: 'buy',
            owner: '5e3fb4810223813c34921164',
            status: '',
            price: 180,
            tags: ['motor', 'work'],
            image: 'motor2.jpg',
            description: 'Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.',
            created: '2019-01-30 8:56'
        }, {
            name: 'motor 3 - 2019 -',
            type: 'buy',
            owner: '5e40faae9f22490b1cd9b59f',
            status: '',
            price: 80,
            tags: ['motor', 'lifestyle'],
            image: 'motor3.jpg',
            description: '',
            created: '2019-01-29 8:56'
        },
        {
            name: 'mobile 1 - 2019 -',
            type: 'sell',
            owner: '5e40fb109f22490b1cd9b5a0',
            status: '',
            price: 150,
            tags: ['mobile', 'lifestyle'],
            image: 'mobile1.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ',
            created: '2019-01-28 18:56'
        }, {
            name: 'mobile 2 - 2019 -',
            type: 'sell',
            owner: '5e3fb4810223813c34921164',
            status: 'reserved',
            price: 45,
            tags: ['mobile', 'work'],
            image: 'mobile2.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim ut sem viverra. ',
            created: '2019-02-10 18:00'
        }, {
            name: 'mobile 3 - 2019 -',
            type: 'sell',
            owner: '5e3fb4810223813c34921164',
            status: 'reserved',
            price: 120,
            tags: ['mobile'],
            image: 'mobile3.jpg',
            description: '',
            created: '2019-02-09 19:56'
        },
        {
            name: 'work 1 - 2019 -',
            type: 'sell',
            owner: '5e40fb109f22490b1cd9b5a0',
            status: 'Sold',
            price: 150,
            tags: ['work', 'mobile', 'lifestyle'],
            image: 'work1.jpg',
            description: 'Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.',
            created: '2019-02-10 9:56'
        }, {
            name: 'work 2 - 2019 -',
            type: 'buy',
            owner: '5e40fb109f22490b1cd9b5a0',
            status: '',
            price: 15,
            tags: ['work'],
            image: 'work2.jpg',
            description: 'Eget gravida cum sociis natoque penatibus et. Neque laoreet suspendisse interdum consectetur libero. Nullam non nisi est sit. ',
            created: '2019-02-03 18:56'
        }, {
            name: 'work 3 - 2019 -',
            type: 'buy',
            owner: '5e3fb4810223813c34921164',
            status: '',
            price: 80,
            tags: ['work', 'lifestyle'],
            image: 'work3.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. ',
            created: '2019-02-02 16:56'
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
            (err) => {console.log('Error on create Avert indexes', err.message)
        });
        console.log('DB  -> Adverts inserts: ', advertsArray.length);
        
    } catch (err) {
        
        console.log('DB not installed -> Err: ', err);
    }
};

// Create Advert collection and add adverts:
db.model('advert', Advert.schema);

deleteAll().then(() => {
    
    insertAdverts().then(() => {
        console.log('Adverts created');
    });
})
.catch(err => {
    console.log('Error on install DB: ', err);
    process.exit();
});


// Create user collection 
db.model('user', User.schema);

// Add user example
// db.once('open', async () => {
//     try {

//         await initUsers();
//         db.close();
//         console.log('******* wallacloneDB created sucesfully ******');

//         process.exit();

//     } catch (err) {
//         console.log('Error on install user:', err);
//         process.exit(1);
//     }
// });

async function initUsers() {
    await User.deleteMany();

    await User.insertMany([
        {
            username: 'user',
            email: 'user@example.com',
            password: '1234567'
        },
        {
            username: 'wallaclone',
            email: 'wallaclone@wallaclone.dev',
            password: 'wallaclone'
        }, 
        {
            username: 'Programación',
            email: 'ma.cardenas@nexuscode.com',
    password: 'Programación'
        }
        // ,{ runValidators: true } // Produce empty username error!
    ]);

    await User.createIndexes()
        .then(console.log('User Indexes created'))
        .catch(
            (err) => {
                console.log('Error on User create indexes', err.message)
            });

    console.log('Testing user created on users collection');
}