import PropTypes from 'prop-types';
import { LoadMoreBtn } from 'components/Button/Button.styled';

const Button = ({ loadMore }) => {
  return (
    <div>
      <LoadMoreBtn onClick={loadMore}>
        <span>Load more</span>
      </LoadMoreBtn>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
