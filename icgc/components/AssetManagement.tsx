import { useState } from 'react';
import { Package, Plus, Search, Edit2, Trash2, Save, X, TrendingUp, Calendar, DollarSign, FolderTree } from 'lucide-react';
import {Asset, AssetCategory} from '@/interface';

export default function AssetManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 1,
      name: 'Church Building',
      category: 'Building',
      purchaseDate: '2020-01-15',
      purchaseValue: 500000,
      currentValue: 600000,
      condition: 'Excellent',
      location: 'Main Site',
      description: 'Main church building with sanctuary and offices',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Sound System',
      category: 'Audio Visual equipment',
      purchaseDate: '2022-06-20',
      purchaseValue: 3500,
      currentValue: 2800,
      condition: 'Excellent',
      location: 'Main Sanctuary',
      description: 'Complete sound system with speakers and mixer',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Padded Chairs',
      category: 'Furniture & fittings',
      purchaseDate: '2021-03-10',
      purchaseValue: 5000,
      currentValue: 4000,
      condition: 'Good',
      location: 'Main Sanctuary',
      description: 'Padded chairs for congregation',
      quantity: 200,
    },
    {
      id: 4,
      name: 'Grand Piano',
      category: 'Musical equipment',
      purchaseDate: '2020-08-05',
      purchaseValue: 8000,
      currentValue: 7500,
      condition: 'Excellent',
      location: 'Main Sanctuary',
      description: 'Grand piano for worship services',
      quantity: 1,
    },
    {
      id: 5,
      name: 'Office Computers',
      category: 'Computers & accessories',
      purchaseDate: '2023-05-12',
      purchaseValue: 4500,
      currentValue: 3500,
      condition: 'Good',
      location: 'Admin Office',
      description: 'Desktop computers for administrative staff',
      quantity: 5,
    },
    {
      id: 6,
      name: 'Church Van',
      category: 'Motor vehicle',
      purchaseDate: '2021-11-20',
      purchaseValue: 35000,
      currentValue: 28000,
      condition: 'Good',
      location: 'Church Parking',
      description: '15-seater van for church outreach',
      quantity: 1,
    },
  ]);

  const [newAsset, setNewAsset] = useState<Omit<Asset, 'id'>>({
    name: '',
    category: 'Building',
    purchaseDate: '',
    purchaseValue: 0,
    currentValue: 0,
    condition: 'Excellent',
    location: '',
    description: '',
    quantity: 1,
  });

  const [editForm, setEditForm] = useState<Asset | null>(null);

  const [categories, setCategories] = useState<AssetCategory[]>([
    { id: 1, name: 'Building', code: 'BLDG' },
    { id: 2, name: 'Plant & machinery', code: 'P&M' },
    { id: 3, name: 'Furniture & fittings', code: 'F&F' },
    { id: 4, name: 'Office equipment', code: 'OFFEQ' },
    { id: 5, name: 'Musical equipment', code: 'MUSEQ' },
    { id: 6, name: 'Audio Visual equipment', code: 'AVEQ' },
    { id: 7, name: 'Motor vehicle', code: 'MV' },
    { id: 8, name: 'Computers & accessories', code: 'COMP' },
    { id: 9, name: 'Security equipment', code: 'SECEQ' },
    { id: 10, name: 'Copyrights & trademarks', code: 'C&T' },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', code: '' });

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.purchaseDate || !newAsset.purchaseValue || !newAsset.location) {
      alert('Please fill in all required fields: Name, Purchase Date, Purchase Value, and Location');
      return;
    }

    const asset: Asset = {
      id: assets.length + 1,
      ...newAsset,
      currentValue: newAsset.currentValue || newAsset.purchaseValue,
      quantity: newAsset.quantity || 1,
    };

    setAssets([...assets, asset]);
    setNewAsset({
      name: '',
      category: 'Building',
      purchaseDate: '',
      purchaseValue: 0,
      currentValue: 0,
      condition: 'Excellent',
      location: '',
      description: '',
      quantity: 1,
    });
    setShowAddModal(false);
    alert('Asset added successfully!');
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAssetId(asset.id);
    setEditForm({ ...asset });
  };

  const handleSaveAsset = () => {
    if (!editForm) return;

    setAssets(assets.map(a => a.id === editForm.id ? editForm : a));
    setEditingAssetId(null);
    setEditForm(null);
    alert('Asset updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingAssetId(null);
    setEditForm(null);
  };

  const handleDeleteAsset = (id: number) => {
    const asset = assets.find(a => a.id === id);
    if (window.confirm(`Are you sure you want to remove "${asset?.name}" from the asset list? This action cannot be undone.`)) {
      setAssets(assets.filter(a => a.id !== id));
      alert('Asset removed successfully!');
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.code) {
      alert('Please fill in both Category Name and Code');
      return;
    }

    // Check if code already exists
    if (categories.some(cat => cat.code.toUpperCase() === newCategory.code.toUpperCase())) {
      alert('This code already exists. Please use a unique code.');
      return;
    }

    const category: AssetCategory = {
      id: categories.length + 1,
      name: newCategory.name,
      code: newCategory.code.toUpperCase(),
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '', code: '' });
    alert('Category added successfully!');
  };

  const handleDeleteCategory = (id: number) => {
    const category = categories.find(c => c.id === id);
    
    // Check if any assets use this category
    const assetsUsingCategory = assets.filter(a => a.category === category?.name);
    if (assetsUsingCategory.length > 0) {
      alert(`Cannot delete this category because ${assetsUsingCategory.length} asset(s) are using it. Please reassign those assets first.`);
      return;
    }

    if (window.confirm(`Are you sure you want to delete the category "${category?.name}"?`)) {
      setCategories(categories.filter(c => c.id !== id));
      alert('Category deleted successfully!');
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || asset.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalAssets = assets.reduce((sum, asset) => sum + asset.quantity, 0);
  const totalValue = assets.reduce((sum, asset) => sum + (asset.currentValue * asset.quantity), 0);
  const totalPurchaseValue = assets.reduce((sum, asset) => sum + (asset.purchaseValue * asset.quantity), 0);
  const recentAdditions = assets.filter(asset => {
    const purchaseDate = new Date(asset.purchaseDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return purchaseDate >= thirtyDaysAgo;
  }).length;

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent':
        return 'bg-green-50 text-green-700';
      case 'Good':
        return 'bg-blue-50 text-blue-700';
      case 'Fair':
        return 'bg-yellow-50 text-yellow-700';
      case 'Poor':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 mb-2">Asset Management</h1>
            <p className="text-gray-600">Track and manage church properties and equipment</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Asset
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Total Assets</p>
            </div>
            <h3 className="text-3xl text-gray-900">{totalAssets}</h3>
            <p className="text-xs text-gray-500 mt-1">{assets.length} unique items</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Current Value</p>
            </div>
            <h3 className="text-3xl text-gray-900">${totalValue.toLocaleString()}</h3>
            <p className="text-xs text-gray-500 mt-1">Total market value</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">Purchase Value</p>
            </div>
            <h3 className="text-3xl text-gray-900">${totalPurchaseValue.toLocaleString()}</h3>
            <p className="text-xs text-gray-500 mt-1">Original investment</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-sm text-gray-600">Recent Additions</p>
            </div>
            <h3 className="text-3xl text-gray-900">{recentAdditions}</h3>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>
        </div>

        {/* Asset Classes */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FolderTree className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Asset classes</h2>
                <p className="text-sm text-gray-600">{categories.length} categories defined</p>
              </div>
            </div>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Manage Categories
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {categories.map((category) => (
                <li key={category.id} className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between">
                  <span className="text-gray-900">{category.name}</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{category.code}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-gray-900 mb-2">Asset Inventory</h2>
                <p className="text-sm text-gray-600">Complete list of all church assets</p>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search assets..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="All">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.code} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Asset Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Purchase Date
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Current Value
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    {editingAssetId === asset.id && editForm ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                          >
                            {categories.map(cat => (
                              <option key={cat.code} value={cat.name}>{cat.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="date"
                            value={editForm.purchaseDate}
                            onChange={(e) => setEditForm({ ...editForm, purchaseDate: e.target.value })}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={editForm.currentValue}
                            onChange={(e) => setEditForm({ ...editForm, currentValue: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={editForm.quantity}
                            onChange={(e) => setEditForm({ ...editForm, quantity: parseInt(e.target.value) || 1 })}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editForm.condition}
                            onChange={(e) => setEditForm({ ...editForm, condition: e.target.value as Asset['condition'] })}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                          >
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Poor">Poor</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveAsset}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-gray-900">{asset.name}</p>
                            <p className="text-xs text-gray-500">{asset.description}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-full">
                            {asset.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-900 text-sm">
                          {new Date(asset.purchaseDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-gray-900">${asset.currentValue.toLocaleString()}</td>
                        <td className="px-6 py-4 text-gray-900">{asset.quantity}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getConditionColor(asset.condition)}`}>
                            {asset.condition}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-900 text-sm">{asset.location}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditAsset(asset)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAsset(asset.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAssets.length === 0 && (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No assets found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-green-700 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 h-fit my-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Add New Asset</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Asset Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Projector"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={newAsset.category}
                  onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat.code} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Purchase Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={newAsset.purchaseDate}
                  onChange={(e) => setNewAsset({ ...newAsset, purchaseDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Purchase Value ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={newAsset.purchaseValue || ''}
                  onChange={(e) => setNewAsset({ ...newAsset, purchaseValue: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Current Value ($)
                </label>
                <input
                  type="number"
                  value={newAsset.currentValue || ''}
                  onChange={(e) => setNewAsset({ ...newAsset, currentValue: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Leave blank to use purchase value"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={newAsset.quantity || ''}
                  onChange={(e) => setNewAsset({ ...newAsset, quantity: e.target.value === '' ? 0 : parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter quantity (e.g., 1, 5, 200)"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  value={newAsset.condition}
                  onChange={(e) => setNewAsset({ ...newAsset, condition: e.target.value as Asset['condition'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAsset.location}
                  onChange={(e) => setNewAsset({ ...newAsset, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Main Sanctuary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newAsset.description}
                  onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Additional details about the asset..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddAsset}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Asset
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Management Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Manage Asset Categories</h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Add New Category Form */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-gray-900 mb-4">Add New Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Office equipment"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Unique Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCategory.code}
                    onChange={(e) => setNewCategory({ ...newCategory, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., OFFEQ"
                    maxLength={10}
                  />
                </div>
              </div>
              <button
                onClick={handleAddCategory}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
            </div>

            {/* Existing Categories List */}
            <div>
              <h3 className="text-gray-900 mb-4">Existing Categories ({categories.length})</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs text-gray-600 uppercase tracking-wider">
                        Category Name
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-gray-600 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900">{category.name}</td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded font-mono">
                            {category.code}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}