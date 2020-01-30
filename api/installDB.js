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
            type: '1',
            active: 1,
            price: 150,
            tags: ['lifestyle', 'mobile'],
            image: 'lifestyle1.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. '
        },
        {
            name: 'lifestyle 2',
            type: '1',
            active: 1,
            price: 15,
            tags: ['lifestyle', 'work'],
            image: 'lifestyle2.jpg',
            description: 'Eget gravida cum sociis natoque penatibus et. '
        },
        {
            name: 'lifestyle 3',
            type: '1',
            active: 1,
            price: 80,
            tags: ['lifestyle'],
            image: 'lifestyle3.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. '
        },
        {
            name: 'motor 1',
            type: '1',
            active: 1,
            price: 150,
            tags: ['motor', 'mobile', 'lifestyle'],
            image: 'motor1.jpg',
            description: 'Eget gravida cum sociis natoque penatibus et. '
        }, {
            name: 'motor 2',
            type: '0',
            active: 1,
            price: 180,
            tags: ['motor', 'work'],
            image: 'motor2.jpg',
            description: 'Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.'
        }, {
            name: 'motor 3',
            type: '0',
            active: 1,
            price: 80,
            tags: ['motor', 'lifestyle'],
            image: 'motor3.jpg',
            description: ''
        },
        {
            name: 'mobile 1',
            type: '1',
            active: 1,
            price: 150,
            tags: ['mobile', 'lifestyle'],
            image: 'mobile1.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. '
        }, {
            name: 'mobile 2',
            type: '1',
            active: 1,
            price: 45,
            tags: ['mobile', 'work'],
            image: 'mobile2.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim ut sem viverra. '
        }, {
            name: 'mobile 3',
            type: '1',
            active: 1,
            price: 120,
            tags: ['mobile'],
            image: 'mobile3.jpg',
            description: ''
        },
        {
            name: 'work 1',
            type: '1',
            active: 1,
            price: 150,
            tags: ['work', 'mobile', 'lifestyle'],
            image: 'work1.jpg',
            description: 'Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.'
        }, {
            name: 'work 2',
            type: '0',
            active: 1,
            price: 15,
            tags: ['work', 'work'],
            image: 'work2.jpg',
            description: 'Eget gravida cum sociis natoque penatibus et. Neque laoreet suspendisse interdum consectetur libero. Nullam non nisi est sit. '
        }, {
            name: 'work 3',
            type: '0',
            active: 1,
            price: 80,
            tags: ['work', 'lifestyle'],
            image: 'work3.jpg',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. '
        },
        {
            name: 'deactivated 1',
            type: '1',
            active: 0,
            price: 170,
            tags: ['work', 'mobile', 'lifestyle'],
            image: '',
            description: 'Sem fringilla ut morbi tincidunt. Vulputate sapien nec sagittis aliquam malesuada bibendum. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. '
        }, {
            name: 'deactivated 2',
            type: '0',
            active: 0,
            price: 40,
            tags: ['work', 'work'],
            image: '',
            description: 'Eget gravida cum sociis natoque penatibus et. Neque laoreet suspendisse interdum consectetur libero. Nullam non nisi est sit. '
        }, {
            name: 'deactivated 3',
            type: '0',
            active: 0,
            price: 80,
            tags: ['work', 'lifestyle'],
            image: '',
            description: 'Ante metus dictum at tempor commodo. Ullamcorper dignissim cras tincidunt lobortis.'
        },
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
const insertTests = async function () {

    console.log('Adding adverts ...');

    try {
        
        // next line must save ad an tigger imageService, but this (imageService) not launch. Why???
        const result = await Advert.insertMany(advertsArray);

        await Advert.createIndexes()
        .then(console.log('Indexes created'))
        .catch(
            (err) => {console.log('Error on create indexes', err.message)
        });
        console.log('DB installed -> Adverts inserts: ', advertsArray.length);
        
    } catch (err) {
        
        console.log('DB not installed -> Err: ', err);
    }
};

// Create Advert collection and add adverts:
db.model('advert', Advert.schema);

deleteAll().then(() => {
    
    insertTests().then(() => {
        console.log('Close DB installer ');
        process.exit();
    });
})
.catch(err => {
    console.log('Error on install DB: ', err);
    process.exit();
});


// Create user collection 
db.model('user', User.schema);

// Add user example
db.once('open', async () => {
    try {

        await initUsers();
        db.close();

    } catch (err) {
        console.log('Error on install user:', err);
        process.exit(1);
    }
});

async function initUsers() {
    await User.deleteMany();
    // await User.insertMany([
    //     {
    //         email: 'testing@wallaclone.dev',
    //         password: await User.hashPassword('testing+')
    //     }
    // ]);

    await User.insertMany([
        {
            email: 'user@example.com',
            password: await User.hashPassword('1234')
        }
    ]);

    console.log('Testing user created on users collection');
}