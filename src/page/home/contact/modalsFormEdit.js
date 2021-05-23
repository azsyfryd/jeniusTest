import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Image,
    TouchableOpacity,
    Alert
}from 'react-native'
import axios from 'axios'
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet'
import Modal from 'react-native-modal'
import { D } from '../../../variable/dimension'
export class modalsForm extends Component {
    constructor(props){
        super(props)
        this.state={
            data : this.props.data,

            id : this.props.data.id,
            firstName :  this.props.data.firstName,
            lastName : this.props.data.lastName,
            age :  this.props.data.age.toString(),
            photoURL : this.props.data.photo,

            textBtn : 'Edit Contact',

            tempImage : null,
        }
    }

    componentDidMount(){
        console.log('data modal edit : ',this.state.data)
    }

    uploadPhoto = async () =>{
        const reference = storage().ref(`jeniusContactPhoto/${this.state.firstName+this.state.lastName}.jpg`);
        const pathToFile = this.state.tempImage.path
        console.log(pathToFile)
        const task = await reference.putFile(pathToFile);
        const url = await storage().ref(`jeniusContactPhoto/${this.state.firstName+this.state.lastName}.jpg`).getDownloadURL();
        console.log('download url : ',url)
        return url
    }

    openGallery = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.4,
	        compressVideoPreset: "MediumQuality"
        }).then(image => {
            this.setState({tempImage : image})
            console.log(image);
        }).then(()=>{
            // this.uploadPhoto()
        }).catch((err)=>{
            Alert.alert(err)
        })
    }   

    servicePutContact = async () =>{
        let photo = await this.uploadPhoto()
        let body = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "age": this.state.age.toString(),
            "photo": (this.state.tempImage==null)? 'null' : photo
        }
        console.log(body)
        try{
            axios({
                url : 'https://simple-contact-crud.herokuapp.com/contact/'+this.state.id,
                method  :'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data:body
            }).then((res)=>{
                if(res.status == 201){
                    console.log(res.status)
                    console.log(res.data)
                    this.setState({
                        firstName : '',
                        lastName : '',
                        age : '',
                        photoURL : 'null',
                    })
                    this.props.closeModal()
                }else{
                    console.log(res.status)
                    console.log(res.data.message)
                    Alert.alert(res.data.message)
                }
            }).catch((res)=>{
                console.log(res)
                Alert.alert(res.toString())
            })
        }catch(err){
            console.log(err)
        }
        
    }

    formInput(){
        return(
            <View>
                <View style={{flexDirection : 'row'}}>
                    <View style={{flex : 1/2,marginRight : 5}}>
                        <View>
                            <Text>First Name</Text>
                        </View>
                        <View style={[style.inputContainer]}>
                            <TextInput 
                                placeholder={'first name'}
                                value={this.state.firstName}
                                onChangeText={(val)=>{this.setState({firstName:val})}}
                            />
                        </View>
                    </View>
                    <View style={{flex : 1/2,marginLeft : 5}}>
                        <View>
                            <Text>Last Name</Text>
                        </View>
                        <View style={style.inputContainer}>
                            <TextInput 
                                placeholder={'last name'}
                                value={this.state.lastName}
                                onChangeText={(val)=>{this.setState({lastName:val})}}
                            />
                        </View>
                    </View>
                </View>
                <View style={{paddingTop : 10}}>
                    <View>
                        <Text>Age</Text>
                    </View>
                    <View style={[style.inputContainer]}>
                        <TextInput 
                            keyboardType={'numeric'}
                            placeholder={'Age'}
                            value={this.state.age}
                            onChangeText={(val)=>{this.setState({age:val})}}
                        />
                    </View>
                </View>
                <View style={{paddingTop : 10}}>
                    <View>
                        <Text>Photo</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        this.openGallery()
                    }}>
                        <View style={{alignItems : 'center'}}>
                            <Image source={require('../../../image/camera.png')} style={{width : D.width * 30/100,height : D.width * 30/100,resizeMode : 'contain'}}/>
                            <View style={{position : 'absolute'}}>
                                {
                                    (this.state.photoURL == 'null')?
                                    <View></View>
                                    :
                                    (this.state.tempImage != null)?
                                    <Image source={{uri : this.state.tempImage.path}} style={{width : D.width * 30/100,height : D.width * 30/100,resizeMode : 'contain'}}/>
                                    :
                                    <Image source={{uri : this.state.photoURL}} style={{width : D.width * 30/100,height : D.width * 30/100,resizeMode : 'contain'}}/>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    addbtn(){
        return(
            <View>
                <TouchableOpacity onPress={()=>{
                    this.servicePutContact()
                }}>
                    <View style={style.btnAdd}>
                        <Text style={{color : 'white', fontSize : 20,paddingVertical : 15,fontWeight : '700'}}>{this.state.textBtn}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View>
                {/* <BottomSheet>
                    <Text>sample</Text>
                </BottomSheet> */}
                <Modal
                    isVisible={this.props.open}
                    style={{justifyContent : 'center'}}
                    coverScreen={true}
                    // deviceWidth={D.width*1}
                    onBackButtonPress={()=>{this.props.closeModal()}}
                    onSwipeComplete={()=>{this.props.closeModal()}}
                    onBackdropPress={()=>{this.props.closeModal()}}
                    swipeDirection={['down']}
                    useNativeDriverForBackdrop
                    statusBarTranslucent
                > 
                <KeyboardAvoidingView behavior='position' >
                <View style={style.modalContainer}>
                    {/* <View style={{alignItems : 'center',paddingBottom : 20}}>
                        <View style={{width : 80,height : 10,backgroundColor : '#f2f2f2',borderRadius : 10}}/>
                    </View> */}
                    <ScrollView nestedScrollEnabled={true}>
                        <View>
                            {this.formInput()}
                        </View>
                        <View style={{paddingTop : 20}}>
                            {this.addbtn()}
                        </View>
                    </ScrollView>
                </View>
                </KeyboardAvoidingView>
                </Modal>
            </View>
        )
    }
}

const style=StyleSheet.create({
    modalContainer : {
        backgroundColor:'white',
        borderRadius : 10,
        padding : 15,
        paddingVertical : 20,
    },
    inputContainer : {
        backgroundColor : '#f7f7f7',
        alignSelf:'stretch',
        borderRadius : 10,
        marginTop : 10,
        paddingHorizontal : 10
    },
    btnAdd : {
        backgroundColor : '#03bafc',
        alignSelf : 'stretch',
        borderRadius : 10,
        justifyContent : 'center',alignItems : 'center'
    }
})

export default modalsForm
