import { useState, useEffect } from 'react';
import Searchbar from 'components/Searchbar';
import * as API from 'components/Services/api';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { Container } from 'components/App/App.styled';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageResults, setImageResults] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const images = await API.getImages(searchQuery, searchPage);
        setImageResults(prevImage => [...prevImage, ...images]);

        scrollToBottom();
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, searchPage]);

  const loadMoreImages = () => {
    setSearchPage(prevSearchPage => prevSearchPage + 1);
  };

  const addImage = newQuery => {
    setSearchQuery(newQuery);
    setSearchPage(1);
    setImageResults([]);
  };

  const toggleModal = content => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImage(content);
  };

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  return (
    <Container>
      <Searchbar onSubmit={addImage} />

      {error && <h2>Ой ошибка, всё пропало!!!</h2>}

      <ImageGallery images={imageResults} ontoggleModal={toggleModal} />

      {isLoading && <Loader />}

      {!isLoading && searchQuery && imageResults.length === 0 && !error && (
        <p style={{ color: 'red' }}>
          Ой, по запросу {searchQuery} ничего не найдено, попробуйте ещё раз.
        </p>
      )}

      {imageResults.length > 0 && <Button loadMore={loadMoreImages} />}

      {showModal && <Modal content={largeImage} onClose={toggleModal} />}
    </Container>
  );
}
