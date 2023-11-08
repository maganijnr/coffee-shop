import {
	StyleSheet,
	Text,
	View,
	Platform,
	TouchableOpacity,
	TextInput,
	FlatList,
	Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
	BORDERRADIUS,
	COLORS,
	FONTFAMILY,
	FONTSIZE,
	SPACING,
} from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import HeaderBar from "../components/HeaderBar";
import { Ionicons } from "@expo/vector-icons";
import CoffeeCard from "../components/CoffeeCard";
import { AntDesign } from "@expo/vector-icons";

const getCategorieFromData = (data: any) => {
	let temp: any = {};

	for (let i = 0; i < data.length; i++) {
		if (temp[data[i].name] === undefined) {
			temp[data[i].name] = 1;
		} else {
			temp[data[i].name]++;
		}
	}

	let categories = Object.keys(temp);
	categories.unshift("All");
	return categories;
};

const getCoffeeList = (category: string, data: any) => {
	if (category === "All") {
		let coffeeList = data;

		return coffeeList;
	} else {
		let coffeeList = data.filter((item: any) => item.name === category);

		return coffeeList;
	}
};

const HomeScreen = ({ navigation }: { navigation: any }) => {
	const CoffeeList = useStore((state: any) => state.CoffeeList);
	const BeanList = useStore((state: any) => state.BeanList);
	const ListRef: any = useRef<FlatList>();

	const [categories, setCategories] = useState([
		...getCategorieFromData(CoffeeList),
	]);
	const [searchText, setSearchText] = useState("");
	const [categoryIndex, setCategoryIndex] = useState({
		index: 0,
		category: categories[0],
	});
	const [sortedCoffee, setSortedCoffee] = useState(
		getCoffeeList(categoryIndex.category, CoffeeList)
	);

	const tabBarHeight = useBottomTabBarHeight();

	const searchCoffe = (search: string) => {
		if (search !== "") {
			ListRef?.current?.scrollToOffset({
				animated: true,
				offset: 0,
			});

			setCategoryIndex({ index: 0, category: categories[0] });
			setSortedCoffee([
				...CoffeeList.filter((item: any) =>
					item.name.toLowerCase().includes(search.toLowerCase())
				),
			]);
		}
	};

	const resetSearchCoffee = () => {
		ListRef?.current?.scrollToOffset({
			animated: true,
			offset: 0,
		});

		setCategoryIndex({ index: 0, category: categories[0] });
		setSortedCoffee([...CoffeeList]);

		setSearchText("");
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
				<HeaderBar />

				<Text style={styles.screenTitle}>
					Find the best{"\n"}coffee for you
				</Text>

				{/*Search*/}
				<View style={styles.searchContainer}>
					<TouchableOpacity
						onPress={() => {
							searchCoffe(searchText);
						}}
					>
						<Ionicons
							name="search-outline"
							size={24}
							color={
								searchText?.length > 0
									? COLORS.primaryOrangeHex
									: COLORS.primaryGreyHex
							}
						/>
					</TouchableOpacity>
					<TextInput
						placeholder="Find your coffee..."
						value={searchText}
						onChangeText={(text) => {
							setSearchText(text);
							searchCoffe(searchText);
						}}
						placeholderTextColor={COLORS.primaryLightGreyHex}
						style={styles.textInput}
					/>
					{searchText.length > 0 ? (
						<TouchableOpacity
							onPress={() => {
								resetSearchCoffee();
							}}
						>
							<AntDesign
								name="close"
								size={20}
								color={COLORS.primaryLightGreyHex}
								style={{ marginLeft: "auto" }}
							/>
						</TouchableOpacity>
					) : (
						<></>
					)}
				</View>

				{/*Category scroll bar*/}
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.categoryScroll}
				>
					{categories.map((data, index) => (
						<View key={index}>
							<TouchableOpacity
								onPress={() => {
									ListRef?.current.scrollToOffset({
										animated: true,
										offset: 0,
									});
									setCategoryIndex({
										index: index,
										category: categories[index],
									});
									setSortedCoffee([
										...getCoffeeList(categories[index], CoffeeList),
									]);
								}}
								style={styles.categoryTab}
							>
								<Text
									style={[
										styles.categoryText,
										categoryIndex.index === index
											? { color: COLORS.primaryOrangeHex }
											: { color: "#FFF" },
									]}
								>
									{data}
								</Text>
								{categoryIndex.index === index ? (
									<View style={styles.activeIndicator}></View>
								) : (
									<></>
								)}
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>

				{/*Flatlist*/}

				<FlatList
					ref={ListRef}
					data={sortedCoffee}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={[
						styles.FlatlistStyles,
						{ marginBottom: SPACING.space_30 },
					]}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									navigation.push("Details", {
										index: item.index,
										id: item.id,
										type: item.type,
									});
								}}
							>
								<CoffeeCard
									name={item.name}
									id={item.id}
									average_rating={item.average_rating}
									imagelink_square={item.imagelink_square}
									type={item.type}
									prices={item.prices}
									rosted={item.rosted}
									special_ingredient={item.special_ingredient}
									key={item.id}
									buttomPressEnter={() => {}}
									index={categoryIndex.index}
								/>
							</TouchableOpacity>
						);
					}}
					ListEmptyComponent={
						<View style={styles.EmptyListContainer}>
							<Text style={styles.CategoryText}>No Coffee Found</Text>
						</View>
					}
				/>

				<FlatList
					data={BeanList}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={[
						styles.FlatlistStyles,
						{ marginBottom: tabBarHeight },
					]}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									navigation.push("Details", {
										index: item.index,
										id: item.id,
										type: item.type,
									});
								}}
							>
								<CoffeeCard
									name={item.name}
									id={item.id}
									average_rating={item.average_rating}
									imagelink_square={item.imagelink_square}
									type={item.type}
									prices={item.prices}
									rosted={item.rosted}
									special_ingredient={item.special_ingredient}
									key={item.id}
									buttomPressEnter={() => {}}
									index={categoryIndex.index}
								/>
							</TouchableOpacity>
						);
					}}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	ScreenContainer: {
		flex: 1,
		backgroundColor: COLORS.primaryBlackHex,
	},
	ScrollStyle: {
		flexGrow: 1,
		// paddingTop: Platform.OS === "ios" ? 50 : 50,
		// backgroundColor: "red",
	},
	screenTitle: {
		color: "#fff",
		paddingLeft: SPACING.space_30,
		marginTop: SPACING.space_30,
		fontSize: FONTSIZE.size_28,
		fontWeight: "600",
	},

	searchContainer: {
		marginHorizontal: SPACING.space_30,
		marginTop: SPACING.space_30,
		height: 45,
		borderRadius: BORDERRADIUS.radius_15,
		backgroundColor: "#141921",
		paddingHorizontal: SPACING.space_15,
		flexDirection: "row",
		alignItems: "center",
	},
	textInput: {
		marginLeft: SPACING.space_10,
		color: COLORS.primaryWhiteHex,
		fontWeight: "500",
		flex: 1,
	},
	categoryScroll: {
		marginTop: SPACING.space_30,
		paddingLeft: SPACING.space_30,
	},
	categoryTab: {
		marginRight: SPACING.space_24,
		alignItems: "center",
	},
	categoryText: {
		fontSize: FONTSIZE.size_14,
		fontWeight: "600",
		marginBottom: SPACING.space_4,
	},
	activeIndicator: {
		width: SPACING.space_8,
		height: SPACING.space_8,
		backgroundColor: COLORS.primaryOrangeHex,

		borderRadius: 50,
	},
	FlatlistStyles: {
		gap: SPACING.space_20,
		paddingVertical: SPACING.space_20,
		paddingHorizontal: SPACING.space_30,
	},
	EmptyListContainer: {
		width: Dimensions.get("window").width - SPACING.space_30 * 2,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: SPACING.space_36 * 2.6,
	},
	CategoryText: {
		color: COLORS.primaryWhiteHex,
		fontSize: FONTSIZE.size_20,
		fontWeight: "600",
	},
});

export default HomeScreen;
