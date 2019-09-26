import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loginform: {
        marginTop: 60,
        marginLeft: 20,
        width: '85%'
    },
    clientform: {
        marginLeft: 10,
        width: '90%'
    },
    twoitemcontainer: {
        flexDirection: "row"
    },
    smallitem: {
        width: '45%',
        paddingTop: 5,
        paddingBottom: 5
    },
    smallitempicker: {
        width: '45%',
        paddingTop: 5,
        paddingBottom: 0,
        alignContent: 'stretch',
        alignSelf: "flex-end"
    },
    item: {
        paddingTop: 5,
        paddingBottom: 5
    },
    lastitem: {
        marginLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    label: {
        color: '#a6a6a6'
    },
    noborder: {
        borderBottomWidth: 0
    },
    button: {
        marginTop: 50,
        width: '60%',
        textAlign: 'center'

    }
});