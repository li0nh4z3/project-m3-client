import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPostPage.css';
import { api } from '../../api';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';
import Loading from '../../components/Loading/Loading';
import { useGoBack } from '../../hooks/useGoBack';

const NewPostPage = () => {
  const navigate = useNavigate();
  const { goBack } = useGoBack();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const description = e.target.description.value;
    const image = e.target.image.files[0];

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    try {
      const response = await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/formdata' },
      });

      if (response.status === 201) {
        const post = response.data;
        setIsLoading(false);
        navigate(`/post/${post._id}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  function handleImgChange({ target }) {
    setImage({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  if (isLoading) return <Loading />;

  return (
    <section className='container animeLeft '>
      <div>
        <h1 className='title'>New Post</h1>
      </div>

      <div className='NewPostPage'>
        <form onSubmit={handleSubmit}>
          <Input label='Description' name='description' />
          <input
            className='file'
            type='file'
            name='image'
            onChange={handleImgChange}
          />
          <Button>Create Post</Button>
        </form>

        <div>
          {image.preview && (
            <div
              className='preview'
              style={{ backgroundImage: `url("${image.preview}")` }}
            ></div>
          )}
        </div>
      </div>

      <button onClick={goBack} className='back-button'>
        Back
      </button>
    </section>
  );
};

export default NewPostPage;
