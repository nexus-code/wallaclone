import { connect } from 'react-redux';
import AdEdit from './AdvertEdit';
import { saveAdvert, fetchAdverts } from '../../store/adverts/actions';


const mapStateToProps = (store) => ({
    user: store.user,
    adverts: store.adverts,
})

const mapDispatchToProps = dispatch => ({
    saveAdvert: (advert, method) => dispatch(saveAdvert(advert, method)),
    loadAdvert: (id) => dispatch(fetchAdverts(id)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdEdit);