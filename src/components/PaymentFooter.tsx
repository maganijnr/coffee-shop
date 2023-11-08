import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";

interface PriceProps {
	price: string;
	currency: string;
}

interface PaymentProps {
	price: PriceProps;
	buttonPressHandler: any;
	buttonTitle: string;
}

const PaymentFooter: React.FC<PaymentProps> = ({
	price,
	buttonPressHandler,
	buttonTitle,
}) => {
	return (
		<View style={styles.PriceFooter}>
			<View style={styles.PriceContainer}>
				<Text style={styles.PriceTitle}>Price</Text>
				<Text style={styles.PriceText}>
					<Text style={styles.CurrencyText}>{price.currency}</Text>
					{price.price}
				</Text>
			</View>
			<TouchableOpacity
				style={styles.FooterBtn}
				onPress={buttonPressHandler}
			>
				<Text style={styles.BtnTXT}>{buttonTitle}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default PaymentFooter;

const styles = StyleSheet.create({
	PriceFooter: {
		flexDirection: "row",
		flex: 1,
		paddingHorizontal: SPACING.space_20,
		alignItems: "center",
		justifyContent: "space-between",
		gap: SPACING.space_8,
	},
	PriceContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	PriceTitle: {
		color: "#AEAEAE",
		fontSize: FONTSIZE.size_12,
		lineHeight: FONTSIZE.size_20,
		fontWeight: "500",
	},
	PriceText: {
		color: COLORS.primaryWhiteHex,
		gap: 5,
		fontSize: FONTSIZE.size_20,
		lineHeight: FONTSIZE.size_20,
		fontWeight: "600",
	},
	CurrencyText: {
		marginRight: SPACING.space_8,
		color: COLORS.primaryOrangeHex,
	},
	FooterBtn: {
		backgroundColor: COLORS.primaryOrangeHex,
		flex: 2,
		alignItems: "center",
		justifyContent: "center",
		height: SPACING.space_28 * 2,
		borderRadius: BORDERRADIUS.radius_15,
	},
	BtnTXT: {
		fontWeight: "600",
		fontSize: FONTSIZE.size_16,
		lineHeight: FONTSIZE.size_20,
		color: COLORS.primaryWhiteHex,
	},
});
