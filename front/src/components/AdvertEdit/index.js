import { connect } from 'react-redux';
import AdEdit from './AdvertEdit';
import { savedAd, fetchAdverts } from '../../store/adverts/actions';


const mapStateToProps = (store) => ({
    user: store.user,
    adverts: store.adverts,
})

const mapDispatchToProps = dispatch => ({
    savedAd: (ad, method) => dispatch(savedAd(ad, method)),
    loadAd: (id) => dispatch(fetchAdverts(id)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdEdit);