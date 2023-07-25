import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import MyEditor from "./components/TextEditor";

const Stack = createStackNavigator();

const App = () => {
  return <MyEditor />;
};

export default App;
