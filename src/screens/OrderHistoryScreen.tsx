import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Platform,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { BORDERRADIUS, COLORS, SPACING } from "../theme/theme";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import HeaderBar from "../components/HeaderBar";
import { useStore } from "../store/store";
import OrderItem from "../components/OrderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmptyListAnimation from "../components/EmptyListAnimation";

const OrderHistoryScreen = ({ navigation }: any) => {
	const tabBarHeight = useBottomTabBarHeight();
	const orderList = useStore((state: any) => state.OrderHistoryList);

	const handleDownload = async () => {
		navigation.navigate("Home");
		AsyncStorage.getAllKeys()
			.then((keys) => AsyncStorage.multiRemove(keys))
			.then(() => console.log("success"));
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
						styles.OrderListInnerScroll,
						{ marginBottom: tabBarHeight },
					]}
				>
					<View style={styles.OrderListContainer}>
						<HeaderBar title="Order History" />

						{orderList?.length > 0 ? (
							<View style={styles.OrderListWrapper}>
								{orderList?.map((order: any, index: number) => (
									<OrderItem
										key={index}
										totalAmount={order?.CartListPrice}
										orderDate={order?.OrderDate}
										orderItems={order?.CartList}
									/>
								))}
							</View>
						) : (
							<View
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{Platform.OS === "ios" && (
									<EmptyListAnimation title="Order history is empty" />
								)}
								{Platform.OS === "android" && (
									<Text>Order history is empty</Text>
								)}
							</View>
						)}
					</View>
					{orderList?.length > 0 && (
						<View style={styles.OrderListFooter}>
							<TouchableOpacity
								style={styles.FooterBtn}
								onPress={handleDownload}
							>
								<Text
									style={{
										color: COLORS.primaryWhiteHex,
										fontWeight: "600",
									}}
								>
									Download
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
	ScreenContainer: {
		flex: 1,
		backgroundColor: COLORS.primaryBlackHex,
	},
	ScrollStyle: {
		flexGrow: 1,
	},
	OrderListInnerScroll: {
		flex: 1,
	},
	OrderListContainer: {
		flex: 1,
	},
	OrderListFooter: {
		paddingHorizontal: SPACING.space_30,
		paddingVertical: SPACING.space_10,
	},
	OrderListWrapper: {
		flex: 1,
		paddingHorizontal: SPACING.space_30,
		paddingVertical: SPACING.space_30,
		gap: SPACING.space_30,
	},
	FooterBtn: {
		backgroundColor: COLORS.primaryOrangeHex,
		alignItems: "center",
		justifyContent: "center",
		height: SPACING.space_28 * 2,
		borderRadius: BORDERRADIUS.radius_15,
	},
});
