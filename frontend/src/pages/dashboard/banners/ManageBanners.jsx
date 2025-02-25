import React, { useState } from 'react';
import { useGetAllBannersQuery, useCreateBannerMutation, useUpdateBannerMutation, useDeleteBannerMutation, useToggleBannerStatusMutation } from '../../../redux/features/banners/bannersApi';
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiPlus } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading';

const ManageBanners = () => {
    const { data: banners = [], isLoading, refetch } = useGetAllBannersQuery();
    const [createBanner] = useCreateBannerMutation();
    const [updateBanner] = useUpdateBannerMutation();
    const [deleteBanner] = useDeleteBannerMutation();
    const [toggleStatus] = useToggleBannerStatusMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        startDate: '',
        endDate: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            data.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

            const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
                method: 'POST',
                body: data
            });

            const uploadedImage = await res.json();
            setFormData(prev => ({ ...prev, image: uploadedImage.url }));
            setImageFile(file);
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBanner) {
                await updateBanner({ id: editingBanner._id, ...formData }).unwrap();
                Swal.fire({
                    title: 'Success',
                    text: 'Banner updated successfully',
                    icon: 'success',
                    width: '90%',
                    customClass: {
                        container: 'my-swal',
                        popup: 'sm:max-w-sm rounded-lg',
                        title: 'text-lg sm:text-xl font-semibold',
                        htmlContainer: 'text-sm sm:text-base',
                        confirmButton: 'text-sm sm:text-base px-4 py-2 rounded-lg'
                    }
                });
            } else {
                await createBanner(formData).unwrap();
                Swal.fire({
                    title: 'Success',
                    text: 'Banner created successfully',
                    icon: 'success',
                    width: '90%',
                    customClass: {
                        container: 'my-swal',
                        popup: 'sm:max-w-sm rounded-lg',
                        title: 'text-lg sm:text-xl font-semibold',
                        htmlContainer: 'text-sm sm:text-base',
                        confirmButton: 'text-sm sm:text-base px-4 py-2 rounded-lg'
                    }
                });
            }
            setIsModalOpen(false);
            setEditingBanner(null);
            setFormData({
                title: '',
                description: '',
                image: '',
                startDate: '',
                endDate: ''
            });
            refetch();
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
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
    };

    const handleEdit = (banner) => {
        setEditingBanner(banner);
        setFormData({
            title: banner.title,
            description: banner.description,
            image: banner.image,
            startDate: new Date(banner.startDate).toISOString().split('T')[0],
            endDate: new Date(banner.endDate).toISOString().split('T')[0]
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Banner?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            width: '90%',
            customClass: {
                container: 'my-swal',
                popup: 'sm:max-w-sm rounded-lg',
                title: 'text-lg sm:text-xl font-semibold',
                htmlContainer: 'text-sm sm:text-base',
                confirmButton: 'text-sm sm:text-base px-4 py-2 rounded-lg',
                cancelButton: 'text-sm sm:text-base px-4 py-2 rounded-lg',
            }
        });

        if (result.isConfirmed) {
            try {
                await deleteBanner(id).unwrap();
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Banner has been deleted.',
                    icon: 'success',
                    width: '90%',
                    customClass: {
                        container: 'my-swal',
                        popup: 'sm:max-w-sm rounded-lg',
                        title: 'text-lg sm:text-xl font-semibold',
                        htmlContainer: 'text-sm sm:text-base',
                        confirmButton: 'text-sm sm:text-base px-4 py-2 rounded-lg'
                    }
                });
                refetch();
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
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
    };

    const handleToggleStatus = async (id) => {
        try {
            await toggleStatus(id).unwrap();
            refetch();
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Banners</h1>
                <button
                    onClick={() => {
                        setEditingBanner(null);
                        setFormData({
                            title: '',
                            description: '',
                            image: '',
                            startDate: '',
                            endDate: ''
                        });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <FiPlus /> Add Banner
                </button>
            </div>

            {/* Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                    <div key={banner._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <img src={banner.image} alt={banner.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{banner.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{banner.description}</p>
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(banner.startDate).toLocaleDateString()} - {new Date(banner.endDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleStatus(banner._id)}
                                        className={`p-2 rounded-lg ${banner.isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}
                                    >
                                        {banner.isActive ? <FiToggleRight size={20} /> : <FiToggleLeft size={20} />}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(banner)}
                                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                                    >
                                        <FiEdit2 />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(banner._id)}
                                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            {editingBanner ? 'Edit Banner' : 'Add New Banner'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image (16:9 ratio recommended)</label>
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    accept="image/*"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For best results, use a 16:9 aspect ratio (e.g., 1920x1080px)</p>
                                {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                                {formData.image && (
                                    <img src={formData.image} alt="Preview" className="mt-2 h-32 object-cover rounded-lg" />
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    {editingBanner ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBanners; 