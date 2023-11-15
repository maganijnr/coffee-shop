import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, SPACING } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";
import { useStore } from "../store/store";
import EmptyListAnimation from "../components/EmptyListAnimation";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import FavoritesItemCard from "../components/FavoritesItemCard";

const FavoritesScreen = ({ navigation }: any) => {
	const favorites = useStore((state: any) => state.FavoritesList);
	console.log(
		"🚀 ~ file: FavoritesScreen.tsx:10 ~ FavoritesScreen ~ favorites:",
		favorites
	);

	const tabBarHeight = useBottomTabBarHeight();

	const addToFavorite = useStore((state: any) => state.addToFavoriteList);
	const deleteFromFavorite = useStore(
		(state: any) => state.deleteFromFavoriteList
	);

	const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
		favourite ? deleteFromFavorite(type, id) : addToFavorite(type, id);
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
				<View
					style={[
						styles.ScrollViewInnerView,
						{ marginBottom: tabBarHeight },
					]}
				>
					<View style={styles.ItemContainer}>
						<HeaderBar title="Favorites" />

						{favorites?.length > 0 ? (
							<View style={styles.ListItemContainer}>
								{favorites?.map((item: any) => (
									<TouchableOpacity
										onPress={() => {
											navigation.push("Details", {
												index: item.index,
												id: item.id,
												type: item.type,
											});
										}}
										key={item.id}
									>
										<FavoritesItemCard
											id={item.id}
											imagelink_portrait={item.imagelink_portrait}
											name={item.name}
											special_ingredient={item.special_ingredient}
											type={item.type}
											ingredients={item.ingredients}
											average_rating={item.average_rating}
											ratings_count={item.ratings_count}
											roasted={item.roasted}
											description={item.description}
											favourite={item.favourite}
											ToggleFavouriteItem={ToggleFavourite}
										/>
									</TouchableOpacity>
								))}
							</View>
						) : (
							<EmptyListAnimation title="Favorites is empty" />
						)}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default FavoritesScreen;

const styles = StyleSheet.create({
	ScreenContainer: {
		flex: 1,
		backgroundColor: COLORS.primaryBlackHex,
	},
	ScrollStyle: {
		flexGrow: 1,
	},
	ScrollViewInnerView: {
		flex: 1,
		justifyContent: "space-between",
	},
	ItemContainer: {
		flex: 1,
	},
	ListItemContainer: {
		paddingHorizontal: SPACING.space_20,
		marginTop: SPACING.space_20,
		gap: SPACING.space_20,
	},
});
