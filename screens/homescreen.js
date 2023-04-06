import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements'


export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state={
    text: '', 
    isSearchedPressed: false,
    word: '',
    lexicalCategory: '',
    examples: [],
    definition: ""
    }
  }
  getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"
    return fetch(url)
    .then((data)=>{
        if(data.status===200){
            return data.json()
        }
        else{
            return null
        }   
    })
    .then((response)=>{
        var responseObject=response

        if(responseObject){
            var wordData =responseObject.definitions[0]
            var definition=wordData.description
            var lexicalCategory=wordData.wordtype

            this.setState({
              "word": this.state.text,
              "definition": definition,
              "lexicalCategory": lexicalCategory
            })
        }
        else{
          this.setState({
            "word": this.state.word,
            "definition": "Not Found",
            "lexicalCategory": "N/A"
          })
        }
    })
  }



  render() {
    return (
      <View style={styles.container}>
      <Header
      backgroundColor="blue"
      centerComponent={{text: 'Dictionary', style: {color: 'white', fontSize: 20}}}
      />

    <TextInput
    style={styles.inputBox}
      onChangeText={(text)=>{
        this.setState({
            text:text,
            isSearchedPressed: false,
            word: "Loading... ",
            lexicalCategory: "Loading... ",
            examples :[],
            definition: "Loading... "
        })
      }}
      value={this.state.text}
    />

      <TouchableOpacity style= {styles.searchButton}
      onPress= {()=>{
        this.setState({isSearchedPressed: true})
        this.getWord(this.state.text)
      }}>
      </TouchableOpacity>



        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
      <Text style={styles.detailsTitle}>Word:{""}</Text>
      <Text style={styles.detailsText}>{this.state.word}</Text>
       </View> 
        <View style={{flexDirection: 'row',flexWrap: 'wrap', marginTop: 50}}>
      <Text style={styles.detailsTitle}>Type:{""}</Text>
        <Text style={styles.detailsText}>{this.state.lexicalCategory}</Text> 
       </View> 
  <View style={{flexDirection: 'row',flexWrap: 'wrap', marginTop: 50}}>
          <Text style={styles.detailsTitle}>Definition: {""}</Text>
          <Text style={styles.detailsText}>{this.state.definition}</Text>
      </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputBox: {
    width: '80%',
    height: 50,
    marginTop: 100,
    alignSelf: 'center',
    textAlign:'center',
    borderWidth: 2,
    backgroundColor: 'white'
  },
  searchButton:{
    width: 150,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'blue',
    borderRadius: 25

  },
  detailsText:{
    fontSize: 18,
    color: 'black',
    textAlign:'center'
  },
  detailsTitle: {
    fontSize: 32,
    textAlign: 'center',
    color: 'black', 
    marginTop: 5
  }

});
