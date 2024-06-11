import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { removeVietnameseAccents } from '../../utils';
Font.register({
    family: 'Roboto',
    src: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',

});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        // fontFamily: "Roboto"
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
                    <Text style={styles.header}>Cam on ban da dat hang</Text>
                    <Text style={styles.header}>Thong tin nguoi dat</Text>
                    <Text>Ho va ten: {removeVietnameseAccents(infor.customer?.name)}</Text>
                    <Text>Email: {infor.customer?.email}</Text>
                    <Text>So dien thoai: {infor.customer?.phone}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Thong tin nguoi nhan</Text>
                    <Text>Ho va ten: {removeVietnameseAccents(infor.name)}</Text>
                    <Text>So dien thoai: {infor.phone}</Text>
                    <Text>Dia chi: {removeVietnameseAccents(infor.address)}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Thong tin don hang</Text>
                    {infor.products?.length > 0 && infor.products.map((product => (
                        <View key={product._id} style={styles.container}>
                            <Image src={`${process.env.REACT_APP_API_URL}/images/${product.image}`} style={styles.image} />
                            <Text>{product.name} {product.capacity} x {product.quantity}</Text>
                            <Text>{product.price?.toLocaleString()}</Text>
                        </View>
                    )))}
                    <Text>Tong tien: {infor.total_pay?.toLocaleString()}</Text>
                    <Text>Phuong thuc thanh toan: {removeVietnameseAccents(infor.payment_method)}</Text>
                    <Text>Ghi chu: {removeVietnameseAccents(infor.note)}</Text>
                    <Text>Ngay dat: {infor.createdAt}</Text>
                </View>
            </Page>
        </Document>
    )
}