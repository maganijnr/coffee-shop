import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import { COLORS } from "../theme/theme";
import { BlurView } from "@react-native-community/blur";
import FontIcon from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				tabBarStyle: styles.tabBarStyle,
				// tabBarBackground: () => (
				// 	<BlurView
				// 		overlayColor=""
				// 		blurAmount={15}
				// 		style={styles.BlurViewStyle}
				// 	/>
				// ),
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontIcon
							name="home"
							size={25}
							color={
								focused
									? COLORS.primaryOrangeHex
									: COLORS.primaryLightGreyHex
							}
						/>
					),
				}}
			></Tab.Screen>
			<Tab.Screen
				name="Cart"
				component={CartScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontIcon
							name="shopping-bag"
							size={25}
							color={
								focused
									? COLORS.primaryOrangeHex
									: COLORS.primaryLightGreyHex
							}
						/>
					),
				}}
			></Tab.Screen>
			<Tab.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontIcon
							name="heart"
							size={25}
							color={
								focused
									? COLORS.primaryOrangeHex
									: COLORS.primaryLightGreyHex
							}
						/>
					),
				}}
			></Tab.Screen>
			<Tab.Screen
				name="History"
				component={OrderHistoryScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontIcon
							name="bell"
							size={25}
							color={
								focused
									? COLORS.primaryOrangeHex
									: COLORS.primaryLightGreyHex
							}
						/>
					),
				}}
			></Tab.Screen>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	tabBarStyle: {
		height: 80,
		position: "absolute",
		backgroundColor: COLORS.primaryBlackHex,
		borderTopWidth: 0,
		elevation: 0,
		borderTopColor: "transparent",
	},
	BlurViewStyle: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
});
