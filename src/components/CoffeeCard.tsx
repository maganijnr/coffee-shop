import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { FC } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
	name: string;
	id: string;
	index: number;
	type: string;
	roasted: string;
	imagelink_square: any;
	special_ingredient: string;
	average_rating: number;
	prices: any;
	buttomPressEnter: any;
}

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

const CoffeeCard: FC<IProps> = ({
	name,
	id,
	index,
	type,
	roasted,
	imagelink_square,
	special_ingredient,
	average_rating,
	prices,
	buttomPressEnter,
}) => {
	return (
		<LinearGradient
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.CardLinearContainer}
			colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
		>
			<ImageBackground source={imagelink_square} style={styles.CardImageBg}>
				<View style={styles.RatingContainer}>
					<AntDesign
						name="star"
						size={FONTSIZE.size_18}
						color={COLORS.primaryOrangeHex}
					/>
					<Text style={styles.RatingText}>{average_rating}</Text>
				</View>
			</ImageBackground>
			<Text style={styles.NameText}>{name}</Text>
			<Text style={styles.TypeText}>{type}</Text>
			<View style={styles.BottomContainer}>
				<Text style={styles.PriceTxt}>
					<Text style={styles.DollarTxt}>$</Text>
					{prices[0].price}
				</Text>
				<TouchableOpacity
					style={styles.AddToCartBtn}
					onPress={() => {
						buttomPressEnter({
							id,
							index,
							type,
							roasted,
							imagelink_square,
							name,
							special_ingredient,
							prices: [{ ...prices, quantity: 1 }],
						});
					}}
				>
					<AntDesign
						name="plus"
						size={FONTSIZE.size_18}
						color={COLORS.primaryWhiteHex}
					/>
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);
};

export default CoffeeCard;

const styles = StyleSheet.create({
	CardLinearContainer: {
		borderRadius: 23,
		padding: SPACING.space_12,
	},
	CardImageBg: {
		width: CARD_WIDTH,
		height: CARD_WIDTH,
		borderRadius: BORDERRADIUS.radius_20,
		marginBottom: SPACING.space_15,
		overflow: "hidden",
	},
	RatingContainer: {
		flexDirection: "row",
		position: "absolute",
		backgroundColor: COLORS.primaryBlackRGBA,
		alignItems: "center",
		justifyContent: "center",
		gap: SPACING.space_8,
		paddingHorizontal: SPACING.space_10,
		paddingVertical: SPACING.space_4,
		borderBottomLeftRadius: BORDERRADIUS.radius_20,
		borderTopRightRadius: BORDERRADIUS.radius_20,
		right: 0,
		top: 0,
	},
	RatingText: {
		color: COLORS.primaryWhiteHex,
		fontWeight: "500",
	},
	NameText: {
		fontWeight: "400",
		fontSize: FONTSIZE.size_14,
		lineHeight: FONTSIZE.size_20,
		color: COLORS.primaryWhiteHex,
	},
	TypeText: {
		lineHeight: FONTSIZE.size_20,
		fontWeight: "300",
		fontSize: FONTSIZE.size_10,
		color: COLORS.primaryWhiteHex,
	},
	BottomContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: SPACING.space_12,
	},
	PriceTxt: {
		fontWeight: "600",
		fontSize: FONTSIZE.size_16,
		color: COLORS.primaryWhiteHex,
	},
	DollarTxt: {
		color: COLORS.primaryOrangeHex,
		marginRight: 2,
	},
	AddToCartBtn: {
		backgroundColor: COLORS.primaryOrangeHex,
		height: 28.44,
		width: 28.44,
		borderRadius: BORDERRADIUS.radius_10,
		alignItems: "center",
		justifyContent: "center",
	},
});
