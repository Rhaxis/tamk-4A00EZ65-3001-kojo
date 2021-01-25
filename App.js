import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import Constants from "expo-constants";
import uuid from "uuid";

// Importataan omat moduulit järjestelmämoduulien jälkeen
import InputText from "./Components/InputText";
import ItemList from "./Components/ItemList";

export default function App() {
  // Tallennetaan käyttäjän syöttämä teksti siten, että se ei häviä uudelleen piirron
  // yhteydesä

  const [tasks, setTasks] = useState([]);

  const [userInput, setUserInput] = useState("");

  const addTextHandler = (text) => {
    setUserInput(userInput + " " + text);
  };

  // ... spread operator. Pulls items out of an array. In our case it is used to create a
  // new array
  const addTaskHandler = (task) => {
    setTasks([...tasks, {key: uuid.v4(), text: task}]);
  }

  // Luodaan uusi taulukko johon laitetaan kaikki task taulukon sisältö paitsi se joka vastaa key arvoa
   const removeTaskHandler = (key) => {
    setTasks(tasks.filter((task) => task.key !== key));
  };

  return (
    <View style={stylesLight.root}>
      <View style={stylesLight.statusBar}>
        <StatusBar style="auto" />
      </View>

      <InputText submitText="OK" onSubmitPressed={addTaskHandler} />
      <ItemList data={tasks} onItemPress={removeTaskHandler} />
    </View>
  );
}

const stylesLight = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
    height: "100%",
    paddingTop: Constants.statusBarHeight
  },
  statusBar: {
    // height: Constants.statusBarHeight
  },
  text: {
    width: 100,
    color: "black"
  }
});

const stylesDark = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "black",
    height: "100%",
  },
  text: {
    width: 100,
    color: "#FFF"
  }
});