import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [item, setItem] = useState("");
  const [listItems, setListItems] = useState([]);

  return (
    <View style={styles.container}>
      <View style={{}}>
        <TextInput
          style={{ marginBottom: 10, width: 100, height: 70 }}
          onChangeText={(e) => {
            setItem(e);
          }}
          placeholder="item.."
        ></TextInput>
        <Button
          onPress={() => {
            setListItems([...listItems, item]);
          }}
          title="Add "
        ></Button>
      </View>
      <View>
        {listItems.map((value, index) => {
          return <Text key={index}>{value}</Text>;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
