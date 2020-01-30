const Advert = require('../models/Advert');

exports.listAdverts = async function (req, res, next) {
    try {

        // params in querystring. Must be objects for mongo. Schema filter 'typeof them'
        const name = req.query.name;
        const type = req.query.type;
        const active = req.query.active;
        const text = req.query.text;
        const tags = req.query.tags;
        const price = req.query.price;

        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;

        let filter = {};

        if (name) {
            // 3. name   -> Starts with value
            filter.name = new RegExp('^' + name, "i");
        }

        if (type) {
            filter.type = type;
        }

        filter.active = active === undefined ? true : active;

        // Full text search in name & description, compound text index 
        if (text) {
            filter = Object.assign(filter, {
                $text: {
                    $search: text
                }
            });
        }

        /**5. Price                         ->      price.split('-')
             a. X: exact value                            [X]
             b. Y-X:  Y <= adverts.price <= X               [X , Y]
             c. X- :  adverts.price <= X                    [X , ''] 
             d. -X :  X <= adverts.price                    ['' , X]
            
        */
        if (price) {

            const vPrice = price.split('-');

            console.log('vPice: ', vPrice);

            if (vPrice.length == 1) {

                filter.price = price; // [X]
            } else {

                if (vPrice[0] != '' && vPrice[1] != '') {

                    filter.price = {
                        $gte: vPrice[0],
                        $lte: vPrice[1]
                    }; // [X , Y]
                } else {

                    if (vPrice[1] == '')
                        filter.price = {
                            $gte: vPrice[0]
                        }; // [X , ''] 
                    if (vPrice[0] == '')
                        filter.price = {
                            $lte: vPrice[1]
                        }; // ['' , X]
                }

            }

        }

        // tags are a array
        if (tags) {
            filter.tags = {
                $in: tags
            }
        }

        console.log('filter: ', filter);
        const adverts = await Advert.list({
            filter,
            skip,
            limit,
            fields,
            sort
        });

        return adverts;

    } catch (err) {
        next(err);
    }
}

// module.exports = listAdverts;