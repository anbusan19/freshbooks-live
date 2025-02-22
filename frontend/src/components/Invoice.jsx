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
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    logo: {
        width: 130,
        height: 45,
        objectFit: 'contain'
    },
    headerRight: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    invoiceInfo: {
        fontSize: 10,
        color: '#666666',
        marginBottom: 4,
    },
    invoiceTitle: {
        fontSize: 24,
        color: '#6366F1',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    companyInfo: {
        marginBottom: 20,
        backgroundColor: '#F9FAFB',
        padding: 15,
        borderRadius: 4,
    },
    billTo: {
        marginBottom: 20,
        backgroundColor: '#F9FAFB',
        padding: 15,
        borderRadius: 4,
    },
    sectionTitle: {
        fontSize: 10,
        color: '#111827',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 10,
        color: '#4B5563',
        marginBottom: 4,
    },
    table: {
        marginTop: 20,
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#6366F1',
        padding: 8,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
        padding: 8,
    },
    itemColumn: {
        flex: 2,
        fontSize: 10,
    },
    qtyColumn: {
        flex: 1,
        fontSize: 10,
        textAlign: 'center',
    },
    priceColumn: {
        flex: 1,
        fontSize: 10,
        textAlign: 'right',
    },
    totalColumn: {
        flex: 1,
        fontSize: 10,
        textAlign: 'right',
    },
    summarySection: {
        marginTop: 20,
        paddingTop: 10,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    summaryText: {
        fontSize: 10,
        color: '#4B5563',
    },
    summaryAmount: {
        fontSize: 10,
        color: '#111827',
        fontWeight: 'bold',
    },
    totalAmount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#6366F1',
        padding: 10,
        marginTop: 8,
        borderRadius: 4,
    },
    totalAmountText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    paymentDetails: {
        marginTop: 20,
        backgroundColor: '#F9FAFB',
        padding: 15,
        borderRadius: 4,
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        color: '#6B7280',
        fontSize: 10,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 20,
    },
});

const InvoicePDF = ({ order }) => {
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Image style={styles.logo} src={logo} />
                    <View style={styles.headerRight}>
                        <Text style={styles.invoiceInfo}>Invoice #{order._id.slice(-8)}</Text>
                        <Text style={styles.invoiceInfo}>Date: {today}</Text>
                    </View>
                </View>

                <Text style={styles.invoiceTitle}>INVOICE</Text>

                {/* Company Info */}
                <View style={styles.companyInfo}>
                    <Text style={styles.sectionTitle}>Freshbooks</Text>
                    <Text style={styles.text}>No: 86</Text>
                    <Text style={styles.text}>Main Street</Text>
                    <Text style={styles.text}>Phone: (123) 456-7890</Text>
                    <Text style={styles.text}>Email: support@freshbooks.in</Text>
                </View>

                {/* Bill To */}
                <View style={styles.billTo}>
                    <Text style={styles.sectionTitle}>Bill To:</Text>
                    <Text style={styles.text}>{order.customerName}</Text>
                    <Text style={styles.text}>{order.shippingAddress}</Text>
                    <Text style={styles.text}>Email: {order.email}</Text>
                </View>

                {/* Items Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.itemColumn, { color: '#FFFFFF' }]}>Item</Text>
                        <Text style={[styles.qtyColumn, { color: '#FFFFFF' }]}>Qty</Text>
                        <Text style={[styles.priceColumn, { color: '#FFFFFF' }]}>Price</Text>
                        <Text style={[styles.totalColumn, { color: '#FFFFFF' }]}>Total</Text>
                    </View>
                    {order.productIds.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.itemColumn}>{item.book?.title || 'Unknown Book'}</Text>
                            <Text style={styles.qtyColumn}>{item.quantity || 1}</Text>
                            <Text style={styles.priceColumn}>₹{item.price}</Text>
                            <Text style={styles.totalColumn}>₹{(item.price * (item.quantity || 1)).toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

                {/* Summary Section */}
                <View style={styles.summarySection}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Subtotal:</Text>
                        <Text style={styles.summaryAmount}>₹{order.totalPrice}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Tax (10%):</Text>
                        <Text style={styles.summaryAmount}>₹{(order.totalPrice * 0.1).toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalAmount}>
                        <Text style={styles.totalAmountText}>Total Amount:</Text>
                        <Text style={styles.totalAmountText}>₹{(order.totalPrice * 1.1).toFixed(2)}</Text>
                    </View>
                </View>

                {/* Payment Details */}
                <View style={styles.paymentDetails}>
                    <Text style={styles.sectionTitle}>Payment Details:</Text>
                    <Text style={styles.text}>Payment ID: {order.paymentId}</Text>
                    <Text style={styles.text}>Payment Method: Online</Text>
                    <Text style={styles.text}>Payment Status: {order.paymentStatus}</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Thank you for shopping with Freshbooks!</Text>
                    <Text style={{ marginTop: 5 }}>For any queries, please contact support@freshbooks.in</Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePDF;

