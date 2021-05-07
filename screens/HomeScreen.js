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
import { auth, db } from "../utils/firebase";

const HomeScreen = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Signal Clone",
			headerStyle: { backgroundColor: "#fa0" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
			headerLeft: () => {
				<View style={{ marginLeft: 20 }}>
					<TouchableOpacity activeOpacity={0.5}>
						<Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
					</TouchableOpacity>
				</View>;
			},
		});
	}, []);

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
