import React, { useLayoutEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";
import { Button, Input, Image, Text } from "react-native-elements";

const RegisterScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profilePic, setProfilePic] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: "Back",
		});
	}, [navigation]);

	const funcRegisterUser = () => {};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<StatusBar style="light" />
			{/* <Image
				source={{
					uri:
						"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
				}}
				style={styles.appLogo}
			/> */}
			<Text h4 style={{ marginBottom: 50 }}>
				Register here
			</Text>
			<View style={styles.inputContainer}>
				<Input
					placeholder="Full Name..."
					// autoFocus
					type="text"
					value={name}
					onChangeText={(text) => setName(text)}
				/>
				<Input
					placeholder="Email..."
					type="email"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password..."
					type="password"
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
				<Input
					placeholder="Profile Pic URL (optional)"
					type="text"
					value={profilePic}
					onChangeText={(text) => setProfilePic(text)}
					onSubmitEditing={funcRegisterUser} // submit form when user press enter
				/>
			</View>
			<Button
				containerStyle={styles.button}
				onPress={funcRegisterUser}
				raised
				title="Create Account"
			/>
			<View style={{ height: 70 }} />
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	appLogo: { width: 100, height: 100, marginBottom: 10 },
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "white",
	},
	inputContainer: {
		width: 350,
	},
	button: {
		width: 300,
		marginTop: 20,
		borderRadius: 5,
	},
});
