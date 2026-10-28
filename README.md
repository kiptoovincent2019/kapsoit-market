# Kapsoit MARKET demo storefront

A mobile-first static shop website for Kenyan customers, including customers in nearby villages and rural communities. It uses an editable sample catalogue for groceries, cereals, and animal feeds, KSh prices, a basket saved in the browser, and a WhatsApp order handoff.

## MVP included

- Browse and search everyday products; filter by category.
- Browse animal feeds alongside household groceries and cereals.
- Add products to a basket, change quantities, and see the items subtotal.
- Enter a name, phone number, and delivery location, then prepare an order message for WhatsApp.
- Advertise delivery from KSh 50 while confirming the actual fee with the customer.
- Explain that payment and delivery integrations are not live.

## Preview

Open `index.html` in a browser. No build step or package installation is required. The storefront is static and can be hosted on any static web host.

## Customize for a shop

1. In `index.html`, change “Kapsoit MARKET”, the service area, delivery copy, and demo disclaimer.
2. In `app.js`, replace `SHOP_WHATSAPP` with the shop's WhatsApp number in international digits (Kenya: `2547...`, with no `+` or spaces).
3. Edit the `products` list in `app.js`; each item has an `id`, `name`, `detail`, `price`, `category`, `emoji`, `tone`, and optional `badge`. Chicken feed is KSh 40/kg and rice is KSh 130/kg; cow feed (KSh 55/kg) and beans (KSh 180/kg) are clearly marked sample prices because the shop's prices were not provided.
4. Confirm actual stock, prices, delivery areas, fees, payment methods, and business contact details with the shop owner.
5. Before taking real orders, replace the demo wording and agree how the shop will confirm orders, delivery, and payment. No payment gateway, inventory service, order database, or dispatch system is connected in this MVP.

## Files

- `index.html` — page content and ordering form.
- `styles.css` — visual design and responsive layouts.
- `app.js` — catalogue, basket, and WhatsApp message generation.
