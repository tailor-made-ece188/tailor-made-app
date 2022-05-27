import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center"
    },
    topBar:{
        width:"100%",
        height: 70,
        backgroundColor: '#FE5F55',
    },
    containerLanding: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        width:"100%",
    },
    landingImage:{
        
        width: "60%",
        height: "50%",
        borderRadius:40,
        marginBottom: 15,
    },
    landingVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height:"100%",
    },
    input: {
        minWidth: 40,
        height: 40,
        justifyContent: "center",
        width:"100%",
        borderRadius:40,
        
    },
    button:{
        
        elevation: 3,
        marginBottom: 5,
        width:"60%",
        borderRadius:40,
    },
    loginContainer: {
        width:"60%",
        //backgroundColor: '#FE5F55',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        top: 40,
    },
    loginContainer2: {
        width:"100%",
        top:70,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
    },
    registerContainer: {
        width:"60%",
        //backgroundColor: '#FE5F55',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        marginBottom: 15,
    },
    profileContainer: {
        width:"100%",
        backgroundColor: '#FE5F55',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        marginBottom: 15,
        borderRadius:10,
        
    },
    profileContainer2: {
        width:"100%",
        height:"65%",
        //backgroundColor: '#FE5F55',
        marginTop:15,
        marginBottom: 30,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    profileContainer3:{
        marginTop:20,
    },
    profileText:{
        fontSize:20,
        marginBottom:5,
    },
    profileTitleText:{
        fontSize:30,
        marginBottom:5,
        marginTop:5,
    },
    profileSubtitleText:{
        fontSize:20,
        marginBottom:5,
        marginTop:5,
    },
    profileLogoutButton:{
        width: 100,
        borderRadius: 40,
        position:"absolute",
        right:0,
        marginTop:5,
    },
    fitImage: {
        height: 240,
        width: 320,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    }
})