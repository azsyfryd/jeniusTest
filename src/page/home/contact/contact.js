import axios from 'axios'
import React, { Component } from 'react'
import { 
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import ModalForm from './modalsForm'
import ModalFormEdit from './modalsFormEdit'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../../component/header'
import { D } from '../../../variable/dimension'

export class Contact extends Component {
    constructor(props){
        super(props)
        this.state={
            contactData : null,
            contactSelected : [],
            search : '',

            modalForm : false,
            modalFormEdit : false,
            dataToModal : {}  
        }
    }

    componentDidMount(){
        console.log('did mount outer')
        this.serviceGetContact()
        this.props.navigation.addListener('focus',()=>{
            console.log('did mount inner')
            this.serviceGetContact()
        })
    }

    serviceGetContact = async () =>{
        await axios.get('https://simple-contact-crud.herokuapp.com/contact')
        .then(async(res)=>{
            if(res.status == 200){
                console.log('res data : ',res.data.data)
                let dat = res.data.data
                let data = []
                if(dat.length!=0){
                    dat.map((item,index)=>{
                        data.push({
                            id : item.id,
                            age : item.age,
                            firstName : item.firstName,
                            lastName : item.lastName,
                            photo : item.photo,
                            bool : false,
                        })
                    })
                }
                await data.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))
                this.setState({contactData : data,contactSelected : []})
            }else{
                console.log('get contact err : ',res.status)
                console.log('get contact err : ',res.data)
            }
        })
    }

    serviceDeleteContact = async () =>{
        let a = this.state.contactSelected
        a.map(async(item,index)=>{
            console.log(item)
            await axios.delete('https://simple-contact-crud.herokuapp.com/contact/'+item)
            .then((res)=>{
                if(res.status == 200){
                    console.log('res data : ',res.data.data)
                }else{
                    console.log('delete contact err : ',res.status)
                    console.log('delete contact err : ',res.data)
                }
            })
        })
        this.setState({contactSelected : []},()=>{
            this.serviceGetContact()
        })
    }

    contactDataRender(){
        if(this.state.contactData != null){
            return(
                <View>
                    {this.state.contactData.map((item,index)=>{
                        let temp = item.firstName.toLowerCase()+' '+item.lastName.toLowerCase()
                        if(this.state.search == ''){
                            return(
                                <View>{this.contactRender(item,index)}</View>
                            )
                        }else if(this.state.search!='' && temp.includes(this.state.search.toLowerCase()) ){
                            return(
                                <View>{this.contactRender(item,index)}</View>
                            )
                        }
                    })}
                </View>
            )
        }else{
            return(
                <View>

                </View>
            )
        }
    }
    contactRender(item,index){
        return(
            <TouchableOpacity onPress={()=>{
                this.setBollContact(index)
            }}>
                <View style={{flexDirection : 'row',paddingTop :20}}>
                    <View style={{flex : 2/10}}>
                        <View> 
                            <Image source={require('../../../image/person.jpeg')} style={{width : 50,height : 50,borderRadius : 50, resizeMode:'cover'}}/>
                        </View>
                        <View style={{position : 'absolute'}}>
                            <Image source={{uri : item.photo}} style={{width : 50,height : 50,borderRadius : 50, resizeMode:'cover'}}/>
                        </View>
                    </View>
                    <View style={{flex : 7/10}}>
                        <Text>{item.firstName} {item.lastName}</Text>
                        <Text>Age : {item.age}</Text>
                    </View>
                    <View style={{flex : 1/10,justifyContent : 'center', alignItems : 'flex-end',paddingRight : 10}}>
                        {
                            (item.bool)?
                            <View style={{
                                borderRadius : 50,
                                width : 20,height:20,
                                borderWidth:1,borderColor : '#03bafc',backgroundColor : '#b3eafe',
                                justifyContent : 'center',alignItems : 'center'
                            }}>
                                <Icon name={'check'} size={10} color={'#03bafc'}/>
                            </View>
                            :
                            <View style={{
                                borderRadius : 50,
                                width : 20,height:20,
                                borderWidth:1,borderColor : '#03bafc'
                            }}/>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    setBollContact = async (index) =>{
        let dat = this.state.contactData
        dat[index].bool = !this.state.contactData[index].bool
        
        if(dat[index].bool == true){
            let a = this.state.contactSelected
            a.push(dat[index].id)
            this.setState({contactSelected : a})

        }else if(dat[index].bool == false){
            var filteredAry = this.state.contactSelected.filter(e => e !== dat[index].id)
            this.setState({contactSelected : filteredAry})
        }

        this.setState({contactData : dat})

    }

    searchBarRender(){
        return(
            <View style={{paddingHorizontal : D.width *3/100}}>
                
                <View style={style.searchBarContainer}>
                    <View style={{flex:9/10}}>
                        <TextInput
                            placeholder={'Search Contact'}
                            value={this.state.search}
                            onChangeText={(val)=>{
                                this.setState({search : val})
                            }}
                        />
                    </View>
                    <View style={{flex:1/10,alignItems : 'flex-end',paddingRight : 10}}>
                        <TouchableOpacity onPress={()=>{this.setState({search : ''})}}>
                            <Icon name={'close-circle'} color={'grey'} size={20}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    deleteEditRender(){
        return(
            <View style={{paddingHorizontal : D.width*5/100, flexDirection : 'row',paddingVertical : 10}}>
                <View style={{flex : 1/2}}>
                    {
                        (this.state.contactSelected.length <= 1 && this.state.contactSelected.length !=0)?
                        <TouchableOpacity style={{flexDirection : 'row',alignItems : 'center'}} onPress={async()=>{
                            this.state.contactData.map((item,index)=>{
                                if(item.id == this.state.contactSelected[0]){
                                    this.setState({dataToModal : this.state.contactData[index]},()=>{
                                        console.log('data sama : ', this.state.dataToModal)
                                        this.setState({modalFormEdit : true})
                                    })
                                }
                            })
                        }}>
                            <Icon name={'account-edit'} color={'green'} size={25}/>
                            <Text style={{paddingLeft : 10, color:'green'}}>Edit</Text>
                        </TouchableOpacity>
                        :
                        <View></View>
                    }
                    
                </View>
                <View style={{flex : 1/2, alignItems : 'flex-end'}}>
                    {
                        (this.state.contactSelected.length > 0)?
                        <TouchableOpacity style={{flexDirection : 'row',alignItems : 'center'}} onPress={()=>{
                            // this.setState({modalForm : true})
                            this.serviceDeleteContact()
                        }}>
                            <Icon name={'delete'} color={'red'} size={23}/>
                            <Text style={{paddingLeft : 5, color:'red'}}>Delete</Text>
                        </TouchableOpacity>
                        :
                        <View></View>
                    }
                </View>
            </View>
        )
    }

    addButton(){
        return(
            <View style={style.btnAddStyle}>
                <Icon name={'plus'} size={25} color={'white'}/>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor : 'white'}}>

                <ModalForm 
                    open={this.state.modalForm}
                    closeModal={()=>{
                        this.setState({modalForm : false})
                        this.serviceGetContact()
                    }}
                />

                {
                    (this.state.modalFormEdit)?
                    <ModalFormEdit
                        open={this.state.modalFormEdit}
                        closeModal={()=>{
                            this.setState({modalFormEdit : false})
                            this.serviceGetContact()
                        }}
                        data={this.state.dataToModal}
                    />
                    :
                    <View></View>
                }

                <Header text={'Jenius Contact'}/>

                {/* <View>
                    <Text>{this.state.contactSelected.toString()}</Text>
                </View> */}

                <View style={{paddingTop : 10}}> 
                    {this.searchBarRender()}
                </View>
                <View>
                    {this.deleteEditRender()}
                </View>
                <ScrollView>
                    <View style={{paddingHorizontal : D.width*5/100,paddingBottom : 20}}>
                        {this.contactDataRender()}

                    </View>
                </ScrollView>

                <View style={{position : 'absolute', top : D.height * 75/100,left : D.width*75/100}}>
                    <TouchableOpacity onPress={()=>{
                        console.log('add pressed')
                        this.setState({modalForm : true})
                    }}>
                        {this.addButton()}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style=StyleSheet.create({
    searchBarContainer:{
        alignSelf : 'stretch',
        backgroundColor : '#f5f5f5',
        alignItems: 'center',
        borderRadius : 15,
        paddingHorizontal : 10,
        flexDirection : 'row'
    },
    btnAddStyle:{
        width : 70,height:70,
        justifyContent : 'center', alignItems : 'center',
        borderRadius : 50,
        backgroundColor : '#03bafc',
        // elevation : 1
    }
})

export default Contact
