import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useStore } from "../store/store";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import PaymentFooter from "../components/PaymentFooter";

const DetailsScreen = ({ navigation, route }: any) => {
	const ItemOfIndex = useStore((state: any) =>
		route.params.type === "Coffee" ? state.CoffeeList : state.BeanList
	)[route.params.index];

	const [price, setPrice] = useState(ItemOfIndex.prices[0]);

	const BackHandler = () => {
		navigation.pop();
	};
	const addToCart = useStore((state: any) => state.addToCart);
	const calculateCartPrice = useStore(
		(state: any) => state.calculateCartPrice
	);
	const addToFavorite = useStore((state: any) => state.addToFavoriteList);
	const deleteFromFavorite = useStore(
		(state: any) => state.deleteFromFavoriteList
	);

	const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
		favourite ? deleteFromFavorite(type, id) : addToFavorite(type, id);
	};

	const addToCarthandler = ({
		id,
		index,
		name,
		roasted,
		imagelink_square,
		special_ingredient,
		type,
		price,
	}: any) => {
		addToCart({
			id,
			index,
			name,
			roasted,
			imagelink_square,
			special_ingredient,
			type,
			prices: [{ ...price, quantity: 1 }],
		});
		calculateCartPrice();
		navigation.navigate("Cart");
	};

	return (
		<View style={styles.ScreenContainer}>
			<StatusBar
				animated={true}
				backgroundColor={COLORS.primaryBlackHex}
				style="light"
			/>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.ScrollStyle}
			>
				<ImageBackgroundInfo
					EnableBackHandler={true}
					imagelink_portrait={ItemOfIndex.imagelink_portrait}
					type={ItemOfIndex.type}
					id={ItemOfIndex.id}
					favourite={ItemOfIndex.favourite}
					name={ItemOfIndex.name}
					special_ingredient={ItemOfIndex.special_ingredient}
					ingredients={ItemOfIndex.ingredients}
					average_rating={ItemOfIndex.average_rating}
					ratings_count={ItemOfIndex.ratings_count}
					roasted={ItemOfIndex.roasted}
					BackHandler={BackHandler}
					ToggleFavourite={ToggleFavourite}
				/>

				<View style={styles.DecriptionContainer}>
					<Text style={styles.DescriptionTitle}>Description</Text>
					<Text style={styles.DescriptionInfo}>
						{ItemOfIndex?.description}
					</Text>

					<Text style={styles.SizeHeader}>Size</Text>
					<View style={styles.SizeOuterContainer}>
						{ItemOfIndex?.prices?.map((data: any, index: number) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.SizeContainer,
									{
										borderColor:
											data?.size === price?.size
												? COLORS.primaryOrangeHex
												: COLORS.primaryDarkGreyHex,
									},
								]}
								onPress={() => {
									setPrice(data);
								}}
							>
								<Text
									style={[
										styles.SizeText,
										{
											fontSize:
												ItemOfIndex.type == "bean"
													? FONTSIZE.size_14
													: FONTSIZE.size_16,
											color:
												data?.size === price?.size
													? COLORS.primaryOrangeHex
													: COLORS.primaryDarkGreyHex,
										},
									]}
								>
									{data?.size}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<PaymentFooter
					price={price}
					buttonTitle="Add to Cart"
					buttonPressHandler={() => {
						addToCarthandler({
							id: ItemOfIndex.id,
							index: ItemOfIndex.index,
							name: ItemOfIndex.name,
							roasted: ItemOfIndex.roasted,
							imagelink_square: ItemOfIndex.imagelink_square,
							special_ingredient: ItemOfIndex.special_ingredient,
							type: ItemOfIndex.type,
							price: price,
						});
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default DetailsScreen;

const styles = StyleSheet.create({
	ScreenContainer: {
		flex: 1,
		backgroundColor: COLORS.primaryBlackHex,
	},
	ScrollStyle: {
		flexGrow: 1,
	},
	DecriptionContainer: {
		padding: SPACING.space_20,
	},
	DescriptionTitle: {
		marginBottom: SPACING.space_10,
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_16,
		fontWeight: "700",
		lineHeight: FONTSIZE.size_24,
	},
	DescriptionInfo: {
		color: COLORS.primaryWhiteHex,
		lineHeight: FONTSIZE.size_18,
		fontSize: FONTSIZE.size_14,
		marginBottom: SPACING.space_10,
	},
	SizeHeader: {
		marginBottom: SPACING.space_10,
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_16,
		fontWeight: "700",
		lineHeight: FONTSIZE.size_24,
	},

	SizeOuterContainer: {
		flexDirection: "row",
		flex: 1,
		gap: SPACING.space_10,
	},
	SizeContainer: {
		borderWidth: 2,
		flex: 1,
		height: SPACING.space_24 * 2,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: BORDERRADIUS.radius_10,
		backgroundColor: COLORS.primaryBlackHex,
	},
	SizeText: {
		fontSize: FONTSIZE.size_12,
		fontWeight: "500",
		lineHeight: FONTSIZE.size_20,
	},
});
