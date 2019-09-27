import { StyleSheet } from 'react-native'

export default StyleSheet.create({
      container: {
          flex: 1
        },
        loader: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff"
        },
        title: {
          fontSize: 20,
          fontWeight: '500',
          color: '#fff',
          textAlign: "center",
          marginBottom: 10
        },
        List: {
          marginTop: 20,
        },
        listtitle: {
          color: '#fff',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 20
        },
        list: {
          paddingVertical: 5,
          margin: 0,
          flexDirection: "row",
          backgroundColor: "#fff",
          justifyContent: "flex-start",
          alignItems: "center",
          zIndex: -1,
          borderBottomColor: '#EFEFEF',
          borderTopColor: '#EFEFEF',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderStyle: 'solid'
        },
        addicon: {
          position: "absolute",
          bottom: 20,
          width: "100%",
          left: 320,
          zIndex: 1
        },
        clientcontainer: {
            flex: 1,
            flexDirection: 'row'
        },
        clientbadgecontainer: {
            marginTop: 10,
            marginLeft: 20,
            textAlign: 'center', 
            alignItems: 'center',
            justifyContent: 'center' 
        },
        clientinitialscontainer: {
            width: 60,
            height: 60,
            borderRadius: 40,
            backgroundColor: "#fff",
            borderWidth: 4,
            borderColor: '#B8D39C',
        },
        clientbadge: {
           color: '#B8D39C',
           fontSize: 24,
           fontWeight: '700'
        },
        clientcontentcontainer : {
            marginLeft: 30
        },
        clientinfo : {
            marginTop: 5,
            marginBottom: 5
        },
        assetinfo: {
          marginTop: 3,
          marginBottom: 3
        },
        clientname: {
            color: "#000",
            fontSize: 18   
        },
        clientdetail: {
            color: "#999"    
        },
        assetdetail: {
          fontSize: 12
        },
        row: {
         flexDirection: 'row',
         paddingTop: 8,
         paddingBottom: 8
       },
       itemicon: {
         alignItems: 'center',
         flexDirection: 'row',
         justifyContent: 'flex-start',
         padding: 5
       },
       edges: {
         flex: 1,
         alignItems: 'flex-start',
         justifyContent: 'flex-start',
         padding: 5
       },
       label: {
         fontSize: 18,
         fontWeight: '600',
         color: '#333232'
       },
       heavyline: {
         height: 1,
         width: "100%",
         backgroundColor: "rgba(255,255,255,0.5)",
         marginBottom: 20
       },
        line: {
          height: 0.5,
          width: "100%",
          backgroundColor: "#d6d6d6"
        },
        lightText: {
          color: "#f7f7f7",
          width: 300,
          fontWeight: '500',
          paddingLeft: 15,
          fontSize: 18
        },
        bulletPoint: {
          fontSize: 10,
          color: "#f7f7f7"
        },
         bulletText: {
           color: "#f7f7f7",
           width: 300,
           fontWeight: '400',
           paddingLeft: 10,
           fontSize: 14
         },
        icon: {
          position: "absolute",
          bottom: 20,
          width: "100%",
          left: 299,
          zIndex: 1
        },
        numberBox: {
          position: "absolute",
          bottom: 75,
          width: 30,
          height: 30,
          borderRadius: 15,
          left: 330,
          zIndex: 3,
          backgroundColor: "#ff6600",
          justifyContent: "center",
          alignItems: "center"
        },
        number: {
          fontSize: 14,
          fontWeight: 'bold',
          color: "#fff"
        },
        selected: {
          backgroundColor: "#ff6600"
        },
        button: {
        marginTop: 60,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#ff6600',
        borderRadius: 4,
        marginVertical: 10,
        marginHorizontal: 20
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
      }
})