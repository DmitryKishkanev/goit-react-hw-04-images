import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import * as API from 'components/Services/api';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { Container } from 'components/App/App.styled';

class App extends Component {
  state = {
    image: '',
    imageResults: [],
    searchPage: 1,
    isLoading: false,
    showModal: false,
    largeImage: {},
  };

  async componentDidUpdate(_, prevState) {
    const prevImage = prevState.image.trim();
    const nextImage = this.state.image.trim();

    if (nextImage && nextImage !== prevImage) {
      try {
        this.setState({ searchPage: 1, isLoading: true });
        const images = await API.getImages(nextImage);
        this.setState(
          {
            imageResults: images,
            searchPage: this.state.searchPage + 1,
            isLoading: false,
          },
          this.scrollToBottom,
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  addImage = newImage => {
    this.setState({ image: newImage });
  };

  loadMoreImages = async () => {
    try {
      this.setState({ isLoading: true });
      const moreImages = await API.getImages(
        this.state.image,
        this.state.searchPage,
      );
      this.setState(
        state => ({
          imageResults: [...state.imageResults, ...moreImages],
          searchPage: this.state.searchPage + 1,
          isLoading: false,
        }),
        this.scrollToBottom,
      );
    } catch (error) {
      console.log(error);
    }
  };

  toggleModal = content => {
    this.setState(prev => ({
      showModal: !prev.showModal,
      largeImage: content,
    }));
  };

  scrollToBottom = () => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  render() {
    const { image, imageResults, isLoading, showModal } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.addImage} />

        <ImageGallery images={imageResults} ontoggleModal={this.toggleModal} />

        {isLoading && <Loader />}

        {!isLoading && image && imageResults.length === 0 && (
          <p style={{ color: 'red' }}>
            Ой, по запросу {this.state.image} ничего не найдено, попробуйте ещё
            раз.
          </p>
        )}

        {imageResults.length > 0 && <Button loadMore={this.loadMoreImages} />}

        {showModal && (
          <Modal content={this.state.largeImage} onClose={this.toggleModal} />
        )}
      </Container>
    );
  }
}

export default App;
