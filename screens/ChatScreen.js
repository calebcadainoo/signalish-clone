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

const ChatScreen = ({ navigation, route }) => {
	const [input, setInput] = useState("");

	const funcSendMsg = () => {
		Keyboard.dismiss();
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
							uri: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
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
	});

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar style="light" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
				keyboardVerticalOffset={90}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
					<>
						<ScrollView>
							{/* chats here */}
							<Text>{route.params.chatName}</Text>
						</ScrollView>

						<View style={styles.footer}>
							{/* footer with msg box */}
							<TextInput
								onChangeText={(text) => setInput(text)}
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
