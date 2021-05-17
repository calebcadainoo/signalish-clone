import React, { useLayoutEffect, useState, useEffect } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { auth, db } from "../utils/firebase";

const HomeScreen = ({ navigation }) => {
	const [chats, setChats] = useState([]);

	const funcLogoutUser = () => {
		alert("YOU ARE BEING LOGGED OUT");
		auth.signOut().then(() => {
			navigation.replace("Login");
		});
	};

	useEffect(() => {
		const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
			setChats(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
		});
		return unsubscribe;
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Signal Clone",
			// headerStyle: { backgroundColor: "#fa0" },
			// headerTitleStyle: { color: "black" },
			// headerTintColor: "black",
			headerLeft: () => {
				return (
					<View style={{ marginLeft: 15 }}>
						<TouchableOpacity activeOpacity={0.5} onPress={funcLogoutUser}>
							<Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
						</TouchableOpacity>
					</View>
				);
			},
			headerRight: () => {
				return (
					<View
						style={{
							marginRight: 17,
							flexDirection: "row",
							justifyContent: "space-between",
							width: 60,
						}}
					>
						<TouchableOpacity activeOpacity={0.5}>
							<AntDesign name="camerao" size={24} color="#fff" />
						</TouchableOpacity>

						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {
								navigation.navigate("AddChat");
							}}
						>
							<SimpleLineIcons name="pencil" size={20} color="#fff" />
						</TouchableOpacity>
					</View>
				);
			},
		});
	}, [navigation]);

	const funcEnterChat = (id, chatName) => {
		navigation.navigate("Chat", {
			id,
			chatName,
		});
	};

	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				{chats.map(({ id, data: { chatName } }) => (
					<CustomListItem
						key={id}
						id={id}
						chatName={chatName}
						funcEnterChat={funcEnterChat}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
