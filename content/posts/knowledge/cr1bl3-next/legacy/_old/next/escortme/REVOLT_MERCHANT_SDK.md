# Revolt Merchant SDK Integration

## Overview

Complete Revolt Merchant SDK integration with mock data for development and testing until production deployment.

**Status:** ✅ Ready for sandbox testing | 🟡 Mock mode (development)

## Features

### 💳 Payment Management
- Create payments with automatic status progression
- Support for multiple currencies (default: EUR)
- Payment refunds with validation
- Auto-capture in mock mode (500ms + 300ms simulated processing)

### 👥 Customer Management
- Pre-loaded mock customers (3 test accounts)
- Create new customers with address data
- Query customers by ID
- List all customers

### 📄 Invoice Management
- Create invoices from templates
- Line items with quantity and unit price
- Invoice status tracking (draft → sent → paid)
- Send invoices to customers
- Due date calculation

### 🛒 Checkout Sessions
- Create secure checkout sessions
- 1-hour session expiration
- Mock checkout widget initialization
- Return/cancel URL configuration

### 🔐 Security
- Environment-based configuration
- Mock token detection (development)
- Graceful fallback for sandbox mode

## Installation

### 1. Install Dependencies

```bash
npm install @revolut/checkout
```

The package is already included in `package.json`.

### 2. Configure Environment

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

For **development**, leave the defaults:
```env
VITE_REVOLT_ENV=sandbox
VITE_REVOLT_PUBLIC_TOKEN=pk_test_xxxxxxxxxxxxxx
VITE_REVOLT_MERCHANT_ID=merchant_test_123456
```

For **production**, add real Revolt credentials:
```env
VITE_REVOLT_ENV=production
VITE_REVOLT_PUBLIC_TOKEN=pk_live_your_real_token
VITE_REVOLT_MERCHANT_ID=merchant_your_real_id
```

### 3. Import the Service

```typescript
import { revoltMerchantService } from '@/services/RevoltMerchantService'
import { revoltConfig } from '@/config/revolt'
```

## Usage Examples

### Create a Payment

```typescript
const payment = await revoltMerchantService.createPayment(
  'ord_12345',      // orderId
  15000,            // amount in cents (€150.00)
  'Monthly subscription'
)

// Payment flow:
// 1. pending (created)
// 2. authorized (500ms delay)
// 3. captured (300ms delay) ✅
```

### Create an Invoice

```typescript
const invoice = await revoltMerchantService.createInvoice(
  'cust_mock_001',  // customerId
  [
    {
      description: 'Professional Plan Monthly',
      quantity: 1,
      unitPrice: 15000,
      amount: 15000
    }
  ],
  new Date('2026-07-15')  // dueDate
)

// Send it
await revoltMerchantService.sendInvoice(invoice.id)
```

### Create Checkout Session

```typescript
const session = await revoltMerchantService.createCheckoutSession(
  'ord_12345',
  15000,
  'https://your-site.com/success',  // returnUrl
  'https://your-site.com/cancel'    // cancelUrl
)

// Initialize widget
await revoltMerchantService.initializeCheckout('checkout-container', session.id)
```

### Process a Refund

```typescript
const refunded = await revoltMerchantService.refundPayment(
  'pay_mock_001'    // paymentId
)
```

## Mock Data

### Pre-loaded Customers

| ID | Name | City | Country |
|---|---|---|---|
| `cust_mock_001` | Alice Johnson | London | GB |
| `cust_mock_002` | Bob Smith | Manchester | GB |
| `cust_mock_003` | Carol White | Paris | FR |

### Pre-loaded Payments

| ID | Amount | Status | Description |
|---|---|---|---|
| `pay_mock_001` | €150.00 | captured | Monthly subscription |
| `pay_mock_002` | €250.00 | authorized | Annual plan upgrade |
| `pay_mock_003` | €50.00 | refunded | Service cancellation |

### Pre-loaded Invoices

| ID | Customer | Amount | Status |
|---|---|---|---|
| `inv_mock_001` | Alice Johnson | €150.00 | paid |
| `inv_mock_002` | Bob Smith | €250.00 | sent |

## API Reference

### RevoltMerchantService

#### Payments
- `createPayment(orderId, amount, description, currency?): Promise<RevoltPayment>`
- `getPayment(paymentId): Promise<RevoltPayment | null>`
- `getPayments(): Promise<RevoltPayment[]>`
- `refundPayment(paymentId, amount?): Promise<RevoltPayment>`

#### Invoices
- `createInvoice(customerId, items, dueDate): Promise<RevoltInvoice>`
- `getInvoice(invoiceId): Promise<RevoltInvoice | null>`
- `getInvoices(customerId?): Promise<RevoltInvoice[]>`
- `sendInvoice(invoiceId): Promise<RevoltInvoice>`

#### Customers
- `createCustomer(name, email, phone?, address?): Promise<RevoltCustomer>`
- `getCustomer(customerId): Promise<RevoltCustomer | null>`
- `getCustomers(): Promise<RevoltCustomer[]>`

#### Checkout
- `createCheckoutSession(orderId, amount, returnUrl, cancelUrl): Promise<RevoltCheckoutSession>`
- `initializeCheckout(containerId, sessionId): Promise<void>`

#### Configuration
- `getConfig(): { configured: boolean; config: RevoltMerchantConfig }`

## Data Types

### RevoltPayment
```typescript
{
  id: string                          // Unique payment ID
  orderId: string                     // Associated order
  amount: number                      // Amount in cents
  currency: string                    // Currency code (EUR)
  status: 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded'
  description: string
  createdAt: Date
  capturedAt?: Date
  refundedAt?: Date
}
```

### RevoltInvoice
```typescript
{
  id: string
  invoiceNumber: string               // Human-readable ID
  customerId: string
  amount: number                      // Total amount in cents
  currency: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  dueDate: Date
  createdAt: Date
  paidAt?: Date
  items: RevoltLineItem[]
}
```

### RevoltCustomer
```typescript
{
  id: string
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  createdAt: Date
}
```

### RevoltCheckoutSession
```typescript
{
  id: string
  status: 'pending' | 'completed' | 'expired' | 'failed'
  checkoutUrl: string
  returnUrl: string
  cancelUrl: string
  createdAt: Date
  expiresAt: Date
}
```

## Demo Component

View the full demo at `src/components/RevoltMerchantDemo.vue`

### Features
- 🎯 Multi-tab interface (Customers, Payments, Invoices, Checkout)
- 🧪 Create and test all operations
- 📊 Real-time data display
- ✅ Mock data pre-loaded
- 🔐 Configuration status indicator
- ⚡ Loading states and error handling

### Usage
```vue
<template>
  <RevoltMerchantDemo />
</template>

<script setup>
import RevoltMerchantDemo from '@/components/RevoltMerchantDemo.vue'
</script>
```

## Development vs Production

### Development (Sandbox)
```
✅ Mock data always available
✅ Instant payment processing
✅ No real charges
✅ Simulated async delays
✅ LocalStorage fallback
```

### Production
```
🔴 Real Revolt API integration
🔴 Live payment processing
🔴 Real customer data
🔴 Production merchant account required
🔴 Database persistence required
```

## Transition to Production

1. **Get Production Credentials**
   - Register at [Revolt Developer Portal](https://developer.revolut.com)
   - Create merchant account
   - Generate API tokens

2. **Update Environment**
   ```env
   VITE_REVOLT_ENV=production
   VITE_REVOLT_PUBLIC_TOKEN=pk_live_xxxxx
   VITE_REVOLT_MERCHANT_ID=merchant_xxxxx
   ```

3. **Replace Mock Service**
   - Implement real API calls in `RevoltMerchantService`
   - Remove mock data initialization
   - Add database persistence
   - Implement webhooks for payment notifications

4. **Testing**
   - Use Revolt's test cards
   - Verify all payment flows
   - Test error scenarios
   - Validate refund process

## Logging

All mock operations log to console with `[Mock]` prefix:

```javascript
[Mock] Payment created: pay_mock_1234567890
[Mock] Checkout session created: session_mock_1234567890
[Mock] Invoice sent: inv_mock_1234567890
```

## Configuration Check

Get current configuration status:

```typescript
const { configured, config } = revoltMerchantService.getConfig()

if (configured) {
  console.log('✅ Production mode')
} else {
  console.log('🟡 Sandbox mode (mock data)')
}
```

## Error Handling

All methods use TypeScript error handling:

```typescript
try {
  const payment = await revoltMerchantService.createPayment(...)
} catch (error) {
  console.error('Payment failed:', error.message)
}
```

## Support

- 📖 [Revolt Developer Docs](https://developer.revolut.com/docs/sdks/merchant-web-sdk/introduction)
- 🔗 [Checkout SDK Reference](https://developer.revolut.com/docs/sdks/merchant-web-sdk/)
- 💬 [GitHub Issues](https://github.com/your-repo/issues)

---

**Status:** ✅ Development Complete | 🟡 Mock Data Enabled | 📋 Ready for Production Migration
