import { StyleSheet, Text, View } from "react-native";
import React, { FC, ReactNode } from "react";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, SPACING } from "../theme/theme";
import CustomIcon from "./CustomIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IProps {
	name?: string;
	size?: number;
	color?: string;
	children?: ReactNode;
}

const GradientBgIcon: FC<IProps> = ({ name, color, size }) => {
	return (
		<View style={styles.container}>
			{/*@ts-ignore*/}
			<MaterialCommunityIcons name={name} size={size} color={color} />
		</View>
	);
};

export default GradientBgIcon;

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: COLORS.secondaryDarkGreyHex,
		borderRadius: SPACING.space_12,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.secondaryDarkGreyHex,
		height: SPACING.space_36,
		width: SPACING.space_36,
	},
	LinearGradientBG: {},
});
