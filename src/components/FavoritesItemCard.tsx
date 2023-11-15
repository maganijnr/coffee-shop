import { StyleSheet, Text, View, ImageProps } from "react-native";
import React from "react";
import {
	BORDERRADIUS,
	COLORS,
	FONTFAMILY,
	FONTSIZE,
	SPACING,
} from "../theme/theme";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import { LinearGradient } from "expo-linear-gradient";

interface CardProps {
	id: string;
	imagelink_portrait: ImageProps;
	name: string;
	special_ingredient: string;
	type: string;
	ingredients: string;
	average_rating: number;
	ratings_count: string;
	roasted: string;
	description: string;
	favourite: boolean;
	ToggleFavouriteItem: any;
}

const FavoritesItemCard: React.FC<CardProps> = ({
	id,
	imagelink_portrait,
	name,
	special_ingredient,
	type,
	ingredients,
	average_rating,
	ratings_count,
	roasted,
	description,
	favourite,
	ToggleFavouriteItem,
}) => {
	return (
		<View style={styles.CardContainer}>
			<ImageBackgroundInfo
				EnableBackHandler={false}
				imagelink_portrait={imagelink_portrait}
				type={type}
				id={id}
				favourite={favourite}
				name={name}
				special_ingredient={special_ingredient}
				ingredients={ingredients}
				average_rating={average_rating}
				ratings_count={ratings_count}
				roasted={roasted}
				ToggleFavourite={ToggleFavouriteItem}
			/>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
				style={styles.ContainerLinearGradient}
			>
				<Text style={styles.DescriptionTitle}>Description</Text>
				<Text style={styles.DescriptionText}>{description}</Text>
			</LinearGradient>
		</View>
	);
};

export default FavoritesItemCard;

const styles = StyleSheet.create({
	CardContainer: {
		borderRadius: BORDERRADIUS.radius_25,
		overflow: "hidden",
	},
	ContainerLinearGradient: {
		gap: SPACING.space_10,
		padding: SPACING.space_20,
	},
	DescriptionTitle: {
		fontSize: FONTSIZE.size_16,
		color: COLORS.secondaryLightGreyHex,
	},
	DescriptionText: {
		fontSize: FONTSIZE.size_14,
		color: COLORS.primaryWhiteHex,
	},
});
