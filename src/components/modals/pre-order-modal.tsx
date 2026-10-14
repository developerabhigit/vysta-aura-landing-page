// src/components/modals/pre-order-modal.tsx
"use client";

import React, { useState } from "react";
import {
    X,
    Sparkles,
    Check,
    ShieldCheck,
    Truck,
    ArrowRight,
    ArrowLeft,
    MessageCircle,
    Clock,
} from "lucide-react";
import { usePreOrderModal } from "@/context/pre-order-modal-context";
import {
    preOrderModalContent,
    pricingContent,
    type PricingVariant,
} from "@/data/landing-content";
import { trackEvent } from "@/lib/analytics";

export function PreOrderModal() {
    const { isOpen, closeModal, selectedVariant, setSelectedVariant } =
        usePreOrderModal();

    // 1. Multi-Step State (1: Sizing -> 2: Delivery -> 3: VIP Confirmation)
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // 2. Sizing Selection State
    const [sizingMode, setSizingMode] = useState<"sizing-kit" | "manual-size">(
        "sizing-kit"
    );
    const [manualSize, setManualSize] = useState<number>(9);

    // 3. Lead Form State
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        pincode: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reservationCode, setReservationCode] = useState("");

    if (!isOpen) return null;

    // Reset & Close
    const handleModalClose = () => {
        closeModal();
        if (step === 3) {
            setStep(1);
        }
    };

    // Step 1 Validation -> Proceed to Step 2
    const handleProceedToDelivery = () => {
        trackEvent("proceed_to_delivery", {
            variant: selectedVariant.name,
            sizingMode,
            size: sizingMode === "manual-size" ? manualSize : "Sizing Kit",
        });
        setStep(2);
    };

    // Step 2 Form Validation & Submission -> Step 3
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
        const phoneClean = formData.phone.replace(/\D/g, "");
        if (!phoneClean || phoneClean.length < 10) {
            newErrors.phone = "Enter a valid 10-digit mobile number";
        }
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.pincode.trim() || formData.pincode.length < 6) {
            newErrors.pincode = "Enter 6-digit pincode";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        // Simulate batch allocation reservation
        setTimeout(() => {
            const randomId = Math.floor(1000 + Math.random() * 9000);
            const code = `${preOrderModalContent.success.orderPrefix}${randomId}`;
            setReservationCode(code);
            setIsSubmitting(false);
            setStep(3);

            trackEvent("pre_order_confirmed", {
                reservation_code: code,
                variant: selectedVariant.name,
                sizing_mode: sizingMode,
                price: pricingContent.discountedPrice,
            });
        }, 800);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        >
            {/* 1. Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={handleModalClose}
            />

            {/* 2. Main Modal Box */}
            <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-zinc-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
                {/* Top Urgency Bar */}
                <div className="bg-zinc-950 px-4 py-2.5 text-white flex items-center justify-between text-xs font-semibold shrink-0">
                    <div className="flex items-center gap-1.5 text-amber-400">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span className="text-zinc-100">{preOrderModalContent.badge}</span>
                    </div>
                    <span className="text-zinc-400 text-[11px] flex items-center gap-1">
                        <Clock className="h-3 w-3 text-amber-400" />
                        {preOrderModalContent.urgencyText}
                    </span>
                </div>

                {/* Modal Header */}
                <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-zinc-100 flex items-start justify-between shrink-0">
                    <div>
                        <h3 className="text-lg sm:text-xl font-black text-zinc-950">
                            {preOrderModalContent.title}
                        </h3>
                        <p className="text-xs text-zinc-600 mt-0.5">
                            {preOrderModalContent.subtitle}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleModalClose}
                        className="p-1 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* 3-Step Indicator Bar */}
                <div className="bg-zinc-50 px-5 sm:px-6 py-2 border-b border-zinc-100 flex items-center justify-between text-xs font-semibold shrink-0">
                    <span
                        className={step >= 1 ? "text-zinc-950 font-bold" : "text-zinc-400"}
                    >
                        {preOrderModalContent.steps.step1}
                    </span>
                    <span className="text-zinc-300">───</span>
                    <span
                        className={step >= 2 ? "text-zinc-950 font-bold" : "text-zinc-400"}
                    >
                        {preOrderModalContent.steps.step2}
                    </span>
                    <span className="text-zinc-300">───</span>
                    <span
                        className={step === 3 ? "text-zinc-950 font-bold" : "text-zinc-400"}
                    >
                        {preOrderModalContent.steps.step3}
                    </span>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
                    {/* ======================================================== */}
                    {/* SCREEN 1: FINISH & SIZE SELECTION                         */}
                    {/* ======================================================== */}
                    {step === 1 && (
                        <div className="space-y-5">
                            {/* Finish Selector */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                                    Select Aerospace Titanium Finish
                                </label>
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    {pricingContent.variants.map((v: PricingVariant) => {
                                        const isSelected = selectedVariant.id === v.id;
                                        return (
                                            <button
                                                key={v.id}
                                                type="button"
                                                onClick={() => setSelectedVariant(v)}
                                                className={`relative flex flex-col items-center p-3 rounded-2xl border text-center transition-all ${isSelected
                                                        ? "border-zinc-950 bg-zinc-950 text-white shadow-md"
                                                        : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
                                                    }`}
                                            >
                                                {v.badge && (
                                                    <span className="absolute -top-2 px-1.5 py-0.5 rounded-full bg-amber-400 text-zinc-950 text-[9px] font-black uppercase">
                                                        {v.badge}
                                                    </span>
                                                )}
                                                <span
                                                    className="h-6 w-6 rounded-full border border-white/20 shadow-inner mb-2"
                                                    style={{ backgroundColor: v.colorHex }}
                                                />
                                                <span className="text-xs font-bold leading-tight">
                                                    {v.name}
                                                </span>
                                                <span
                                                    className={`text-[10px] mt-0.5 ${isSelected ? "text-zinc-300" : "text-zinc-500"
                                                        }`}
                                                >
                                                    {v.colorName}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Sizing Strategy Choice */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                                    Ring Sizing Strategy
                                </label>
                                <div className="space-y-2.5">
                                    {/* Option A: Sizing Kit (Recommended) */}
                                    <label
                                        className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${sizingMode === "sizing-kit"
                                                ? "border-zinc-950 bg-zinc-50 ring-1 ring-zinc-950"
                                                : "border-zinc-200 hover:border-zinc-300"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="sizing"
                                            checked={sizingMode === "sizing-kit"}
                                            onChange={() => setSizingMode("sizing-kit")}
                                            className="mt-1 h-4 w-4 accent-zinc-950"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-zinc-950">
                                                    {preOrderModalContent.sizing.sendSizingKit.title}
                                                </span>
                                                <span className="rounded-full bg-amber-100 text-amber-900 px-2 py-0.5 text-[10px] font-bold">
                                                    Recommended
                                                </span>
                                            </div>
                                            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                                                {preOrderModalContent.sizing.sendSizingKit.subtitle}
                                            </p>
                                        </div>
                                    </label>

                                    {/* Option B: Manual US Size */}
                                    <label
                                        className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${sizingMode === "manual-size"
                                                ? "border-zinc-950 bg-zinc-50 ring-1 ring-zinc-950"
                                                : "border-zinc-200 hover:border-zinc-300"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="sizing"
                                            checked={sizingMode === "manual-size"}
                                            onChange={() => setSizingMode("manual-size")}
                                            className="mt-1 h-4 w-4 accent-zinc-950"
                                        />
                                        <div className="flex-1">
                                            <span className="text-sm font-bold text-zinc-950">
                                                {preOrderModalContent.sizing.manualSize.title}
                                            </span>
                                            <p className="text-xs text-zinc-600 mt-0.5">
                                                {preOrderModalContent.sizing.manualSize.subtitle}
                                            </p>

                                            {sizingMode === "manual-size" && (
                                                <div className="mt-3 grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-2 border-t border-zinc-200">
                                                    {preOrderModalContent.sizing.manualSize.sizes.map(
                                                        (s) => (
                                                            <button
                                                                key={s}
                                                                type="button"
                                                                onClick={() => setManualSize(s)}
                                                                className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${manualSize === s
                                                                        ? "bg-zinc-950 text-white border-zinc-950"
                                                                        : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                                                                    }`}
                                                            >
                                                                US {s}
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Price Banner */}
                            <div className="rounded-2xl bg-zinc-100 p-3.5 flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-zinc-500 line-through">
                                        ₹{pricingContent.originalPrice.toLocaleString()}
                                    </span>
                                    <div className="text-lg font-black text-zinc-950">
                                        ₹{pricingContent.discountedPrice.toLocaleString()}
                                        <span className="text-xs font-bold text-emerald-600 ml-2">
                                            Save 40% Today
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                                        ₹0 Due Today
                                    </span>
                                </div>
                            </div>

                            {/* Step 1 Action */}
                            <button
                                type="button"
                                onClick={handleProceedToDelivery}
                                className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99]"
                            >
                                <span>
                                    {preOrderModalContent.buttons.continueToShipping}
                                </span>
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                    {/* ======================================================== */}
                    {/* SCREEN 2: DELIVERY DETAILS (LEAD CAPTURE)                 */}
                    {/* ======================================================== */}
                    {step === 2 && (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 mb-1">
                                    {preOrderModalContent.form.fullNameLabel}
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, fullName: e.target.value })
                                    }
                                    placeholder={preOrderModalContent.form.fullNamePlaceholder}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950"
                                />
                                {errors.fullName && (
                                    <p className="text-[11px] text-red-500 mt-1">
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>

                            {/* Phone / WhatsApp */}
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 mb-1">
                                    {preOrderModalContent.form.phoneLabel}
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-2.5 text-sm font-bold text-zinc-500">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        placeholder="98765 43210"
                                        className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950"
                                    />
                                </div>
                                <p className="text-[10px] text-zinc-500 mt-1">
                                    {preOrderModalContent.form.phoneHelpText}
                                </p>
                                {errors.phone && (
                                    <p className="text-[11px] text-red-500 mt-1">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Delivery Address */}
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 mb-1">
                                    {preOrderModalContent.form.addressLabel}
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                    placeholder={preOrderModalContent.form.addressPlaceholder}
                                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950"
                                />
                                {errors.address && (
                                    <p className="text-[11px] text-red-500 mt-1">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            {/* Pincode & City */}
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 mb-1">
                                    {preOrderModalContent.form.pincodeLabel}
                                </label>
                                <input
                                    type="text"
                                    value={formData.pincode}
                                    onChange={(e) =>
                                        setFormData({ ...formData, pincode: e.target.value })
                                    }
                                    placeholder={preOrderModalContent.form.pincodePlaceholder}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950"
                                />
                                {errors.pincode && (
                                    <p className="text-[11px] text-red-500 mt-1">
                                        {errors.pincode}
                                    </p>
                                )}
                            </div>

                            {/* Summary Perks */}
                            <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-3.5 space-y-2 text-xs text-zinc-700">
                                <div className="flex items-center gap-2 text-zinc-950 font-bold">
                                    <Check className="h-4 w-4 text-emerald-600" />
                                    <span>
                                        {preOrderModalContent.summary.pricingNote}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="h-4 w-4 text-zinc-500" />
                                    <span>
                                        {preOrderModalContent.summary.freeShippingBadge}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-zinc-500" />
                                    <span>{preOrderModalContent.summary.payLaterBadge}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-4 py-3 rounded-2xl border border-zinc-300 text-xs font-bold text-zinc-700 hover:bg-zinc-100 flex items-center gap-1"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    <span>{preOrderModalContent.buttons.back}</span>
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-zinc-950 hover:bg-zinc-800 disabled:opacity-60 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99]"
                                >
                                    {isSubmitting
                                        ? preOrderModalContent.buttons.submitting
                                        : preOrderModalContent.buttons.confirmReservation}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ======================================================== */}
                    {/* SCREEN 3: VIP FOUNDER CONFIRMATION (SUCCESS)              */}
                    {/* ======================================================== */}
                    {step === 3 && (
                        <div className="text-center space-y-5 py-2">
                            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-inner">
                                <Check className="h-8 w-8 stroke-[3]" />
                            </div>

                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                                    {preOrderModalContent.success.badge}
                                </span>
                                <h4 className="text-xl font-black text-zinc-950">
                                    {preOrderModalContent.success.title}
                                </h4>
                                <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
                                    {preOrderModalContent.success.subtitle}
                                </p>
                            </div>

                            {/* Reservation Code Card */}
                            <div className="rounded-2xl bg-zinc-950 text-white p-4 shadow-lg">
                                <span className="text-[11px] text-zinc-400 uppercase font-semibold">
                                    Founder Batch Allocation Code
                                </span>
                                <div className="text-2xl font-mono font-black text-amber-400 mt-1 tracking-wider">
                                    {reservationCode || "VYSTA-AUR-9842"}
                                </div>
                                <div className="text-xs text-zinc-300 mt-2 pt-2 border-t border-zinc-800 flex justify-between">
                                    <span>Finish: {selectedVariant.name}</span>
                                    <span>
                                        Size:{" "}
                                        {sizingMode === "sizing-kit"
                                            ? "Free Sizing Kit"
                                            : `US ${manualSize}`}
                                    </span>
                                </div>
                            </div>

                            {/* Next Steps Timeline */}
                            <div className="text-left rounded-2xl bg-zinc-50 border border-zinc-200 p-4 space-y-2.5">
                                <p className="text-xs font-bold text-zinc-950">
                                    {preOrderModalContent.success.nextStepsTitle}
                                </p>
                                <ul className="space-y-2 text-xs text-zinc-600">
                                    {preOrderModalContent.success.nextSteps.map((stepText, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="h-4 w-4 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                                {i + 1}
                                            </span>
                                            <span>{stepText}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2 pt-1">
                                <a
                                    href="https://chat.whatsapp.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all block text-center"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    <span>
                                        {preOrderModalContent.success.whatsappCtaText}
                                    </span>
                                </a>
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold py-2.5 rounded-2xl text-xs transition-colors"
                                >
                                    {preOrderModalContent.success.closeButtonText}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
