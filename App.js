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
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  const [item, setItem] = useState("");
  const [listItems, setListItems] = useState([]);

  return <StartGameScreen />;
}
