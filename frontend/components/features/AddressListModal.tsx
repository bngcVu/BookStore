import React from 'react';
import { X, MapPin, CheckCircle2, Plus } from 'lucide-react';

interface Address {
    id: number;
    name: string;
    recipient: string;
    phone: string;
    address: string;
    isDefault: boolean;
}

interface AddressListModalProps {
    isOpen: boolean;
    onClose: () => void;
    addresses: Address[];
    selectedId: number;
    onSelect: (address: Address) => void;
}

export function AddressListModal({ isOpen, onClose, addresses, selectedId, onSelect }: AddressListModalProps) {
    const [isAddingNew, setIsAddingNew] = React.useState(false);

    // Form State
    const [newAddress, setNewAddress] = React.useState({
        recipient: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        street: '',
        type: 'Nhà Riêng',
        isDefault: false
    });

    const handleSave = () => {
        // Validation check (basic)
        if (!newAddress.recipient || !newAddress.phone || !newAddress.street) {
            alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }

        const newAddr: Address = {
            id: Date.now(),
            name: newAddress.type,
            recipient: newAddress.recipient,
            phone: newAddress.phone,
            address: `${newAddress.street}, ${newAddress.ward}, ${newAddress.district}, ${newAddress.province}`,
            isDefault: newAddress.isDefault
        };

        // Pass back to parent (In real app, call API here)
        onSelect(newAddr);
        onClose();
        setIsAddingNew(false);
        setNewAddress({ recipient: '', phone: '', province: '', district: '', ward: '', street: '', type: 'Nhà Riêng', isDefault: false });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200 z-10 border border-slate-100">

                {/* Header */}
                <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-3">
                        {isAddingNew && (
                            <button onClick={() => setIsAddingNew(false)} className="mr-1 hover:text-primary transition-colors">
                                <span className="text-sm font-bold">Quay lại</span>
                            </button>
                        )}
                        <h3 className="font-heading font-black text-lg text-slate-900">
                            {isAddingNew ? 'Thêm địa chỉ mới' : 'Chọn địa chỉ nhận hàng'}
                        </h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto p-6 bg-slate-50/50">
                    {isAddingNew ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Họ và tên</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="Nguyễn Văn A"
                                        value={newAddress.recipient}
                                        onChange={e => setNewAddress({ ...newAddress, recipient: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="0987..."
                                        value={newAddress.phone}
                                        onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Tỉnh / Thành phố</label>
                                    <select
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                                        value={newAddress.province}
                                        onChange={e => setNewAddress({ ...newAddress, province: e.target.value })}
                                    >
                                        <option value="">Chọn Tỉnh/Thành</option>
                                        <option value="Hà Nội">Hà Nội</option>
                                        <option value="TP.HCM">TP.HCM</option>
                                        <option value="Đà Nẵng">Đà Nẵng</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Quận / Huyện</label>
                                    <select
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                                        value={newAddress.district}
                                        onChange={e => setNewAddress({ ...newAddress, district: e.target.value })}
                                    >
                                        <option value="">Chọn Quận/Huyện</option>
                                        <option value="Quận 1">Quận 1</option>
                                        <option value="Quận 3">Quận 3</option>
                                        <option value="Quận Cầu Giấy">Quận Cầu Giấy</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 uppercase">Phường / Xã</label>
                                <input
                                    type="text"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Phường Bến Nghé"
                                    value={newAddress.ward}
                                    onChange={e => setNewAddress({ ...newAddress, ward: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 uppercase">Địa chỉ cụ thể</label>
                                <textarea
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all h-20 resize-none"
                                    placeholder="Số nhà, tên tòa nhà, tên đường..."
                                    value={newAddress.street}
                                    onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center gap-4 py-2">
                                <label className="text-sm font-bold text-slate-700">Loại địa chỉ:</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="addrType" checked={newAddress.type === 'Nhà Riêng'} onChange={() => setNewAddress({ ...newAddress, type: 'Nhà Riêng' })} className="accent-primary" />
                                        <span className="text-sm">Nhà Riêng</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="addrType" checked={newAddress.type === 'Văn Phòng'} onChange={() => setNewAddress({ ...newAddress, type: 'Văn Phòng' })} className="accent-primary" />
                                        <span className="text-sm">Văn Phòng</span>
                                    </label>
                                </div>
                            </div>

                            <label className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-primary rounded"
                                    checked={newAddress.isDefault}
                                    onChange={e => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                />
                                <span className="font-bold text-slate-700 text-sm">Đặt làm địa chỉ mặc định</span>
                            </label>

                            <button
                                onClick={handleSave}
                                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                            >
                                Hoàn thành
                            </button>
                        </div>
                    ) : (
                        // List View
                        <div className="space-y-3">
                            {addresses.map((addr) => {
                                const isSelected = selectedId === addr.id;
                                return (
                                    <div
                                        key={addr.id}
                                        onClick={() => { onSelect(addr); onClose(); }}
                                        className={`
                                            relative p-4 rounded-xl border-2 cursor-pointer transition-all flex gap-4 items-start group
                                            ${isSelected
                                                ? 'bg-white border-primary shadow-lg shadow-primary/10'
                                                : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-md'
                                            }
                                        `}
                                    >
                                        <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-primary bg-primary text-white' : 'border-slate-300'}`}>
                                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-slate-900">{addr.recipient}</span>
                                                <span className="text-slate-400">|</span>
                                                <span className="text-slate-600 font-medium text-sm">{addr.phone}</span>
                                            </div>
                                            <p className="text-slate-600 text-sm leading-relaxed mb-2">{addr.address}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded tracking-wider border border-slate-200">
                                                    {addr.name}
                                                </span>
                                                {addr.isDefault && (
                                                    <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded tracking-wider border border-red-100">
                                                        Mặc định
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Add New Button */}
                            <button
                                onClick={() => setIsAddingNew(true)}
                                className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center gap-2 text-slate-500 font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Thêm địa chỉ mới
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
