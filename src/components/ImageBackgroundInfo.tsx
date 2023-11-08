import {
	StyleSheet,
	ImageBackground,
	View,
	ImageProps,
	TouchableOpacity,
	Text,
} from "react-native";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";

interface ImageBackgroundInfoProps {
	EnableBackHandler: boolean;
	imagelink_portrait: ImageProps;
	type: string;
	id: string;
	favourite: boolean;
	name: string;
	special_ingredient: string;
	ingredients: string;
	average_rating: number;
	ratings_count: string;
	roasted: string;
	BackHandler?: any;
	ToggleFavourite: any;
}

const ImageBackgroundInfo: FC<ImageBackgroundInfoProps> = ({
	EnableBackHandler,
	imagelink_portrait,
	type,
	id,
	favourite,
	name,
	special_ingredient,
	ingredients,
	average_rating,
	ratings_count,
	roasted,
	BackHandler,
	ToggleFavourite,
}) => {
	return (
		<View>
			<ImageBackground
				source={imagelink_portrait}
				style={styles.ItemBackgroundImage}
			>
				{EnableBackHandler ? (
					<View style={styles.BackHandlerStyles}>
						<LinearGradient
							colors={[
								COLORS.primaryLightGreyHex,
								COLORS.primaryBlackHex,
							]}
							style={styles.BackButton}
						>
							<TouchableOpacity
								onPress={() => {
									BackHandler();
								}}
							>
								<MaterialIcons
									name="keyboard-arrow-left"
									size={24}
									color="#FFF"
								/>
							</TouchableOpacity>
						</LinearGradient>

						<LinearGradient
							colors={[
								COLORS.primaryLightGreyHex,
								COLORS.primaryBlackHex,
							]}
							style={styles.BackButton}
						>
							<TouchableOpacity
								onPress={() => {
									ToggleFavourite(favourite, type, id);
								}}
							>
								<Ionicons
									name="heart-sharp"
									size={20}
									color={
										favourite
											? COLORS.primaryRedHex
											: COLORS.secondaryLightGreyHex
									}
								/>
							</TouchableOpacity>
						</LinearGradient>
					</View>
				) : (
					<></>
				)}

				<View style={styles.ImageOuterInfoContainer}>
					<View style={styles.ImageInnerInfoContainer}>
						<View style={styles.InfoContainerRow}>
							<View>
								<Text style={styles.ItemTitle}>{name}</Text>
								<Text style={styles.ItemSubtitle}>
									{special_ingredient}
								</Text>
							</View>
							<View style={styles.ItemPropertiesContainer}>
								<View style={styles.PropertyStyle}>
									<MaterialCommunityIcons
										name={type === "Bean" ? "coffee-maker" : "coffee"}
										size={22}
										color={COLORS.primaryOrangeHex}
									/>
									<Text style={styles.PropertyName}>{type}</Text>
								</View>
								<View style={styles.PropertyStyle}>
									<Ionicons
										name="location-sharp"
										size={22}
										color={COLORS.primaryOrangeHex}
									/>
									<Text style={styles.PropertyName}>Africa</Text>
								</View>
							</View>
						</View>
						<View style={[styles.InfoContainerRow, { marginTop: 10 }]}>
							<View style={styles.RatingWrapper}>
								<AntDesign
									name="star"
									size={24}
									color={COLORS.primaryOrangeHex}
								/>
								<Text style={styles.RatingText}>
									{average_rating}{" "}
									<Text style={styles.RatingCountText}>
										({ratings_count})
									</Text>
								</Text>
							</View>
							<View style={styles.RoastedView}>
								<Text style={styles.RoastedText}>{roasted}</Text>
							</View>
						</View>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
	ItemBackgroundImage: {
		width: "100%",
		aspectRatio: 20 / 25,
		justifyContent: "space-between",
	},
	BackHandlerStyles: {
		width: "100%",
		marginTop: 60,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: SPACING.space_30,
	},
	BackButton: {
		width: 33.43,
		height: 33.43,
		borderRadius: BORDERRADIUS.radius_10,
		alignItems: "center",
		justifyContent: "center",
	},
	ImageOuterInfoContainer: {},
	ImageInnerInfoContainer: {
		backgroundColor: COLORS.primaryBlackRGBA,
		width: "100%",
		borderTopRightRadius: BORDERRADIUS.radius_25,
		borderTopLeftRadius: BORDERRADIUS.radius_25,
		padding: SPACING.space_30,
	},
	InfoContainerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	ItemTitle: {
		fontWeight: "600",
		fontSize: FONTSIZE.size_20,
		lineHeight: FONTSIZE.size_20,
		color: COLORS.primaryWhiteHex,
	},
	ItemSubtitle: {
		fontSize: FONTSIZE.size_12,
		color: COLORS.secondaryLightGreyHex,
		marginTop: 5,
	},
	ItemPropertiesContainer: {
		flexDirection: "row",
		gap: SPACING.space_8,
	},
	PropertyStyle: {
		width: 55.71,
		height: 55.71,
		borderRadius: BORDERRADIUS.radius_10,
		backgroundColor: COLORS.primaryBlackHex,
		alignItems: "center",
		justifyContent: "center",
	},
	PropertyName: {
		fontSize: FONTSIZE.size_10,
		color: COLORS.secondaryLightGreyHex,
		fontWeight: "500",
	},
	RatingWrapper: {
		flexDirection: "row",
	},
	RatingText: {
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_16,
		fontWeight: "600",
		marginLeft: SPACING.space_8,
	},
	RatingCountText: {
		color: COLORS.secondaryLightGreyHex,
		fontSize: FONTSIZE.size_12,
	},
	RoastedView: {
		backgroundColor: COLORS.primaryBlackHex,
		paddingHorizontal: SPACING.space_20,
		paddingVertical: SPACING.space_16,
		borderRadius: BORDERRADIUS.radius_10,
	},
	RoastedText: {
		color: COLORS.secondaryLightGreyHex,
		fontSize: FONTSIZE.size_12,
		lineHeight: FONTSIZE.size_20,
	},
});
