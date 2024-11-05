'use client'

import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function Subscribe() {
    const handleCheckout = async (priceId: string) => {

        try {
            const { data } = await axios.post(`/api/payments/create-checkout-session`,
                {  priceId: priceId });

            if (data.sessionId) {
                const stripe = await stripePromise;

                return await stripe?.redirectToCheckout({
                    sessionId: data.sessionId,
                })
            } else {
                console.error('Failed to create checkout session');
                return
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            return
        }
    };

    return (
        <button onClick={async () => {
            await handleCheckout("price_1QHf72AZgYO9iSFpifAUsx6G")
        }}>Buy now!</button>
    )
}