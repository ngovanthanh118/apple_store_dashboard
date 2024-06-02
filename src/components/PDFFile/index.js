import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        textAlign: "center",
        fontSize: "32px",
        fontWeight: "500"
    },
    image: {
        width: "80px",
        height: "80px"
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }

})
export default function PDFFile({ infor }) {
    return (
        <Document title='Bill'>
            <Page size="A4">
                <View style={styles.section}>
                    <Text style={styles.header}>Thank you for order</Text>
                    <Text style={styles.header}>Customer Info</Text>
                    <Text>Name: {infor.customer?.name}</Text>
                    <Text>Email: {infor.customer?.email}</Text>
                    <Text>Phone: {infor.customer?.phone}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Receiver Info</Text>
                    <Text>Name: {infor.name}</Text>
                    <Text>Email: {infor.email}</Text>
                    <Text>Address: {infor.phone}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Order Information</Text>
                    {infor.products?.length > 0 && infor.products.map((product => (
                        <View key={product._id} style={styles.container}>
                            <Image src={`${process.env.REACT_APP_API_URL}/images/${product.image}`} style={styles.image} />
                            <Text>{product.name} {product.capacity} x {product.quantity}</Text>
                            <Text>{product.price?.toLocaleString()}</Text>
                        </View>
                    )))}
                    <Text >Total: {infor.total_pay?.toLocaleString()}</Text>
                    <Text>Payment method: {infor.payment_method}</Text>
                    <Text>Note: {infor.note}</Text>
                    <Text>Date: {infor.createdAt}</Text>
                </View>
            </Page>
        </Document>
    )
}