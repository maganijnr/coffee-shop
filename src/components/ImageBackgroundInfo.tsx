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
					<View style={styles.ImageHeaderBarContainerWithBack}>
						<LinearGradient
							colors={[
								COLORS.primaryLightGreyHex,
								COLORS.primaryBlackHex,
							]}
							style={{
								height: 33.43,
								width: 33.43,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: BORDERRADIUS.radius_10,
							}}
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
							style={{
								height: 33.43,
								width: 33.43,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: BORDERRADIUS.radius_10,
							}}
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
					<View style={styles.ImageHeaderBarContainerWithoutBack}>
						<LinearGradient
							colors={[
								COLORS.primaryLightGreyHex,
								COLORS.primaryBlackHex,
							]}
							style={{
								height: 33.43,
								width: 33.43,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: BORDERRADIUS.radius_10,
							}}
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
				)}

				<View style={styles.ImageInfoOuterContainer}>
					<View style={styles.ImageInfoInnerContainer}>
						<View style={styles.InfoContainerRow}>
							<View>
								<Text style={styles.ItemTitleText}>{name}</Text>
								<Text style={styles.ItemSubtitleText}>
									{special_ingredient}
								</Text>
							</View>
							<View style={styles.ItemPropertiesContainer}>
								<View style={styles.ProperFirst}>
									<MaterialCommunityIcons
										name={type === "Bean" ? "coffee-maker" : "coffee"}
										size={22}
										color={COLORS.primaryOrangeHex}
									/>
									<Text
										style={[
											styles.PropertyTextFirst,
											{
												marginTop:
													type == "Bean"
														? SPACING.space_4 + SPACING.space_2
														: 0,
											},
										]}
									>
										{type}
									</Text>
								</View>
								<View style={styles.ProperFirst}>
									<MaterialCommunityIcons
										name={type === "Bean" ? "coffee-maker" : "coffee"}
										size={22}
										color={COLORS.primaryOrangeHex}
									/>
									<Text style={styles.PropertyTextLast}>
										{ingredients}
									</Text>
								</View>
							</View>
						</View>
						<View style={styles.InfoContainerRow}>
							<View style={styles.RatingContainer}>
								<AntDesign
									name="star"
									size={24}
									color={COLORS.primaryOrangeHex}
								/>
								<Text style={styles.RatingText}>{average_rating}</Text>
								<Text style={styles.RatingCountText}>
									({ratings_count})
								</Text>
							</View>
							<View style={styles.RoastedContainer}>
								<Text style={styles.RoastedText}>{roasted}</Text>
							</View>
						</View>
					</View>
				</View>
			</ImageBackground>
		</View>
		// <View>
		// 	<ImageBackground
		// 		source={imagelink_portrait}
		// 		style={styles.ItemBackgroundImage}
		// 	>
		// 		{EnableBackHandler ? (
		// 			<View style={styles.BackHandlerStyles}>
		// <LinearGradient
		// 	colors={[
		// 		COLORS.primaryLightGreyHex,
		// 		COLORS.primaryBlackHex,
		// 	]}
		// 	style={styles.BackButton}
		// >
		// 					<TouchableOpacity
		// 						onPress={() => {
		// 							BackHandler();
		// 						}}
		// 					>
		// <MaterialIcons
		// 	name="keyboard-arrow-left"
		// 	size={24}
		// 	color="#FFF"
		// />
		// 					</TouchableOpacity>
		// 				</LinearGradient>

		// 				<LinearGradient
		// 					colors={[
		// 						COLORS.primaryLightGreyHex,
		// 						COLORS.primaryBlackHex,
		// 					]}
		// 					style={styles.BackButton}
		// 				>
		// 					<TouchableOpacity
		// 						onPress={() => {
		// 							ToggleFavourite(favourite, type, id);
		// 						}}
		// 					>
		// <Ionicons
		// 	name="heart-sharp"
		// 	size={20}
		// 	color={
		// 		favourite
		// 			? COLORS.primaryRedHex
		// 			: COLORS.secondaryLightGreyHex
		// 	}
		// />
		// 					</TouchableOpacity>
		// 				</LinearGradient>
		// 			</View>
		// 		) : (
		// 			<></>
		// 		)}

		// 		<View style={styles.ImageOuterInfoContainer}>
		// 			<View style={styles.ImageInnerInfoContainer}>
		// 				<View style={styles.InfoContainerRow}>
		// 					<View>
		// 						<Text style={styles.ItemTitle}>{name}</Text>
		// 						<Text style={styles.ItemSubtitle}>
		// 							{special_ingredient}
		// 						</Text>
		// 					</View>
		// 					<View style={styles.ItemPropertiesContainer}>
		// 						<View style={styles.PropertyStyle}>
		// <MaterialCommunityIcons
		// 	name={type === "Bean" ? "coffee-maker" : "coffee"}
		// 	size={22}
		// 	color={COLORS.primaryOrangeHex}
		// />
		// 							<Text style={styles.PropertyName}>{type}</Text>
		// 						</View>
		// 						<View style={styles.PropertyStyle}>
		// 							<Ionicons
		// 								name="location-sharp"
		// 								size={22}
		// 								color={COLORS.primaryOrangeHex}
		// 							/>
		// 							<Text style={styles.PropertyName}>Africa</Text>
		// 						</View>
		// 					</View>
		// 				</View>
		// 				<View style={[styles.InfoContainerRow, { marginTop: 10 }]}>
		// 					<View style={styles.RatingWrapper}>
		// <AntDesign
		// 	name="star"
		// 	size={24}
		// 	color={COLORS.primaryOrangeHex}
		// />
		// 						<Text style={styles.RatingText}>
		// 							{average_rating}{" "}
		// 							<Text style={styles.RatingCountText}>
		// 								({ratings_count})
		// 							</Text>
		// 						</Text>
		// 					</View>
		// 					<View style={styles.RoastedView}>
		// 						<Text style={styles.RoastedText}>{roasted}</Text>
		// 					</View>
		// 				</View>
		// 			</View>
		// 		</View>
		// 	</ImageBackground>
		// </View>
	);
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
	ItemBackgroundImage: {
		width: "100%",
		aspectRatio: 20 / 25,
		justifyContent: "space-between",
	},
	ImageHeaderBarContainerWithBack: {
		padding: SPACING.space_30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	ImageHeaderBarContainerWithoutBack: {
		padding: SPACING.space_30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	ImageInfoOuterContainer: {
		paddingVertical: SPACING.space_24,
		paddingHorizontal: SPACING.space_30,
		backgroundColor: COLORS.primaryBlackRGBA,
		borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
		borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
	},
	ImageInfoInnerContainer: {
		justifyContent: "space-between",
		gap: SPACING.space_15,
	},
	InfoContainerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	ItemTitleText: {
		fontSize: FONTSIZE.size_24,
		color: COLORS.primaryWhiteHex,
	},
	ItemSubtitleText: {
		fontSize: FONTSIZE.size_12,
		color: COLORS.primaryWhiteHex,
	},
	ItemPropertiesContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.space_20,
	},
	ProperFirst: {
		height: 55,
		width: 55,
		borderRadius: BORDERRADIUS.radius_15,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.primaryBlackHex,
	},
	PropertyTextFirst: {
		fontSize: FONTSIZE.size_10,
		color: COLORS.primaryWhiteHex,
	},
	PropertyTextLast: {
		fontSize: FONTSIZE.size_10,
		color: COLORS.primaryWhiteHex,
		marginTop: SPACING.space_2 + SPACING.space_4,
	},
	RatingContainer: {
		flexDirection: "row",
		gap: SPACING.space_10,
		alignItems: "center",
	},
	RatingText: {
		fontSize: FONTSIZE.size_18,
		color: COLORS.primaryWhiteHex,
	},
	RatingCountText: {
		fontSize: FONTSIZE.size_12,
		color: COLORS.primaryWhiteHex,
	},
	RoastedContainer: {
		height: 55,
		width: 55 * 2 + SPACING.space_20,
		borderRadius: BORDERRADIUS.radius_15,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.primaryBlackHex,
	},
	RoastedText: {
		fontSize: FONTSIZE.size_10,
		color: COLORS.primaryWhiteHex,
	},
});
