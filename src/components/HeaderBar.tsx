import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import GradientBgIcon from "./GradientBgIcon";
import ProfilePic from "./ProfilePic";

interface HeaderBarProps {
	title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
	return (
		<View style={styles.HeaderContainer}>
			<GradientBgIcon name="view-dashboard" size={20} color="#fff" />
			<Text style={styles.headerTitle}>{title}</Text>
			<ProfilePic />
		</View>
	);
};

export default HeaderBar;

const styles = StyleSheet.create({
	HeaderContainer: {
		marginTop: 60,
		paddingHorizontal: SPACING.space_30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	headerTitle: {
		color: "#fff",
		// fontFamily: FONTFAMILY.poppins_bold,
		fontSize: FONTSIZE.size_20,
	},
});
