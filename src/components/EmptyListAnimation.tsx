import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTSIZE } from "../theme/theme";

interface IProps {
	title: string;
}

const EmptyListAnimation: React.FC<IProps> = ({ title }) => {
	const video = React.useRef(null);
	const [status, setStatus] = React.useState({});

	return (
		<View style={styles.EmptyStateView}>
			<LottieView
				source={require("../lottie/coffeecup.json")}
				style={styles.LottieStyleView}
				autoPlay
				loop
			/>
			<Text style={styles.LottieText}>{title}</Text>
		</View>
	);
};

export default EmptyListAnimation;

const styles = StyleSheet.create({
	EmptyStateView: {
		flex: 1,
		// justifyContent: "center",
		alignItems: "center",
	},

	LottieStyleView: {
		height: 400,
		width: 400,
	},

	LottieText: {
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_16,
		fontWeight: "600",
	},
});
