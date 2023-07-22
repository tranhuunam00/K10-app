import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const TextEditor = () => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState("normal");
  const [textAlign, setTextAlign] = useState("left");
  const [underline, setUnderline] = useState(false);
  const [italic, setItalic] = useState(false);

  const onChangeText = (newText) => {
    setText(newText);
    saveText(newText);
  };

  const saveText = async (newText) => {
    try {
      await AsyncStorage.setItem("@text_editor_content", newText);
    } catch (e) {
      console.error("Error saving text:", e);
    }
  };

  const loadText = async () => {
    try {
      const savedText = await AsyncStorage.getItem("@text_editor_content");
      if (savedText !== null) {
        setText(savedText);
      }
    } catch (e) {
      console.error("Error loading text:", e);
    }
  };

  // Load the saved text on component mount
  React.useEffect(() => {
    loadText();
  }, []);

  return (
    <View style={styles.container}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        {/* Font Size Buttons */}
        <TouchableOpacity onPress={() => setFontSize(16)}>
          <MaterialIcons
            name="text-format"
            size={24}
            color={fontSize === 16 ? "black" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFontSize(20)}>
          <MaterialIcons
            name="text-format"
            size={28}
            color={fontSize === 20 ? "black" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFontSize(24)}>
          <MaterialIcons
            name="text-format"
            size={32}
            color={fontSize === 24 ? "black" : "grey"}
          />
        </TouchableOpacity>

        {/* Font Weight (Bold) Button */}
        <TouchableOpacity
          onPress={() =>
            setFontWeight(fontWeight === "bold" ? "normal" : "bold")
          }
        >
          <MaterialIcons
            name="format-bold"
            size={24}
            color={fontWeight === "bold" ? "black" : "grey"}
          />
        </TouchableOpacity>

        {/* Underline Button */}
        <TouchableOpacity onPress={() => setUnderline(!underline)}>
          <MaterialIcons
            name="format-underlined"
            size={24}
            color={underline ? "black" : "grey"}
          />
        </TouchableOpacity>

        {/* Italic Button */}
        <TouchableOpacity onPress={() => setItalic(!italic)}>
          <MaterialIcons
            name="format-italic"
            size={24}
            color={italic ? "black" : "grey"}
          />
        </TouchableOpacity>

        {/* Alignment Buttons */}
        <TouchableOpacity onPress={() => setTextAlign("left")}>
          <MaterialIcons
            name="format-align-left"
            size={24}
            color={textAlign === "left" ? "black" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTextAlign("center")}>
          <MaterialIcons
            name="format-align-center"
            size={24}
            color={textAlign === "center" ? "black" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTextAlign("right")}>
          <MaterialIcons
            name="format-align-right"
            size={24}
            color={textAlign === "right" ? "black" : "grey"}
          />
        </TouchableOpacity>
      </View>

      {/* Text Input */}
      <TextInput
        style={[
          styles.textInput,
          {
            fontSize,
            fontWeight,
            textAlign,
            textDecorationLine: underline ? "underline" : "none",
            fontStyle: italic ? "italic" : "normal",
          },
        ]}
        multiline={true}
        value={text}
        onChangeText={onChangeText}
        placeholder="Start typing..."
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: "#000",
  },
});

export default TextEditor;
