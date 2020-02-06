import { connect } from 'react-redux';
import AdEdit from './AdvertEdit';
import { savedAd, fetchAd } from '../../store/adverts/actions';


const mapStateToProps = (store) => ({
    user: store.user,
    ads: store.ads,
})

const mapDispatchToProps = dispatch => ({
    savedAd: (ad, method) => dispatch(savedAd(ad, method)),
    loadAd: (id) => dispatch(fetchAd(id)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdEdit);