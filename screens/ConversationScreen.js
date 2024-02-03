import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function MessagerieScreen({navigation}) {
  const [messages, setMessages] = useState([
    { text: "Je n'en ai aucune idée, il faudrait que je regarde et je te tiendrai au courant. De toute façon, ne t'inquiète pas, je reviens vers toi dès que j'en sais plus", isUser: false },
    { text: "Aucune idée", isUser: false },
  ]);

  const [inputText, setInputText] = useState("");

  const addMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { text: inputText.trim(), isUser: true }]);
      setInputText(""); 
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.headerMessage}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                    <FontAwesome name='chevron-left' size={28} color={'#182A49'} />
                </TouchableOpacity>
                {/* Header avec le nom de la personne */}
                <TouchableOpacity>
                <View style={styles.nomContact}>
                    <FontAwesome name='user' size={35} color={'#182A49'} style={styles.headerIcon} />
                    <Text style={styles.headerText}>Antoine</Text>
                </View>
                </TouchableOpacity>
            </View>

            {/* Zone de conversation */}
            <View style={styles.conversationContainer}>
              {/* Messages */}
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                inverted
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                onScrollBeginDrag={() => Keyboard.dismiss()}
             >
                {messages.map((message, index) => (
                    <View key={index} style={[styles.messageContainer, message.isUser ? styles.userMessageContainer : styles.otherMessageContainer]}>
                    <View style={[styles.messageBubble, message.isUser ? styles.userMessageBubble : styles.otherMessageBubble]}>
                        <Text style={[styles.messageText, message.isUser ? styles.userMessageText : styles.otherMessageText]}>{message.text}</Text>
                    </View>
                    </View>
                ))}
                </ScrollView>

              {/* Saisie de texte */}
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Votre message"
                  style={styles.textInput}
                  value={inputText}
                  onChangeText={(text) => setInputText(text)}
                  onSubmitEditing={addMessage}
                />
                <TouchableOpacity onPress={() => addMessage()}>
                  <FontAwesome name='send' size={20} color={'#007BFF'} style={styles.sendIcon}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  nomContact: {
    alignItems: 'center',
    marginLeft:80,
    marginBottom: 16,
  },
  headerMessage:{
    flexDirection:'row',
  },
  icon:{
    width:50,
    marginLeft:30,
    marginTop:20,
  },
  headerIcon: {
    marginTop:15,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversationContainer: {
    flex: 1,
    marginBottom: 10,
    justifyContent: 'flex-end', 
    padding:10
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  messageBubble: {
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  messageText: {
    paddingRight: 15,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 18,
    padding: 10,
    marginTop:20,
    backgroundColor:'#fff'
  },
  messageScrollView:{
    height:500
  },
  sendIcon:{ 
    marginLeft:10,
    marginTop:30,
    height:30,
    width:30,
}, 
userMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', 
    marginBottom: 10,
  },
  userMessageBubble: {
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    padding: 10,
  },
  otherMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    marginBottom: 10,
  },
  otherMessageBubble: {
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#000', 
  },
  userMessageText: {
    color: '#FFF', 
  },
  otherMessageText: {
    color: '#000', 
  },

});