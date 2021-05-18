import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { Platform } from "react-native";
import { Keyboard } from "react-native";
import * as firebase from "firebase";
import { auth, db } from "../utils/firebase";

const ChatScreen = ({ navigation, route }) => {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	const funcSendMsg = () => {
		Keyboard.dismiss();

		db.collection("chats").doc(route.params.id).collection("messages").add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photoURL: auth.currentUser.photoURL,
		});

		setInput("");
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Chat",
			headerBackTitleVisible: false,
			headerTitleAlign: "left",
			headerTitle: () => (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Avatar
						rounded
						source={{
							uri:
								messages[0]?.data.photoURL ||
								"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
						}}
					/>
					<Text style={{ color: "white", marginLeft: 10, fontWeight: "600" }}>
						{route.params.chatName}
					</Text>
				</View>
			),
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginLeft: 20 }}
					onPress={navigation.goBack}
				>
					<AntDesign name="arrowleft" size={20} color="white" />
				</TouchableOpacity>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: 80,
						marginRight: 20,
					}}
				>
					<TouchableOpacity onPress={navigation.goBack}>
						<FontAwesome name="video-camera" size={20} color="white" />
					</TouchableOpacity>
					<TouchableOpacity onPress={navigation.goBack}>
						<Ionicons name="call" size={20} color="white" />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation, messages]);

	useLayoutEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(route.params.id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);

		return unsubscribe;
	}, [route]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar style="light" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
				keyboardVerticalOffset={90}
			>
				<TouchableWithoutFeedback>
					<>
						<ScrollView contentContainerStyle={{ paddingTop: 10 }}>
							{/* chats here */}
							{messages.map(({ id, data }) =>
								data.email === auth.currentUser.email ? (
									<View key={id} style={styles.receiver}>
										<Avatar
											rounded
											position="absolute"
											right={-5}
											bottom={-5}
											// WEB Hack
											containerStyle={{
												position: "absolute",
												right: -5,
												bottom: -5,
											}}
											size={20}
											source={{
												uri: data.photoURL,
											}}
										/>
										<Text style={styles.receiverText}>{data.message}</Text>
									</View>
								) : (
									<View key={id} style={styles.sender}>
										<Avatar
											rounded
											position="absolute"
											left={-5}
											bottom={-5}
											// WEB Hack
											containerStyle={{
												position: "absolute",
												left: -5,
												bottom: -5,
											}}
											size={20}
											source={{
												uri: data.photoURL,
											}}
										/>
										<Text style={styles.senderText}>{data.message}</Text>
										<Text style={styles.senderName}>{data.displayName}</Text>
									</View>
								)
							)}
						</ScrollView>

						<View style={styles.footer}>
							{/* footer with msg box */}
							<TextInput
								onChangeText={(text) => setInput(text)}
								onSubmitEditing={funcSendMsg}
								value={input}
								style={styles.textInput}
								placeholder="Type a message..."
							/>
							<TouchableOpacity onPress={funcSendMsg} activeOpacity={0.5}>
								<Ionicons name="send" size={24} color="#2B68E6" />
							</TouchableOpacity>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	receiver: {
		padding: 15,
		backgroundColor: "#ECECEC",
		alignSelf: "flex-end",
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: "80%",
		position: "relative",
	},
	receiverText: {
		color: "black",
		fontWeight: "500",
		marginLeft: 10,
		// marginBottom: 15,
	},
	sender: {
		padding: 15,
		backgroundColor: "#2B68E6",
		alignSelf: "flex-start",
		borderRadius: 20,
		marginLeft: 15,
		marginBottom: 20,
		maxWidth: "80%",
		position: "relative",
	},
	senderText: {
		color: "white",
		fontWeight: "500",
		marginLeft: 10,
		marginBottom: 5,
	},
	senderName: {
		left: 10,
		paddingRight: 10,
		fontSize: 10,
		color: "white",
		opacity: 0.7,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 15,
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		backgroundColor: "#ECECEC",
		padding: 10,
		color: "grey",
		borderRadius: 30,
	},
});
