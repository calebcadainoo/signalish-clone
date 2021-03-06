import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../utils/firebase";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			console.log("authUser: ", authUser);
			if (authUser) {
				navigation.replace("Home");
			} else {
			}
		});

		return unsubscribe;
	}, []);

	// sign in
	const funcSignIn = () => {
		auth.signInWithEmailAndPassword(email, password).catch((err) => alert(err));
	};

	// register screen
	const funcNavToRegister = () => {
		navigation.navigate("Register");
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<StatusBar style="light" />
			<Image
				source={{
					uri:
						"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
				}}
				style={styles.appLogo}
			/>
			<View style={styles.inputContainer}>
				<Input
					placeholder="Email..."
					autoFocus
					type="email"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password..."
					secureTextEntry
					type="password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					onSubmitEditing={funcSignIn}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				onPress={funcSignIn}
				title="Login"
			/>
			<Button
				containerStyle={styles.button}
				type="outline"
				onPress={funcNavToRegister}
				title="Create Account"
			/>
			<View style={{ height: 10 }} />
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	appLogo: { width: 100, height: 100 },
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
