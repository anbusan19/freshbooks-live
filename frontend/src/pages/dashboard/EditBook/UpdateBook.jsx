import React, { useEffect, useState } from 'react'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageFileName, setImageFileName] = useState('');

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData?.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage);
      setImageUrl(bookData.coverImage);
      setImageFileName(bookData.coverImage.split('/').pop());
    }
  }, [bookData, setValue])

  const handleFileUpload = async(event) => {
    const file = event.target.files[0];
    if(!file) return;
    
    try {
        setUploading(true);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'freshbooks');
        data.append('cloud_name', 'dh5fgqqte');
        
        const res = await fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
            method: 'POST',
            body: data
        });
        
        const uploadedImage = await res.json();
        setImageUrl(uploadedImage.url);
        setImageFileName(file.name);
        setValue('coverImage', uploadedImage.url);
        console.log(uploadedImage.url);
        setUploading(false);
    } catch (error) {
        console.error('Error uploading image:', error);
        Swal.fire({
            title: "Upload Failed",
            text: "Failed to upload image. Please try again.",
            icon: "error"
        });
        setUploading(false);
    }
  }

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: imageUrl || bookData.coverImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!"
      });
      await refetch()
    } catch (error) {
      console.log("Failed to update book.");
      alert("Failed to update book.");
    }
  }
  if (isLoading) return <Loading />
  if (isError) return <div className="text-red-500 dark:text-red-400">Error fetching book data</div>
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'self-development', label: 'Self-development' },
            { value: 'business', label: 'Business' },
            { value: 'mystery&crimethriller', label: 'Mystery & CrimeThriller' },
            { value: 'romance', label: 'Romance' },
            { value: 'kids-book', label: 'Kids Book' },
          ]}
          register={register}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500
                       dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Trending</span>
          </label>
        </div>

        <InputField
          label="Rating"
          name="rating"
          type="number"
          placeholder="Rating"
          register={register}
        />

        <InputField
          label="MRP"
          name="oldPrice"
          type="number"
          placeholder="MRP"
          register={register}
        />

        <InputField
          label="Our Price"
          name="newPrice"
          type="number"
          placeholder="Our Price"
          register={register}
        />

        {/* GST Percentage */}
        <InputField
          label="GST Percentage"
          name="gst"
          type="number"
          placeholder="Enter GST percentage (e.g. 18)"
          register={register}
          min="0"
          max="100"
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Cover Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload} 
            className="mb-2 w-full text-gray-700 dark:text-gray-200
                     file:mr-4 file:py-2 file:px-4 file:rounded-md
                     file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     dark:file:bg-gray-700 dark:file:text-gray-200
                     hover:file:bg-blue-100 dark:hover:file:bg-gray-600"
          />
          {imageFileName && <p className="text-sm text-gray-500 dark:text-gray-400">Current image: {imageFileName}</p>}
          {uploading && <p className="text-sm text-gray-500 dark:text-gray-400">Uploading...</p>}
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Book cover" className="w-32 h-32 object-cover rounded-md ring-1 ring-gray-200 dark:ring-gray-700" />
            </div>
          )}
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md
                                     dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200">
          Update Book
        </button>
      </form>
    </div>
  )
}

export default UpdateBook