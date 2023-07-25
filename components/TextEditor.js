import React, { useRef } from "react";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);

const MyEditor = () => {
  const richText = useRef(); // Ref để tham chiếu đến RichEditor

  const initialContentHTML = "<p>Initial Content</p>"; // Nội dung HTML ban đầu của trình soạn thảo

  const filterHtmlTags = (html) => { // Hàm lọc thẻ HTML ra khỏi nội dung văn bản
    const regex = /(<([^>]+)>)/gi;
    return html.replace(regex, "");
  };

  const handleChangeText = (descriptionText) => { // Hàm xử lý khi nội dung trình soạn thảo thay đổi
    console.log("Text:", filterHtmlTags(descriptionText)); // In nội dung đã lọc (không có thẻ HTML) ra console
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              paddingTop: 30,
              textAlign: "center",
            }}
          >
            TextEditor:
          </Text>
          <RichEditor
            ref={richText} // Sử dụng ref để tham chiếu đến RichEditor
            initialContentHTML={initialContentHTML} // Nội dung HTML ban đầu của trình soạn thảo
            onChange={handleChangeText} // Gọi hàm handleChangeText khi nội dung trình soạn thảo thay đổi
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0 }}>
        <RichToolbar
          editor={richText} // Truyền ref của RichEditor vào RichToolbar để liên kết chức năng
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.keyboard,
            actions.setStrikethrough,
            actions.removeFormat,
            actions.checkboxList,
            actions.undo,
            actions.redo,
          ]} // Các chức năng của RichToolbar
          iconMap={{ [actions.heading1]: handleHead }} // Định nghĩa biểu tượng tùy chỉnh cho chức năng "heading1" 
        />
      </View>
    </SafeAreaView>
  );
};

export default MyEditor;
