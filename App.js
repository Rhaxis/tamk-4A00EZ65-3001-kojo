import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Constants from "expo-constants";
import uuid from "uuid";

// Importataan omat moduulit järjestelmämoduulien jälkeen
import ItemList from "./Components/ItemList";
import EditTask from "./Components/EditTask";

import { SaveTasks, LoadTasks } from "./Data/TaskStorage";

import {Priority} from "./Data/Enums";

export default function App() {
  // Tallennetaan käyttäjän syöttämä teksti siten, että se ei häviä uudelleen piirron
  // yhteydesä

  const [tasks, setTasks] = useState([]);

  // Oletuksena EditTask-näkymä ei ole aktiivinen
  const [isEditViewVisible, setEditViewVisibility] = useState(false);

  // Viittaus valittuun taskiin. Jos undefined, mitään ei ole valittu
  const [selectedTask, setSelectedTask] = useState(undefined);

  const loadData = async () => {
    console.log("Loading Tasks");
    let tasks = await LoadTasks();
    console.log("Tasks loaded");

    setTasks(tasks);
  };

  // Executed only once when app starts
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log("Saving tasks")
    SaveTasks(tasks);
  }, [tasks]);

  // ... spread operator. Pulls items out of an array. In our case it is used to create a
  // new array
  const addTaskHandler = (task) => {
    if (selectedTask !== undefined) {
      selectedTask.text = task;

      // This has to be done because the tasks list itself doensn't change and thus useEffect is not triggered.
      SaveTasks(tasks); 
    }
    else {
      setTasks([...tasks, {
          // missing date variable for task deadline
          key: uuid.v4(),
          title: "title",
          text: task,
          location: {
            latitude: 55.55,
            longitude: 66.66,
          },
          picPath: "path abc",
          priority: Priority.medium,
        }]);
    }

    // Taskin lisäämisen jälkeen suljetaan Edit-näkymä
    ShowEditView(false);
  }

  const onRemove = (key) => {
    setTasks(tasks.filter((item) => item.key !== key));
  };

  const onItemPressed = (key) => {
    let currentTask = tasks.find(task => task.key == key);
    setSelectedTask(currentTask);
    ShowEditView(true);
  }

  const ShowEditView = (isShown) => {
    // Tyhjentää valitun taskin sulkemisen yhteydessä
    if (!isShown) {
      setSelectedTask(undefined);
    }

    setEditViewVisibility(isShown);
  };

  return (
    // Vain yksi juuriobjekti sallittu!
    // View-elementtiä kannattaa ajatella div-elementtinä html:ssä
    // Tyyli määritellään JavaScript-olion sisälle
    <View style={stylesLight.root}>
      {/* <Lesson1 /> */}
      { /* Kommentti toimii oikein aaltosulkeiden sisällä */}
      {/* <Text style={stylesLight.text}>First view</Text>
      <Text style={stylesLight.text}>Second text</Text>
      <Text style={stylesLight.text}>Third View</Text> */}
      <View style={stylesLight.statusBar}>
        <StatusBar style="auto" />
      </View>

      <ItemList data={tasks} onPress={onItemPressed} onLongPress={onRemove} />
      <EditTask
        onSubmitPressed={addTaskHandler}
        isVisible={isEditViewVisible}
        closeView={() => ShowEditView(false)}
        text={selectedTask !== undefined ? selectedTask.text : undefined}
      />
      <Button title="Add task" onPress={() => ShowEditView(true)} />

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