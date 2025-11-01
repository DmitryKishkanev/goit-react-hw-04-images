import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImageGalleryList } from 'components/ImageGallery/ImageGallery.styled';

const ImageGallery = ({ images, ontoggleModal }) => {
  return (
    <ImageGalleryList>
      <ImageGalleryItem items={images} ontoggleModal={ontoggleModal} />
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
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
export default ImageGallery;
