import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
} from "react-native";
import React from "react";
import { COLORS, SPACING } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PaymentFooter from "../components/PaymentFooter";
import CartItem from "../components/CartItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = ({ navigation, route }: any) => {
	const cartItems = useStore((state: any) => state.CartList);

	const cartPrice = useStore((state: any) => state.CartPrice);
	const incrementCartItemQuantity = useStore(
		(state: any) => state.incrementCartItemQuantity
	);
	const decrementCartItemQuantity = useStore(
		(state: any) => state.decrementCartItemQuantity
	);
	const calculateCartPrice = useStore(
		(state: any) => state.calculateCartPrice
	);

	const tabBarHeight = useBottomTabBarHeight();

	const buttonPressHandler = async () => {
		navigation.push("Payment");
	};

	const incrementCartItemQuantityHandler = (id: string, size: string) => {
		incrementCartItemQuantity(id, size);
		calculateCartPrice();
	};

	const decrementCartItemQuantityHandler = (id: string, size: string) => {
		decrementCartItemQuantity(id, size);
		calculateCartPrice();
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
							<View
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{Platform.OS === "ios" && (
									<EmptyListAnimation title="Cart is empty" />
								)}
								{Platform.OS === "android" && (
									<Text>Cart is empty</Text>
								)}
							</View>
						) : (
							<View style={styles.ListItemContainer}>
								{cartItems.map((data: any) => (
									<TouchableOpacity onPress={() => {}} key={data.id}>
										<CartItem
											id={data.id}
											name={data.name}
											imagelink_square={data.imagelink_square}
											special_ingredient={data.special_ingredient}
											roasted={data.roasted}
											prices={data.prices}
											type={data.type}
											incrementCartItemQuantityHandler={
												incrementCartItemQuantityHandler
											}
											decrementCartItemQuantityHandler={
												decrementCartItemQuantityHandler
											}
										/>
									</TouchableOpacity>
								))}
							</View>
						)}
					</View>
					{cartItems.length !== 0 ? (
						<PaymentFooter
							buttonTitle="Pay"
							price={{ price: cartPrice, currency: "$" }}
							buttonPressHandler={buttonPressHandler}
						/>
					) : (
						<></>
					)}
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
	ListItemContainer: {
		paddingHorizontal: SPACING.space_20,
		gap: SPACING.space_20,
		paddingVertical: SPACING.space_20,
	},
});
