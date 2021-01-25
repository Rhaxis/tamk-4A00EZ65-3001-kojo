import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Lesson1 = () => {
    return (
        <View style={styles.root}>
            <Text style={styles.headline} numberOfLines={1}>Otsikko</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>1</Text></View>
                    <View style={styles.cell}><Text>2</Text></View>
                    <View style={styles.cell}><Text>3</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>4</Text></View>
                    <View style={styles.cell}><Text>5</Text></View>
                    <View style={styles.cell}><Text>6</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>7</Text></View>
                    <View style={styles.cell}><Text>8</Text></View>
                    <View style={styles.cell}><Text>9</Text></View>
                </View>
            </View>
        </View>
    );
};

export default Lesson1;

const styles = StyleSheet.create({
    root: {
        flexDirection: "column", // Default layout direction
        alignItems: "center", // Cross-axis,
        justifyContent: "space-evenly",
        paddingTop: 10,
        backgroundColor: "yellow"
    },
    headline: {
        fontWeight: "bold",
        color: "black",
        backgroundColor: "green"
    },
    description: {
        fontWeight: "normal",
        textAlign: "justify",
        backgroundColor: "blue"
    },
    table: {
        width: "100%",
        backgroundColor: "red"
    },
    row: {
        flexDirection: "row"
    },
    cell: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        height: 100,
        flex: 1
    }
});