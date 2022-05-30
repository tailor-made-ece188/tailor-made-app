import { StyleSheet } from "react-native";
export const PRIMARY_COLOR = '#FE5F55'
export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center"
    },
    landingSquare:{
        backgroundColor:PRIMARY_COLOR,
        height: "100%",
        width:"100%",
    },
    landingSquare1:{
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:'#ffa19c',
        height: "90%",
        width:"100%",
        shadowColor:"#000000",
    },
    landingSquare2:{
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:PRIMARY_COLOR,
        height: "82%",
        width:"100%",
        shadowColor:"#000000",
    },
    landingSquare3:{
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:'#f0f0f0',
        height: "98%",
        width:"100%",
        shadowColor:"#000000",
    },
    landingSquare4:{
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:'#e8e8e8',
        height: "95%",
        width:"100%",
        shadowColor:"#000000",
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
        
        width: 180,
        height: 180,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius:100,
        marginTop:30,
        backgroundColor:PRIMARY_COLOR,
    },
    landingImage2:{
        
        width: "80%",
        height: 40,
        marginTop:15,
        marginBottom:40,
    },
    landingImage3:{
        
        width: "80%",
        height: 40,
        marginTop:15,
        marginBottom:20,
    },
    landingTitle:{
        fontSize:50,
        fontFamily:'sans-serif',
        color:"#fff",
        marginBottom:90,
        marginTop:20,
        elevation:4,
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
        height: 60,
        justifyContent: "center",
        width:"120%",
        backgroundColor:"#fff",
        borderBottomColor: '#fff',
        marginBottom:15,
        fontSize:16,
    },
    button:{
        elevation: 0,
        marginBottom: 30,
        width:"60%",
        height: 50,
        top:40,
        borderRadius:40,
        
        
    },
    buttonBack:{
        elevation: 0,
        marginBottom: 30,
        width:"60%",
        height: 50,
        top:40,
        borderRadius:40,
        borderColor:PRIMARY_COLOR,
        
    },
    buttonInner:{
        fontSize: 15,
        height: 50,
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        borderRadius:40,
        
        
    },
    buttonBackInner:{
        fontSize: 15,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
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
        marginTop: 30,
        borderRadius:10,
        borderColor:PRIMARY_COLOR,
        borderWidth:3,
        paddingBottom:5,
        elevation:1,
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
        marginTop:15,
    },
    profileText:{
        fontSize:16,
        color:"#fff"
    },
    profileTitleText:{
        fontSize:30,
        marginBottom:5,
        marginTop:5,
        color:"#fff",
        elevation:2,
    },
    profileSubtitleText:{
        fontSize:20,
        marginBottom:35,
        marginTop:5,
        color:"#fff",
        elevation:2,
    },
    profileLogoutButton:{
        width: 100,
        borderRadius: 40,
        position:"absolute",
        right:0,
        marginTop:5,
    },
    profileSquare1:{
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:'#ffa19c',
        height: "23%",
        width:"100%",
        elevation:1,
    },
    profileSquare2:{
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:PRIMARY_COLOR,
        height: "18%",
        width:"100%",
        elevation:2,
    },
    fitImage: {
        height: 400,
        width: 320,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    bar:{
        backgroundColor:PRIMARY_COLOR
    },

    homeSquare1:{
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:'#ffa19c',
        height: "32%",
        width:"100%",
        elevation:1,
    },
    homeSquare2:{
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:PRIMARY_COLOR,
        height: "27.55%",
        width:"100%",
        elevation:2,
    },
    camera:{
        height:"93%",
        width:"100%",
    },
    cameraContainer:{
        width:"100%",
        height:"100%"
        
    },
    cameraFlip:{
        position:'absolute',
        bottom:300,
        color:"#FFF",
    },
    uploadImage:{
        marginTop:40,
        height:"70%",
        width:"100%",
    },
    identifyButton:{
        marginBottom:20,
        height:50,
    },
    identifyButton2:{
        height:50,
    },
    identifyContainer:{
        marginBottom:-40,
    },
})