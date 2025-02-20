import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../assets/freshbooks-navbar-logo.png';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    logo: {
        width: 150,
        height: 50
    },
    headerRight: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    companyDetails: {
        marginBottom: 20
    },
    customerDetails: {
        marginBottom: 20
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 20
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        minHeight: 30,
        alignItems: 'center'
    },
    tableHeader: {
        backgroundColor: '#F0F0F0'
    },
    tableCell: {
        flex: 1,
        padding: 5
    },
    text: {
        fontSize: 10,
        marginBottom: 5
    },
    bold: {
        fontWeight: 'bold'
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        borderTopColor: '#CCCCCC',
        borderTopWidth: 1,
        paddingTop: 10
    }
});

// Create Invoice Document Component
const InvoicePDF = ({ order }) => {
    const today = new Date().toLocaleDateString();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Image style={styles.logo} src={logo} />
                    <View style={styles.headerRight}>
                        <Text style={styles.text}>Invoice #: {order._id}</Text>
                        <Text style={styles.text}>Date: {today}</Text>
                    </View>
                </View>

                <Text style={styles.title}>INVOICE</Text>

                {/* Company Details */}
                <View style={styles.companyDetails}>
                    <Text style={[styles.text, styles.bold]}>Freshbooks</Text>
                    <Text style={styles.text}>No: 86</Text>
                    <Text style={styles.text}>Main Street</Text>
                    <Text style={styles.text}>Phone: (123) 456-7890</Text>
                    <Text style={styles.text}>Email: support@freshbooks.in</Text>
                </View>

                {/* Customer Details */}
                <View style={styles.customerDetails}>
                    <Text style={[styles.text, styles.bold]}>Bill To:</Text>
                    <Text style={styles.text}>{order.customerName}</Text>
                    <Text style={styles.text}>{order.shippingAddress}</Text>
                    <Text style={styles.text}>Email: {order.email}</Text>
                </View>

                {/* Order Details Table */}
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.tableCell}>Item</Text>
                        <Text style={styles.tableCell}>Quantity</Text>
                        <Text style={styles.tableCell}>Price</Text>
                        <Text style={styles.tableCell}>Total</Text>
                    </View>
                    {order.items.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.title}</Text>
                            <Text style={styles.tableCell}>{item.quantity}</Text>
                            <Text style={styles.tableCell}>₹{item.price}</Text>
                            <Text style={styles.tableCell}>₹{item.price * item.quantity}</Text>
                        </View>
                    ))}
                </View>

                {/* Payment Details */}
                <View style={styles.section}>
                    <Text style={[styles.text, styles.bold]}>Payment Details:</Text>
                    <Text style={styles.text}>Payment ID: {order.paymentId}</Text>
                    <Text style={styles.text}>Payment Method: {order.paymentMethod}</Text>
                    <Text style={styles.text}>Payment Status: {order.paymentStatus}</Text>
                    <Text style={[styles.text, styles.bold]}>Subtotal: ₹{order.subtotal}</Text>
                    <Text style={styles.text}>Tax (10%): ₹{order.tax}</Text>
                    <Text style={[styles.text, styles.bold]}>Total Amount: ₹{order.totalAmount}</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.text}>Thank you for shopping with Freshbooks!</Text>
                    <Text style={styles.text}>For any queries, please contact support@freshbooks.in</Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePDF; 