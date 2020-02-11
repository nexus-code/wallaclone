import { connect } from 'react-redux';

import {
  getAdvert,
  getAdverts,
} from '../store/adverts/selectors';

import {
  loadAdverts,
  searchAdverts,
  loadAdvert,
  createOrUpdateAdvert,
} from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  adverts: getAdverts(state),
  advert: getAdvert(state)(ownProps.match.params.id),
});

const mapDispatchToProps = {
  loadAdverts,
  searchAdverts,
  loadAdvert,
  createOrUpdateAdvert,
};

export default connect(mapStateToProps, mapDispatchToProps);
