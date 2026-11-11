import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  CheckCircle2,
  Coins,
  Copy,
  CreditCard,
  KeyRound,
  Lock,
  Minus,
  Plus,
  QrCode,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { PRODUCTS, TV_PLATFORMS, type TvPlatform } from '../data/products';
import { formatPrice } from '../data/regions';
import { type CompletedOrder, useStore } from '../context/StoreContext';
import { useSeoMeta } from '../utils/useSeoMeta';

type PaymentTab = 'paypal' | 'crypto';

interface CryptoAsset {
  id: string;
  name: string;
  network: string;
  symbol: string;
  usdPrice: number;
  address: string;
}

const CRYPTO_ASSETS: CryptoAsset[] = [
  {
    id: 'usdt-trc20',
    name: 'Tether USD',
    network: 'TRC-20 (Low Fee)',
    symbol: 'USDT',
    usdPrice: 1,
    address: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
  },
  {
    id: 'usdc-base',
    name: 'USD Coin',
    network: 'Base / Polygon',
    symbol: 'USDC',
    usdPrice: 1,
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    network: 'Bitcoin Mainnet',
    symbol: 'BTC',
    usdPrice: 92000,
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    network: 'ERC-20',
    symbol: 'ETH',
    usdPrice: 3250,
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  },
];

function generateLicenseKey(platform: TvPlatform): string {
  const tag = platform.includes('Tizen')
    ? 'TZN'
    : platform.includes('webOS')
      ? 'WOS'
      : platform.includes('Apple')
        ? 'ATV'
        : 'GTV';
  const rand = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CIAF-${tag}-${rand()}-${rand()}`;
}

export const CheckoutPage: React.FC = () => {
  const {
    region,
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    cartSubtotalUSD,
    recordOrder,
  } = useStore();

  const [email, setEmail] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [promoMsg, setPromoMsg] = useState<string | null>(null);
  const [paymentTab, setPaymentTab] = useState<PaymentTab>('paypal');
  const [selectedCryptoId, setSelectedCryptoId] = useState('usdt-trc20');
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(900);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useSeoMeta({
    title: 'Checkout — PayPal & Crypto Digital License Delivery | CIAF Tech',
    description:
      'Complete your CIAF Player + Built-In VPN Smart TV software license order using PayPal or Cryptocurrency (USDT, USDC, BTC, ETH).',
  });

  useEffect(() => {
    if (paymentTab !== 'crypto' || completedOrder) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [paymentTab, completedOrder]);

  const discountUSD = cartSubtotalUSD * discountRate;
  const totalUSD = Math.max(0, cartSubtotalUSD - discountUSD);
  const selectedCrypto =
    CRYPTO_ASSETS.find((c) => c.id === selectedCryptoId) || CRYPTO_ASSETS[0];
  const cryptoAmount =
    selectedCrypto.usdPrice === 1
      ? totalUSD.toFixed(2)
      : (totalUSD / selectedCrypto.usdPrice).toFixed(6);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'CIAF10') {
      setDiscountRate(0.1);
      setPromoMsg('CIAF10 applied: 10% software discount active.');
    } else {
      setDiscountRate(0);
      setPromoMsg('Invalid code. Try CIAF10 for 10% off.');
    }
  };

  const copyCryptoAddress = async () => {
    try {
      await navigator.clipboard.writeText(selectedCrypto.address);
      setCopiedAddr(true);
      setTimeout(() => setCopiedAddr(false), 1800);
    } catch {
      setCopiedAddr(true);
    }
  };

  const finalizeOrder = (method: 'PayPal' | 'Crypto', detail: string) => {
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address for instant license key delivery.');
      return;
    }
    if (cart.length === 0) {
      setFormError('Your cart is empty. Add a Smart TV license first.');
      return;
    }

    setFormError(null);
    setIsProcessing(true);

    setTimeout(() => {
      const generatedKeys = cart.flatMap((item) => {
        const totalKeysForItem = item.quantity * item.product.deviceLimit;
        return Array.from({ length: totalKeysForItem }, () => ({
          key: generateLicenseKey(item.platform),
          productName: item.product.name,
          platform: item.platform,
          macAddress: item.macAddress || 'Pending pairing in /activate',
        }));
      });

      const order: CompletedOrder = {
        orderId: `CIAF-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toLocaleString(),
        email: email.trim(),
        region: region.code,
        paymentMethod: method,
        paymentDetail: detail,
        totalFormatted: formatPrice(totalUSD, region),
        licenseKeys: generatedKeys,
      };

      recordOrder(order);
      clearCart();
      setIsProcessing(false);
      setCompletedOrder(order);
    }, 650);
  };

  if (completedOrder) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-6 rounded-3xl border border-emerald-200 bg-white p-8 shadow-xl shadow-slate-900/5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Payment Confirmed • {completedOrder.paymentMethod}
              </p>
              <h1 className="font-display text-2xl font-bold text-slate-900">
                License + Built-In VPN Keys Ready ({completedOrder.orderId})
              </h1>
            </div>
          </div>

          <p className="text-sm text-slate-600">
            A copy of your receipt ({completedOrder.totalFormatted}) and activation keys has been prepared for{' '}
            <strong className="text-slate-900">{completedOrder.email}</strong>.
          </p>

          <div className="space-y-3">
            {completedOrder.licenseKeys.map((entry) => (
              <div
                key={entry.key}
                className="flex flex-col justify-between gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">{entry.productName}</p>
                  <p className="text-[11px] text-slate-500">
                    {entry.platform} • MAC: {entry.macAddress}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-sky-100 px-3 py-1.5 font-mono text-xs font-bold text-sky-800">
                  <KeyRound className="h-3.5 w-3.5" />
                  {entry.key}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/activate"
              className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:from-sky-400 hover:to-indigo-500"
            >
              Pair TV &amp; Enable VPN →
            </Link>
            <Link
              to="/blog"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              Read Best Player Settings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
            Instant Digital Delivery + Built-In VPN
          </p>
          <h1 className="font-display text-3xl font-bold text-slate-900">
            CIAF Player License Checkout
          </h1>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Region: {region.flag} {region.label} ({region.currency})
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-md">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Your checkout cart is empty
          </h2>
          <p className="text-sm text-slate-600">
            Select one of our Smart TV player + built-in VPN licenses below to continue with PayPal or Crypto.
          </p>
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {PRODUCTS.slice(0, 2).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => addToCart(p)}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left hover:border-sky-400 hover:bg-sky-50/40"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.billingLabel}</p>
                </div>
                <span className="font-display text-base font-bold text-sky-700">
                  {formatPrice(p.priceUSD, region)}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* Left Column: Cart Items + Customer Email */}
          <div className="space-y-6">
            <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
              <h2 className="font-display text-lg font-bold text-slate-900">
                1. Device Licenses &amp; TV Configuration
              </h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-base font-bold text-slate-900">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {item.product.deviceLimit}{' '}
                          {item.product.deviceLimit === 1 ? 'TV Activation' : 'TV Activations'} +
                          Built-In VPN
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-base font-bold text-slate-900">
                          {formatPrice(item.product.priceUSD * item.quantity, region)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label="Remove item"
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                          Quantity
                        </label>
                        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartItem(item.product.id, { quantity: item.quantity - 1 })
                            }
                            className="p-2 text-slate-600 hover:text-slate-900"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartItem(item.product.id, { quantity: item.quantity + 1 })
                            }
                            className="p-2 text-slate-600 hover:text-slate-900"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                          Smart TV Platform
                        </label>
                        <select
                          value={item.platform}
                          onChange={(e) =>
                            updateCartItem(item.product.id, {
                              platform: e.target.value as TvPlatform,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-900 focus:border-sky-500 focus:outline-none"
                        >
                          {TV_PLATFORMS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                          TV MAC / ID (Optional)
                        </label>
                        <input
                          type="text"
                          value={item.macAddress}
                          onChange={(e) =>
                            updateCartItem(item.product.id, { macAddress: e.target.value })
                          }
                          placeholder="A4:5E:60:..."
                          className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email & Promo */}
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
              <h2 className="font-display text-lg font-bold text-slate-900">
                2. Delivery Email &amp; Promo Code
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Billing &amp; License Delivery Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Promo Code (Try: CIAF10)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="CIAF10"
                      className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs text-slate-900 uppercase placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={applyPromo}
                      className="rounded-xl border border-slate-200 bg-slate-100 px-4 text-xs font-bold text-slate-800 hover:bg-slate-200"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMsg && <p className="mt-1.5 text-[11px] font-semibold text-sky-700">{promoMsg}</p>}
                </div>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 pt-4 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotalUSD, region)}</span>
                </div>
                {discountRate > 0 && (
                  <div className="flex justify-between font-semibold text-emerald-700">
                    <span>Discount (10%)</span>
                    <span>-{formatPrice(discountUSD, region)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1 font-display text-lg font-bold text-slate-900">
                  <span>Total Due</span>
                  <span>
                    {formatPrice(totalUSD, region)} ({region.currency})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: PayPal & Crypto Payment Panel */}
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
            <h2 className="font-display text-lg font-bold text-slate-900">
              3. Choose Payment Method
            </h2>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5">
              <button
                type="button"
                onClick={() => setPaymentTab('paypal')}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
                  paymentTab === 'paypal'
                    ? 'bg-[#0070ba] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <CreditCard className="h-4 w-4" />
                PayPal / Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentTab('crypto')}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
                  paymentTab === 'crypto'
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Coins className="h-4 w-4" />
                Crypto (USDT / BTC)
              </button>
            </div>

            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-800">
                {formError}
              </div>
            )}

            {paymentTab === 'paypal' ? (
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">PayPal Express Checkout</span>
                  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-800">
                    Buyer Protected
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  Pay securely in <strong className="text-slate-900">{region.currency}</strong> via PayPal balance, Visa, Mastercard, or Apple Pay. Statement descriptor:{' '}
                  <span className="font-mono font-semibold text-slate-800">CIAF TECH SOFTWARE</span>.
                </p>

                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600">
                  <p className="font-bold text-slate-900">Itemized License Description:</p>
                  <p className="mt-1">
                    CIAF Player Smart TV Media Player + Integrated VPN License Key(s) — Software Only.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => finalizeOrder('PayPal', 'PayPal Express / Card Capture')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0070ba] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#005ea6] disabled:opacity-60"
                >
                  <Lock className="h-4 w-4" />
                  {isProcessing
                    ? 'Authorizing PayPal Checkout...'
                    : `Pay ${formatPrice(totalUSD, region)} with PayPal`}
                </button>

                <p className="text-center text-[11px] text-slate-500">
                  Interactive storefront preview. Connect your live{' '}
                  <code className="text-slate-700">VITE_PAYPAL_CLIENT_ID</code> for production capture.
                </p>
              </div>
            ) : (
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Cryptocurrency Checkout</span>
                  <span className="font-mono text-xs font-bold text-amber-700">
                    Rate locked: {minutes}:{secs}
                  </span>
                </div>

                {/* Network / Coin Selector */}
                <div className="grid grid-cols-2 gap-2">
                  {CRYPTO_ASSETS.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => setSelectedCryptoId(asset.id)}
                      className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                        selectedCryptoId === asset.id
                          ? 'border-sky-500 bg-sky-50 text-slate-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <p className="font-bold">{asset.symbol}</p>
                      <p className="text-[10px] text-slate-500">{asset.network}</p>
                    </button>
                  ))}
                </div>

                {/* Amount + QR Visual */}
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-900">
                    <QrCode className="h-20 w-20" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="text-[11px] font-medium text-slate-500">Send exact amount:</p>
                    <p className="font-mono text-lg font-bold text-sky-700">
                      {cryptoAmount} {selectedCrypto.symbol}
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="truncate rounded-lg bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-800">
                        {selectedCrypto.address}
                      </code>
                      <button
                        type="button"
                        onClick={copyCryptoAddress}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-slate-800"
                      >
                        {copiedAddr ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                    Optional Transaction Hash (TxID)
                  </label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="Paste TxID after sending (optional in preview)"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() =>
                    finalizeOrder(
                      'Crypto',
                      `${cryptoAmount} ${selectedCrypto.symbol} (${selectedCrypto.network})`,
                    )
                  }
                  className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-md transition hover:from-sky-400 hover:to-indigo-500 disabled:opacity-60"
                >
                  {isProcessing
                    ? 'Verifying Blockchain Confirmation...'
                    : `Confirm ${selectedCrypto.symbol} Payment & Issue Keys`}
                </button>

                <p className="text-center text-[11px] text-slate-500">
                  Ready to hook up Cryptomus / NOWPayments webhook for automated on-chain confirmation.
                </p>
              </div>
            )}

            <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-[11px] text-slate-600">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              <span>
                Purchase includes CIAF Player + Built-In VPN software license key(s) only. No TV channels or copyrighted media streams are provided.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
