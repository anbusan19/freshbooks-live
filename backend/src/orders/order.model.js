const mongoose =  require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address: {
        houseNo: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        zipcode: {
            type: String,
            required: true,
        }
    },
    phone: {
        type: String,
        required: true,
    },
    productIds:[{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    subtotal: {
        type: Number,
        required: true,
    },
    coupon: {
        code: {
            type: String,
        },
        discountType: {
            type: String,
            enum: ['percentage', 'fixed'],
        },
        discountValue: {
            type: Number,
        },
        discountAmount: {
            type: Number,
        }
    },
    shippingCharges: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    razorpayOrderId: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    deliveryStatus: {
        type: String,
        enum: ['pending', 'processing', 'out_for_delivery', 'delivered'],
        default: 'pending'
    },
    trackingUrl: {
        type: String,
        default: ''
    },
    deliveryUpdates: [{
        status: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        note: String
    }]
}, {
    timestamps: true,
})

const Order =  mongoose.model('Order', orderSchema);

module.exports = Order;