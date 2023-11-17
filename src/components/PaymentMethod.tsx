import { StyleSheet, Text, View, Image, ImageProps } from "react-native";
import { FC } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { Entypo } from "@expo/vector-icons";

interface MethodProps {
	paymentMode: string;
	name: string;
	icon: string | ImageProps;
	isIcon: boolean;
}

const PaymentMethod: FC<MethodProps> = ({
	paymentMode,
	name,
	icon,
	isIcon,
}) => {
	return (
		<View
			style={[
				styles.PaymentContainer,
				{
					borderColor:
						paymentMode === name
							? COLORS.primaryOrangeHex
							: COLORS.primaryGreyHex,
				},
			]}
		>
			{!isIcon ? (
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.PaymentCardGradientRegular}
					colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
				>
					<View style={styles.WalletRow}>
						{/*@ts-ignore*/}
						<Image source={icon} style={styles.IconImage} />
						<Text style={styles.PaymentTitle}>{name}</Text>
					</View>
				</LinearGradient>
			) : (
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.PaymentCardGradient}
					colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
				>
					<View style={styles.WalletRow}>
						<Entypo
							name="wallet"
							size={24}
							color={COLORS.primaryOrangeHex}
						/>
						<Text style={styles.PaymentTitle}>{name}</Text>
					</View>
					<Text style={styles.PaymentPrice}>$100</Text>
				</LinearGradient>
			)}
		</View>
	);
};

export default PaymentMethod;

const styles = StyleSheet.create({
	PaymentContainer: {
		borderRadius: BORDERRADIUS.radius_15 * 2,
		backgroundColor: COLORS.primaryGreyHex,
		borderWidth: 3,
		overflow: "hidden",
	},
	PaymentCardGradient: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: SPACING.space_12,
		paddingHorizontal: SPACING.space_24,
		gap: SPACING.space_24,
		borderRadius: BORDERRADIUS.radius_15 * 2,
	},
	PaymentCardGradientRegular: {
		flexDirection: "row",
		alignItems: "center",
		padding: SPACING.space_12,
		paddingHorizontal: SPACING.space_24,
		gap: SPACING.space_24,
		borderRadius: BORDERRADIUS.radius_15 * 2,
	},
	WalletRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.space_24,
	},
	IconImage: {
		width: 25,
		height: 25,
	},
	PaymentTitle: {
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_16,
	},
	PaymentPrice: {
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_14,
	},
});
