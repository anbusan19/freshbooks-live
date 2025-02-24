import React, { useState, useEffect } from 'react';
import { couponService } from '../../../services/couponService';
import { toast } from 'react-hot-toast';

const CouponManagement = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        minPurchaseAmount: '',
        maxDiscountAmount: '',
        startDate: '',
        endDate: '',
        usageLimit: ''
    });

    useEffect(() => {
        loadCoupons();
    }, []);

    const loadCoupons = async () => {
        try {
            setLoading(true);
            const response = await couponService.getAllCoupons();
            setCoupons(response.coupons);
        } catch (error) {
            toast.error('Failed to load coupons');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (editingCoupon) {
                await couponService.updateCoupon(editingCoupon._id, formData);
                toast.success('Coupon updated successfully');
            } else {
                await couponService.createCoupon(formData);
                toast.success('Coupon created successfully');
            }
            resetForm();
            loadCoupons();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (coupon) => {
        setEditingCoupon(coupon);
        setFormData({
            code: coupon.code,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            minPurchaseAmount: coupon.minPurchaseAmount || '',
            maxDiscountAmount: coupon.maxDiscountAmount || '',
            startDate: coupon.startDate ? new Date(coupon.startDate).toISOString().split('T')[0] : '',
            endDate: coupon.endDate ? new Date(coupon.endDate).toISOString().split('T')[0] : '',
            usageLimit: coupon.usageLimit || ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            try {
                await couponService.deleteCoupon(id);
                toast.success('Coupon deleted successfully');
                loadCoupons();
            } catch (error) {
                toast.error('Failed to delete coupon');
            }
        }
    };

    const resetForm = () => {
        setEditingCoupon(null);
        setFormData({
            code: '',
            discountType: 'percentage',
            discountValue: '',
            minPurchaseAmount: '',
            maxDiscountAmount: '',
            startDate: '',
            endDate: '',
            usageLimit: ''
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">
                {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Coupon Code</label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Discount Type</label>
                        <select
                            name="discountType"
                            value={formData.discountType}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed Amount</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Discount Value</label>
                        <input
                            type="number"
                            name="discountValue"
                            value={formData.discountValue}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Minimum Purchase Amount</label>
                        <input
                            type="number"
                            name="minPurchaseAmount"
                            value={formData.minPurchaseAmount}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Maximum Discount Amount</label>
                        <input
                            type="number"
                            name="maxDiscountAmount"
                            value={formData.maxDiscountAmount}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Usage Limit</label>
                        <input
                            type="number"
                            name="usageLimit"
                            value={formData.usageLimit}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {loading ? 'Processing...' : (editingCoupon ? 'Update Coupon' : 'Create Coupon')}
                    </button>
                    {editingCoupon && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2 className="text-2xl font-bold mb-4">Existing Coupons</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {coupons.map((coupon) => (
                            <tr key={coupon._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{coupon.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap capitalize">{coupon.discountType}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {coupon.usageCount} / {coupon.usageLimit || '∞'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {coupon.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(coupon)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(coupon._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CouponManagement; 