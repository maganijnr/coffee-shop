import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import EmptyListAnimation from "../components/EmptyListAnimation";

const CartScreen = () => {
	const cartItems = useStore((state: any) => state.CartList);

	const cartPrice = useStore((state: any) => state.CartPrice);
	const incrementCartItemQuantity = useStore(
		(state: any) => state.incrementCartItemQuantity
	);
	const decrementCartItemQuantity = useStore(
		(state: any) => state.decrementCartItemQuantity
	);

	const tabBarHeight = useBottomTabBarHeight();

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
				{/* App Header */}

				<View
					style={[
						styles.ScrollViewInnerView,
						{ marginBottom: tabBarHeight },
					]}
				>
					<View style={styles.ItemContainer}>
						<HeaderBar title="Cart" />

						{cartItems?.length === 0 ? (
							<EmptyListAnimation title="Cart is empty" />
						) : (
							<EmptyListAnimation title="Cart is empty" />
						)}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default CartScreen;

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
});
