import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBook, {isLoading, isError}] = useAddBookMutation()
    const [imageFileName, setimageFileName] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async(event) => {
        const file = event.target.files[0];
        if(!file) return;
        
        try {
            setUploading(true);
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'freshbooks');
            data.append('cloud_name', 'dh5fgqqte');
            
            const res = await fetch("https://api.cloudinary.com/v1_1/dh5fgqqte/image/upload", {
                method: 'POST',
                body: data
            });
            
            const uploadedImage = await res.json();
            setImageUrl(uploadedImage.url);
            setimageFile(file);
            setimageFileName(file.name);
            console.log(uploadedImage.url);
            setUploading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire({
                title: "Upload Failed",
                text: "Failed to upload image. Please try again.",
                icon: "error",
                width: '90%',
                customClass: {
                    container: 'my-swal',
                    popup: 'sm:max-w-sm rounded-lg',
                    title: 'text-lg sm:text-xl font-semibold text-red-600',
                    htmlContainer: 'text-sm sm:text-base',
                    confirmButton: 'text-sm sm:text-base px-4 py-2 rounded-lg'
                }
            });
            setUploading(false);
        }
    }

    const onSubmit = async (data) => {
        if (!imageUrl) {
            Swal.fire({
                title: "Missing Image",
                text: "Please upload a cover image for the book",
                icon: "warning",
                width: '90%',
                customClass: {
                    container: 'my-swal',
                    popup: 'sm:max-w-sm rounded-lg',
                    title: 'text-lg sm:text-xl font-semibold',
                    htmlContainer: 'text-sm sm:text-base',
                    confirmButton: 'text-sm sm:text-base px-4 py-2 rounded-lg'
                }
            });
            return;
        }

        const newBookData = {
            ...data,
            coverImage: imageUrl
        }
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book Added",
                text: "Your book has been uploaded successfully!",
                icon: "success",
                width: '90%',
                customClass: {
                    container: 'my-swal',
                    popup: 'sm:max-w-sm rounded-lg',
                    title: 'text-lg sm:text-xl font-semibold',
                    htmlContainer: 'text-sm sm:text-base',
                    confirmButton: 'text-sm sm:text-base px-4 py-2 rounded-lg'
                }
            });
            reset();
            setImageUrl('');
            setimageFileName('');
            setimageFile(null);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to add book. Please try again.",
                icon: "error",
                width: '90%',
                customClass: {
                    container: 'my-swal',
                    popup: 'sm:max-w-sm rounded-lg',
                    title: 'text-lg sm:text-xl font-semibold text-red-600',
                    htmlContainer: 'text-sm sm:text-base',
                    confirmButton: 'text-sm sm:text-base px-4 py-2 rounded-lg'
                }
            });
        }
    }
    
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Add New Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <InputField
          label="Author"
          name="author"
          placeholder="Enter author name"
          register={register}
        />

        {/* Reusable Select Field for Category */}
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

        {/* Trending Checkbox */}
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

        {/* Rating */}
        <InputField
          label="Rating"
          name="rating"
          type="number"
          placeholder="Rating"
          register={register}
        />

        {/* Old Price */}
        <InputField
          label="MRP"
          name="oldPrice"
          type="number"
          placeholder="MRP"
          register={register}
        />

        {/* New Price */}
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

        {/* Cover Image Upload */}
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
          {imageFileName && <p className="text-sm text-gray-500 dark:text-gray-400">Selected: {imageFileName}</p>}
          {uploading && <p className="text-sm text-gray-500 dark:text-gray-400">Uploading...</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md
                                     dark:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200">
          {isLoading ? <span>Adding.. </span> : <span>Add Book</span>}
        </button>
      </form>
    </div>
  )
}

export default AddBook