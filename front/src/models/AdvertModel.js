export default class AdvertModel {
    id;
    name;
    description;
    price;
    type;
    image;
    tags;
    owner;
    created;

    constructor(value) {
        this.id = value._id;
        this.name = value.name;
        this.description = value.description;
        this.price = value.price;
        this.type = value.type;
        this.image = `${process.env.REACT_APP_API_IMAGES}${value.image}`;
        this.tags = value.tags;
        this.owner = value.owner
        this.created = value.created;
    }
}