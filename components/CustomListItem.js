import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = () => {
	return (
		<ListItem>
			<Avatar
				rounded
				source={{
					uri:
						"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
				}}
			/>
			<Text>Custom List elements</Text>
		</ListItem>
	);
};

export default CustomListItem;

const styles = StyleSheet.create({});
