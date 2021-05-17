import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../utils/firebase";

const AddChatScreen = ({ navigation }) => {
	const [chatName, setChatName] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Add a New Chat",
			headerBackTitle: "Chats",
		});
	}, [navigation]);

	const funcCreateChat = async () => {
		await db
			.collection("chats")
			.add({
				chatName: chatName,
			})
			.then(() => {
				navigation.goBack();
			})
			.catch((err) => alert(err));
		alert("Eagle FLight");
	};

	return (
		<SafeAreaView style={styles.container}>
			<Input
				placeholder="Enter chat name"
				value={chatName}
				onChangeText={(text) => setChatName(text)}
				style={{ outline: "none", paddingLeft: 15 }}
				leftIcon={
					<Icon name="wechat" type="antesign" size={18} color="#8a8a8a" />
				}
				onSubmitEditing={funcCreateChat}
			/>
			<Button title="Create New Chat" onPress={funcCreateChat} />
			<Text>New chats yels</Text>
		</SafeAreaView>
	);
};

export default AddChatScreen;

const styles = StyleSheet.create({
	container: {},
});
