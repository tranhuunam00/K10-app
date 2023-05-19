import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [item, setItem] = useState("");
  const [listItems, setListItems] = useState([]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100 }}>
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

      <FlatList
        data={listItems}
        keyExtractor={(value) => {
          return value + new Date().getTime() + Math.random(100);
        }}
        renderItem={(item) => (
          <View style={{ height: 100, width: 100, backgroundColor: "#ff00ff" }}>
            <Text>{item.item}</Text>
          </View>
        )}
      ></FlatList>
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
