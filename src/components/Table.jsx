import { useInventory } from "../context/InventoryContext";

const Table = () => {
	const {inventory, removeWeaponFromInventory} = useInventory();
	console.log(inventory);
	const handleDeleteSkin = (weaponName) => {
		removeWeaponFromInventory(weaponName);
	}
	return (
	  <table className="mx-auto w-1/3 divide-y divide-gray-200 dark:divide-gray-700">
		<thead className="bg-gray-50 dark:bg-gray-700">
		  <tr>
			<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			  Icon
			</th>
			<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			  Name
			</th>
			<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			  Quality
			</th>
			<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			  Quantity
			</th>
			<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			  Buy Price
			</th>
			<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			  Sell Price
			</th>
			<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			  Profit
			</th>
			<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			  Actions
			</th>
		  </tr>
		</thead>
		<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
		  {inventory &&
			inventory.length > 0 &&
			inventory.map((weapon, weaponIndex) => (
			  weapon.skins &&
			  weapon.skins.length > 0 &&
			  weapon.skins.map((skin, skinIndex) => (
				<tr key={skinIndex}>
				  <td className="px-6 py-4 whitespace-nowrap">
					<img
					  src={Object.values(skin.goods_infos)[0].icon_url}
					  height="32px"
					  alt={Object.values(skin.goods_infos)[0].short_name}
					/>
				  </td>
				  <td className="px-6 py-4 whitespace-nowrap">
					{Object.values(skin.goods_infos)[0].short_name}
				  </td>
				  <td className="px-6 py-4 whitespace-nowrap">
					{Object.values(skin.goods_infos)[0].tags.exterior.localized_name}
				  </td>
				  <td className="px-6 py-4 whitespace-nowrap">
					{skin.quantity}
				  </td>
				  <td className="px-6 py-4 whitespace-nowrap">
					{skin.buyPrice}
				  </td>
				  <td className="px-6 py-4 whitespace-nowrap">
					{skin.items[0].price} ¥
				  </td>
				  <td className="px-6 py-4 whitespace-nowrap">
					{(
					  ((skin.items[0].price - skin.buyPrice) / skin.buyPrice) *
					  100
					).toFixed(2)}{' '}
					%
				  </td>
				  <td className="px-6 py-4 whitespace-nowrap">
					<button
					  className="text-red-500 hover:text-red-700"
					  onClick={() => handleDeleteSkin(Object.values(skin.goods_infos)[0].name)}
					>
					  Supprimer
					</button>
				  </td>
				</tr>
			  ))
			))}
		</tbody>
	  </table>
	);
  };
  
  export default Table;
  