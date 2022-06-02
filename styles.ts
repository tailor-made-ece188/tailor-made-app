import { PrivateValueStore } from "@react-navigation/native";
import { relative } from "path";
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
    uploadPicContainer: {
        // display: "flex", 
        // flexDirection: "row",
        // alignContent: "center"
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
    flexRow: {
        justifyContent: "center",
        elevation:1,
    },
    buttonRow:{
        position:'absolute',
        height:30,
        elevation:2,
        top:0,
        backgroundColor: '#00000000'
    },
    buttonRowButton:{
        height:40,
    },
    classifiedImageRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 20,
        backgroundColor: '#00000000'
    },
    categoryRow: {
        
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: 50,
        zIndex: 4,
        elevation: 2,
        marginBottom: 5
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
        backgroundColor: "#fff",
        borderBottomColor: '#fff',
        marginBottom:15,
        fontSize:16,
    },
    nameInput: {
        minWidth: 40,
        height: 60,
        justifyContent: "center",
        width:"120%",
        backgroundColor: "#fff",
        borderBottomColor: '#fff',
        marginBottom:15,
        fontSize:16,
    },
    renameInput: {
        minWidth: 40,
        height: 50,
        justifyContent: "center",
        width:300,
        borderBottomColor: '#fff',
        backgroundColor: "#fff",
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
        position: "relative",
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
    publicToggle: {
        position: "absolute",
        right: 10,
        width: 50,
        top: 10,
        height: 50,
        zIndex: 3
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
    similarImage: {
        height: 175,
        left:-10,
        
    },
    
    classifiedImage: {
        height: 300,
        width: 350,
        borderWidth:2,
        borderColor:PRIMARY_COLOR,
        zIndex: -1,
        position: "relative"
        
    },
    classifiedImage2: {
        height: 200,
        width: 340,
        borderWidth:2,
        borderColor:PRIMARY_COLOR,
        zIndex: -1,
        position: "relative"
        
    },
    picItem: {
        position: "relative"
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
        height:"60%",
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        position: "relative"
    },
    cameraContainer:{
        width:"100%",
        height:"100%",
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
    },
    cameraFlip:{
        fontSize:16,
        color:"#000",
        position:'absolute',
        top:-350,
        left:-150,
    },
    cameraCapture:{
        backgroundColor:"#FFF",
        position: "absolute",
        height:60,
        width:60,
        borderRadius:70,
        top:130,
        left: -30
    },
    uploadImage:{
        marginTop:40,
        height:400,
        width:400,
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
    outfitName:{
        fontSize:18,
        fontWeight:'bold',
        
    },
    outfitText:{
        marginBottom:5,
        fontSize:16,
    },
    outfitType:{
        fontSize:28,
        backgroundColor:PRIMARY_COLOR,
        paddingLeft:10,
        color:'white',
        marginTop:20,
        fontWeight:'bold',
        elevation:8,
    },
    outfitDisplay:{
        marginLeft:10,
        marginTop:20,
    },
    renameModal: {
        height: 200,
        width: "80%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color:PRIMARY_COLOR,
        borderRadius:20,
        marginLeft:40,
        borderColor:PRIMARY_COLOR,
        borderWidth:2,
    },
    identifyInput:{
        minWidth: 40,
        height: 60,
        justifyContent: "center",
        width:"80%",
        backgroundColor: "#fff",
        borderBottomColor: '#fff',
        marginBottom:15,
        fontSize:16,
    },
    outfitContainer:{
        height:"100%",
    },
    buffer:{
        marginTop:40,
        width: "100%",
        height:20,
        backgroundColor:PRIMARY_COLOR,
    },
    outfitPortal:{
        alignItems: "center",
        justifyContent: "center",
        
    },
    outfitModal1:{
        borderRadius:20,
        color:PRIMARY_COLOR,
        alignItems: "center",
        justifyContent: "center",
        
    },
    modalText1:{
        fontWeight:'bold',
        fontSize:18,
        marginBottom:10,
    },
    drawModal:{
        marginLeft:40,
    },
    drawContainer:{
        backgroundColor:"#fff",
        
    },
})