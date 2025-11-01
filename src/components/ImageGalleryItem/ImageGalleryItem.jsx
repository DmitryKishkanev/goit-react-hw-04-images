import PropTypes from 'prop-types';
import {
  GalleryItem,
  GalleryItemImage,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

const ImageGalleryItem = ({ items, ontoggleModal }) => {
  return items.map((item, index) => (
    <GalleryItem key={`${item.id}-${index}`}>
      <button type="button" onClick={() => ontoggleModal(item)}>
        <GalleryItemImage src={item.webformatURL} alt={item.tags} />
      </button>
    </GalleryItem>
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ).isRequired,
  ontoggleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
