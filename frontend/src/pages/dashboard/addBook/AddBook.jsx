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
                icon: "error"
            });
            setUploading(false);
        }
        
    }

    const onSubmit = async (data) => {
        if (!imageUrl) {
            Swal.fire({
                title: "Missing Image",
                text: "Please upload a cover image for the book",
                icon: "warning"
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
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
              });
              reset();
              setImageUrl('');
              setimageFileName('');
              setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add book. Please try again.")   
        }
      
    }
    
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

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
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
            // Add more options as needed
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
         
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddBook