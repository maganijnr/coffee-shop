import {
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import PaymentMethod from "../components/PaymentMethod";
import PaymentFooter from "../components/PaymentFooter";
import { useStore } from "../store/store";

const PaymentList = [
	{ name: "Wallet", icon: "icon", isIcon: true },
	{
		name: "Google Pay",
		icon: require("../../assets/app_images/gpay.png"),
		isIcon: false,
	},
	{
		name: "Apple Pay",
		icon: require("../../assets/app_images/applepay.png"),
		isIcon: false,
	},
	{
		name: "Amazon Pay",
		icon: require("../../assets/app_images/amazonpay.png"),
		isIcon: false,
	},
];

const PaymentScreen = ({ navigation }: any) => {
	const [paymentMode, setPaymentMode] = useState("Credit Card");
	const cartPrice = useStore((state: any) => state.CartPrice);
	const addToOrderHistoryListFromCart = useStore(
		(state: any) => state.addToOrderHistoryListFromCart
	);

	const handleAddToOrder = async () => {
		addToOrderHistoryListFromCart();
		navigation.navigate("History");
	};

	return (
		<View style={styles.ScreenContainer}>
			<StatusBar
				animated={true}
				backgroundColor={COLORS.primaryBlackHex}
				style="light"
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.ScrollViewFlex}
			>
				<View style={styles.HeaderContainer}>
					<LinearGradient
						colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
						style={{
							height: 33.43,
							width: 33.43,
							alignItems: "center",
							justifyContent: "center",
							borderRadius: BORDERRADIUS.radius_10,
						}}
					>
						<TouchableOpacity onPress={() => navigation.pop()}>
							<MaterialIcons
								name="keyboard-arrow-left"
								size={24}
								color="#FFF"
							/>
						</TouchableOpacity>
					</LinearGradient>
					<Text style={styles.HeaderText}>Payment</Text>
					<View style={styles.EmptyView} />
				</View>

				<View style={styles.PaymentOptionsContainer}>
					<TouchableOpacity
						onPress={() => setPaymentMode("Credit Card")}
						style={[
							styles.PaymentCreditCard,
							{
								borderColor:
									paymentMode === "Credit Card"
										? COLORS.primaryOrangeHex
										: COLORS.primaryGreyHex,
							},
						]}
					>
						<Text style={styles.CreditHeader}>Credit Card</Text>
						<LinearGradient
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
							style={styles.CardGradient}
						>
							<View style={styles.CardTop}>
								<Fontisto
									name="credit-card"
									size={24}
									color={COLORS.primaryOrangeHex}
								/>

								<Fontisto
									name="visa"
									size={24}
									color={COLORS.primaryOrangeHex}
								/>
							</View>

							<View style={styles.CardMiddle}>
								<Text style={styles.CardNumber}>
									3897 8923 6745 4638
								</Text>
							</View>
							<View style={styles.CardBottom}>
								<View style={styles.HolderTitles}>
									<Text style={styles.HolderText}>
										Card Holder Name
									</Text>
									<Text style={styles.HolderText}>Expiry Date</Text>
								</View>
								<View style={[styles.HolderTitles, { marginTop: 0 }]}>
									<Text style={styles.HolderName}>Joshua Magani</Text>
									<Text style={styles.HolderName}>02/30</Text>
								</View>
							</View>
						</LinearGradient>
					</TouchableOpacity>
					{PaymentList.map((data: any) => (
						<TouchableOpacity
							key={data?.name}
							onPress={() => setPaymentMode(data?.name)}
						>
							<PaymentMethod
								paymentMode={paymentMode}
								name={data?.name}
								icon={data?.icon}
								isIcon={data?.isIcon}
							/>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
			<PaymentFooter
				buttonPressHandler={() => {
					handleAddToOrder();
				}}
				buttonTitle={`Pay from ${paymentMode}`}
				price={{ price: cartPrice, currency: "$" }}
			/>
		</View>
	);
};

export default PaymentScreen;

const styles = StyleSheet.create({
	ScreenContainer: {
		flex: 1,
		backgroundColor: COLORS.primaryBlackHex,
	},
	ScrollViewFlex: {
		flexGrow: 1,
	},
	HeaderContainer: {
		paddingHorizontal: SPACING.space_24,
		paddingVertical: SPACING.space_15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: SPACING.space_30,
	},
	HeaderText: {
		fontSize: FONTSIZE.size_20,
		color: COLORS.primaryWhiteHex,
		fontWeight: "600",
	},
	EmptyView: {
		height: 33.43,
		width: 33.43,
	},

	PaymentOptionsContainer: {
		gap: SPACING.space_15,
		padding: SPACING.space_15,
	},
	PaymentCreditCard: {
		paddingVertical: SPACING.space_16,
		paddingHorizontal: SPACING.space_16,
		borderRadius: BORDERRADIUS.radius_15 * 2,

		borderWidth: 3,
	},
	CardGradient: {
		width: "100%",
		height: 186,
		borderRadius: BORDERRADIUS.radius_15,
		paddingVertical: SPACING.space_16,
		justifyContent: "space-between",
	},
	CardTop: {
		flexDirection: "row",
		paddingHorizontal: SPACING.space_10,
		justifyContent: "space-between",
	},
	CardMiddle: {
		paddingHorizontal: SPACING.space_10,
		justifyContent: "space-between",
	},
	CardNumber: {
		color: COLORS.primaryWhiteHex,
		fontSize: SPACING.space_15,
		letterSpacing: 5,
	},
	CardBottom: {
		paddingHorizontal: SPACING.space_10,
	},
	HolderTitles: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	HolderText: {
		fontWeight: "400",
		fontSize: FONTSIZE.size_10,
		lineHeight: FONTSIZE.size_20,
		color: COLORS.primaryLightGreyHex,
	},

	HolderName: {
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_16,
		lineHeight: FONTSIZE.size_20,
		fontWeight: "500",
	},
	CreditHeader: {
		marginBottom: SPACING.space_16,
		color: COLORS.primaryWhiteHex,
		fontWeight: "600",
		fontSize: FONTSIZE.size_14,
	},
});
