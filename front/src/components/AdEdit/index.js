import { connect } from 'react-redux';
import AdEdit from './AdEdit';
import { savedAd, fetchAd } from '../../store/ads/actions';


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