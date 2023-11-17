import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { BORDERRADIUS, COLORS, SPACING } from "../theme/theme";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import HeaderBar from "../components/HeaderBar";
import { useStore } from "../store/store";

const OrderHistoryScreen = () => {
	const tabBarHeight = useBottomTabBarHeight();
	const orderList = useStore((state: any) => state.OrderHistoryList);
	console.log(orderList);
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
					</View>
					<View style={styles.OrderListFooter}>
						<TouchableOpacity style={styles.FooterBtn}>
							<Text>Download</Text>
						</TouchableOpacity>
					</View>
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
		backgroundColor: "blue",
	},
	OrderListFooter: {
		paddingHorizontal: SPACING.space_16,
		paddingVertical: SPACING.space_10,
	},
	FooterBtn: {
		backgroundColor: COLORS.primaryOrangeHex,
		alignItems: "center",
		justifyContent: "center",
		height: SPACING.space_28 * 2,
		borderRadius: BORDERRADIUS.radius_15,
	},
});
