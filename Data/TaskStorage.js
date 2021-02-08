import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "Tasks";

export const LoadTasks = async () => {
    try {
        let tasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (tasks == null) {
            tasks = [];
        }
        else {
            // TODO: Might need some post processing. It might be that JSON.parse can not 
            // convert string JSON object into an object correctly
            tasks = JSON.parse(tasks);
        }
        return tasks;
    }
    catch (error) {
        console.log("Error fetching tasks " + error);
        return [];
    }
}

// TODO: Should this be async or not
export const SaveTasks = (tasks) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}