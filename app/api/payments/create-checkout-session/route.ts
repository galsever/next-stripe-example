import { NextRequest, NextResponse } from "next/server";
import {stripe} from "@/stripe";

export async function POST(req: NextRequest) {
    const { priceId } = await req.json();

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: "subscription",
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            allow_promotion_codes: true,
        });


        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json({ error: "Failed to create checkout session" });
    }
}