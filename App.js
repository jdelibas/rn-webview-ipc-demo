import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {

  let webView = null

  const [count, setCount] = useState(0);
  const sendPostMessage = () => {
    if (webView) {
      webView.postMessage(count)
    }
  }

  const onPress = () => {
    setCount(prevCount => prevCount + 1)
    sendPostMessage()
  }

  const [showWebview, setShowWebview] = useState(false);
  const toggleShowWebview = () => {
    setShowWebview(!showWebview);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text>Count: {count}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>Increment Count</Text>
      </TouchableOpacity>

      { showWebview &&
        <WebView 
        cacheEnabled={false}
        incognito = {true}
        source={{ uri: 'http://192.168.2.143:8080' }} 
        onMessage={(e) => setCount(parseInt(e.nativeEvent.data))} 
        injectedJavaScript={`window.getRNData = () => ${count} `}
        onLoadEnd={() => sendPostMessage()}
        ref={( w ) => webView = w}
        />
      }

      <TouchableOpacity
        style={styles.button}
        onPress={toggleShowWebview}
      >
        <Text>Show Webview</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }

});

export default App;