import React from "react";
import { StatusBar, StyleSheet, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native";
import { useNavigation } from "react-navigation-hooks";

const { useState } = React;

const AnswerPollScreen = () => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const ijs = `(function() {
    window.postMessage('data');
  })()`;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <WebView
        style={{ zIndex: loading ? -1 : 1 }}
        onLoadStart={(): void => {
          setLoading(true);
        }}
        onMessage={(str) => {
          // console.log("haihai", str.nativeEvent.data);
          // setTimeout(() => navigate("Home", { alertMessage: "Success!" }), 2000);
          setLoading(false);
        }}
        injectedJavaScript={ijs}
        onLoadEnd={(): void => {
          setLoading(false);
        }}
        source={{
          uri:
            "https://docs.google.com/forms/d/e/1FAIpQLSdEkH34NZDFbtxJCFCYLhVruqf1cQI2uZyV5j44E5YpblSOhQ/viewform?vc=0&c=0&w=1"
        }}
      />
      <ActivityIndicator
        style={[styles.loading, { zIndex: loading ? 1 : -1 }]}
        size="small"
        color="#0000ff"
        animating={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AnswerPollScreen;
