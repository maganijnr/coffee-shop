import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";

interface OrderItemProps {
	totalAmount: number;
	orderDate: string;
	orderItems: any;
}

const OrderItem: React.FC<OrderItemProps> = ({
	totalAmount,
	orderDate,
	orderItems,
}) => {
	return (
		<View style={styles.OrderContainer}>
			<View style={styles.OrderHeaderWrapper}>
				<View
					style={[
						styles.OrderHeaderRow,
						{ marginBottom: SPACING.space_4 },
					]}
				>
					<Text style={styles.HeaderTitle}>Order Date</Text>
					<Text style={styles.HeaderTitle}>Total Amount</Text>
				</View>
				<View style={styles.OrderHeaderRow}>
					<Text style={styles.OrderDateTxt}>{orderDate}</Text>
					<Text style={styles.OrderTotalAmount}>$ {totalAmount}</Text>
				</View>
			</View>
			<View style={styles.OrderItemsWrapper}>
				{orderItems?.map((item: any, index: number) => {
					return (
						<LinearGradient
							key={index}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1.5 }}
							colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
							style={styles.OrderItemCard}
						>
							<View style={styles.OrderItemHeader}>
								<Image
									style={styles.OrderItemImage}
									source={item?.imagelink_square}
								/>
								<View>
									<Text style={styles.OrderItemName}>
										{item?.name}
									</Text>
									<Text style={styles.OrderItemIngredient}>
										{item?.special_ingredient}
									</Text>
								</View>
								<Text style={styles.OrderItemAmount}>
									<Text
										style={{
											color: COLORS.primaryOrangeHex,
											marginRight: 2,
										}}
									>
										$
									</Text>
									{item?.ItemPrice}
								</Text>
							</View>
							<View style={styles.OrderItemPricesWrapper}>
								{item?.prices?.map((price: any, index: number) => (
									<View key={index} style={styles.OrderCard}>
										<View style={styles.SizeBox}>
											<View
												style={[
													styles.BoxItem,
													{
														borderTopLeftRadius:
															BORDERRADIUS.radius_10,
														borderBottomLeftRadius:
															BORDERRADIUS.radius_10,
													},
												]}
											>
												<Text
													style={{
														color: COLORS.primaryWhiteHex,
														fontWeight: "400",
														fontSize:
															item?.type === "Bean"
																? FONTSIZE.size_10
																: FONTSIZE.size_14,
													}}
												>
													{price?.size}
												</Text>
											</View>
											<View
												style={[
													styles.BoxItem,
													{
														borderTopRightRadius:
															BORDERRADIUS.radius_10,
														borderBottomRightRadius:
															BORDERRADIUS.radius_10,
														gap: SPACING.space_4,
													},
												]}
											>
												<Text
													style={{
														color: COLORS.primaryOrangeHex,
														fontSize: FONTSIZE.size_14,
														fontWeight: "500",
													}}
												>
													{price?.currency}
												</Text>
												<Text
													style={{
														color: COLORS.primaryWhiteHex,
														fontSize: FONTSIZE.size_16,
														fontWeight: "600",
													}}
												>
													{price?.price}
												</Text>
											</View>
										</View>
										<View style={styles.QtyBox}>
											<Text
												style={{
													color: COLORS.primaryOrangeHex,
													fontSize: FONTSIZE.size_16,
													fontWeight: "600",
													lineHeight: FONTSIZE.size_20,
												}}
											>
												X
											</Text>
											<Text
												style={{
													color: COLORS.primaryWhiteHex,
													fontSize: FONTSIZE.size_16,
													fontWeight: "600",
													lineHeight: FONTSIZE.size_20,
												}}
											>
												{price?.quantity}
											</Text>
										</View>

										<Text
											style={{
												color: COLORS.primaryOrangeHex,
												fontSize: FONTSIZE.size_16,
												fontWeight: "600",
												lineHeight: FONTSIZE.size_20,
											}}
										>
											{price?.price * price?.quantity}
										</Text>
									</View>
								))}
							</View>
						</LinearGradient>
					);
				})}
			</View>
		</View>
	);
};

export default OrderItem;

const styles = StyleSheet.create({
	OrderContainer: {},
	OrderHeaderWrapper: {
		marginBottom: SPACING.space_10,
	},
	OrderHeaderRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	HeaderTitle: {
		fontWeight: "600",
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_14,
	},
	OrderDateTxt: {
		fontWeight: "300",
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_14,
	},
	OrderTotalAmount: {
		fontWeight: "300",
		color: COLORS.primaryOrangeHex,
		fontSize: FONTSIZE.size_14,
	},
	OrderItemsWrapper: {
		gap: SPACING.space_10,
	},
	OrderItemCard: {
		borderRadius: BORDERRADIUS.radius_20 + 3,
		padding: SPACING.space_12,
	},
	OrderItemHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.space_24,
	},
	OrderItemImage: {
		width: 57,
		height: 57,
		borderRadius: BORDERRADIUS.radius_15,
	},
	OrderItemAmount: {
		fontSize: FONTSIZE.size_20,
		fontWeight: "600",
		color: COLORS.primaryWhiteHex,
		marginLeft: "auto",
	},
	OrderItemName: {
		fontWeight: "400",
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_16,
	},
	OrderItemIngredient: {
		fontWeight: "400",
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_8 + 1,
	},
	OrderItemPricesWrapper: {
		gap: SPACING.space_8,
		marginTop: SPACING.space_10,
	},
	OrderCard: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	SizeBox: {
		flexDirection: "row",
		gap: SPACING.space_2,
	},
	BoxItem: {
		flexDirection: "row",
		paddingVertical: SPACING.space_10,
		paddingHorizontal: SPACING.space_16,
		backgroundColor: COLORS.primaryBlackHex,
		alignItems: "center",
		justifyContent: "center",
	},
	QtyBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});
