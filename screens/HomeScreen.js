import React, { useLayoutEffect } from "react";
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
	const funcLogoutUser = () => {
		alert("YOU ARE BEING LOGGED OUT");
		auth.signOut().then(() => {
			navigation.replace("Login");
		});
	};

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

	return (
		<SafeAreaView>
			<ScrollView>
				<CustomListItem />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
