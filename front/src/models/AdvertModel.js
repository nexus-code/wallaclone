export default class AdvertModel {
    id;
    name;
    description;
    price;
    type;
    image;
    // createdAt;
    // updatedAt;
    tags;
    owner;

    constructor(value) {
        this.id = value._id;
        this.name = value.name;
        this.description = value.description;
        this.price = value.price;
        this.type = value.type;
        // this.photo = value.photo.startsWith('/images/') ? `${process.env.REACT_APP_API_URL}${value.photo}` : value.photo;
        this.image = `${process.env.REACT_APP_API_IMAGES}${value.image}`;
        
        // this.createdAt = value.createdAt;
        // this.updatedAt = value.updatedAt;
        this.tags = value.tags;
        this.owner = value.owner
    }
}