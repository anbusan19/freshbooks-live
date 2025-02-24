import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../assets/freshbooks-navbar-logo.png';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#FFFFFF'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    logo: {
        width: 120,
        height: 40,
        objectFit: 'contain'
    },
    headerRight: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    invoiceInfo: {
        fontSize: 10,
        color: '#333333',
        marginBottom: 4,
    },
    addressSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    addressBlock: {
        width: '45%',
    },
    addressTitle: {
        fontSize: 10,
        color: '#333333',
        marginBottom: 8,
    },
    addressText: {
        fontSize: 10,
        color: '#666666',
        marginBottom: 4,
    },
    table: {
        marginTop: 20,
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingBottom: 8,
        marginBottom: 8,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    productColumn: {
        flex: 2,
        fontSize: 10,
        color: '#333333',
    },
    quantityColumn: {
        flex: 1,
        fontSize: 10,
        color: '#333333',
        textAlign: 'center',
    },
    rateColumn: {
        flex: 1,
        fontSize: 10,
        color: '#333333',
        textAlign: 'right',
    },
    amountColumn: {
        flex: 1,
        fontSize: 10,
        color: '#333333',
        textAlign: 'right',
    },
    summarySection: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 4,
    },
    summaryLabel: {
        fontSize: 10,
        color: '#666666',
        width: 100,
    },
    summaryValue: {
        fontSize: 10,
        color: '#333333',
        width: 100,
        textAlign: 'right',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    totalLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333333',
        width: 100,
    },
    totalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
        width: 100,
        textAlign: 'right',
    },
    paymentDetails: {
        marginTop: 30,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    paymentTitle: {
        fontSize: 10,
        color: '#333333',
        marginBottom: 8,
    },
    paymentText: {
        fontSize: 10,
        color: '#666666',
        marginBottom: 4,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        textAlign: 'center',
    },
    footerText: {
        fontSize: 10,
        color: '#666666',
        textAlign: 'center',
    }
});

const InvoicePDF = ({ order }) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const orderNumber = order._id?.slice(-6) || 'NA';
    const userPrefix = order.email?.substring(0, 3).toUpperCase() || 'XXX';
    
    // Format: YYYYMM-ORDERNUMBER-USERPREFIX
    const invoiceNumber = `${year}${month}-${orderNumber}-${userPrefix}`;

    // Ensure we have default values for all numeric fields
    const subtotal = order.subtotal || 0;
    const shippingCharges = order.shippingCharges || 0;
    const totalPrice = order.totalPrice || 0;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Image style={styles.logo} src={logo} />
                    <View style={styles.headerRight}>
                        <Text style={styles.invoiceInfo}>Invoice #{invoiceNumber}</Text>
                        <Text style={styles.invoiceInfo}>Date: {today.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</Text>
                    </View>
                </View>

                {/* Address Section */}
                <View style={styles.addressSection}>
                    <View style={styles.addressBlock}>
                        <Text style={styles.addressTitle}>Bill From:</Text>
                        <Text style={styles.addressText}>Freshbooks</Text>
                        <Text style={styles.addressText}>No: 15A, N Mada Street</Text>
                        <Text style={styles.addressText}>Lalitha Nagar, Thiruvanmiyur</Text>
                        <Text style={styles.addressText}>Chennai, Tamil Nadu, 600041</Text>
                        <Text style={styles.addressText}>Phone: +91 9962126356</Text>
                        <Text style={styles.addressText}>Email: support@freshbooks.in</Text>
                    </View>
                    <View style={styles.addressBlock}>
                        <Text style={styles.addressTitle}>Bill To:</Text>
                        <Text style={styles.addressText}>{order.name || 'N/A'}</Text>
                        <Text style={styles.addressText}>{order.address?.houseNo || ''}, {order.address?.street || ''}</Text>
                        <Text style={styles.addressText}>{order.address?.area || ''}</Text>
                        <Text style={styles.addressText}>{order.address?.city || ''}, {order.address?.state || ''}</Text>
                        <Text style={styles.addressText}>India - {order.address?.zipcode || ''}</Text>
                        <Text style={styles.addressText}>Phone: {order.phone || 'N/A'}</Text>
                    </View>
                </View>

                {/* Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.productColumn}>Product/Service</Text>
                        <Text style={styles.quantityColumn}>Quantity</Text>
                        <Text style={styles.rateColumn}>Rate (Rs.)</Text>
                        <Text style={styles.amountColumn}>Amount (Rs.)</Text>
                    </View>
                    {(order.productIds || []).map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.productColumn}>{item.book?.title || 'Unknown Book'}</Text>
                            <Text style={styles.quantityColumn}>{item.quantity || 1}</Text>
                            <Text style={styles.rateColumn}>{(item.price || 0).toFixed(2)}</Text>
                            <Text style={styles.amountColumn}>
                                {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Summary Section */}
                <View style={styles.summarySection}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal:</Text>
                        <Text style={styles.summaryValue}>Rs. {subtotal.toFixed(2)}</Text>
                    </View>
                    {shippingCharges > 0 && (
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping:</Text>
                            <Text style={styles.summaryValue}>Rs. {shippingCharges.toFixed(2)}</Text>
                        </View>
                    )}
                    {order.coupon && (
                        <View style={[styles.summaryRow, { color: '#059669' }]}>
                            <Text style={[styles.summaryLabel, { color: '#059669' }]}>
                                Discount ({order.coupon.code || ''}):
                            </Text>
                            <Text style={[styles.summaryValue, { color: '#059669' }]}>
                                -Rs. {(order.coupon.discountAmount || 0).toFixed(2)}
                            </Text>
                        </View>
                    )}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalValue}>Rs. {totalPrice.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Payment Details */}
                <View style={styles.paymentDetails}>
                    <Text style={styles.paymentTitle}>Payment Details:</Text>
                    <Text style={styles.paymentText}>Payment ID: {order.paymentId || 'N/A'}</Text>
                    <Text style={styles.paymentText}>Payment Mode: Online</Text>
                    <Text style={styles.paymentText}>Payment Status: Completed</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Thank you for shopping with Freshbooks!</Text>
                    <Text style={styles.footerText}>For any queries, please contact support@freshbooks.in</Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePDF;

