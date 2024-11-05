# next-stripe-example

This is an extremely simple Example on how to integrate [Stripe](https://stripe.com/) into your Next.js app

To use this repo:
````shell
git clone https://github.com/galsever/next-stripe-example.git
````
````shell
bun i
````
````shell
copy .env.example .env.local
````
````shell
bun dev
````

What files are related to stripe:
- api/payments/create-checkout-session/route.ts
- api/payments/webhook/route.ts
- components/subscribe.tsx