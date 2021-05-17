import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({ id, chatName, funcEnterChat }) => {
	return (
		<ListItem onPress={() => funcEnterChat(id, chatName)} key={id} bottomDivider >
			<Avatar
				rounded
				source={{
					uri:
						"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title
					style={{ fontWeight: "600" }}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{chatName}
				</ListItem.Title>

				<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
					Hello y'all
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItem;

const styles = StyleSheet.create({});
