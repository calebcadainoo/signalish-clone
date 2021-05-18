import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { auth, db } from "../utils/firebase";

const CustomListItem = ({ id, chatName, funcEnterChat }) => {
	const [chatMsgs, setChatMsgs] = useState([]);

	useEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setChatMsgs(snapshot.docs.map((doc) => doc.data()))
			);

		return unsubscribe;
	});

	return (
		<ListItem
			onPress={() => funcEnterChat(id, chatName)}
			key={id}
			bottomDivider
		>
			<Avatar
				rounded
				source={{
					uri:
						chatMsgs?.[0]?.photoURL ||
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
					{chatMsgs?.[0]?.message || "Hello y'all"}
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItem;

const styles = StyleSheet.create({});
