import {NextRequest, NextResponse} from "next/server";
import {stripe} from "@/stripe";

export async function POST(req: NextRequest) {
    const reqText = await req.text();
    return handler(reqText, req);
}



async function handler(
    reqText: string,
    request: NextRequest,
): Promise<NextResponse> {
    const sig = request.headers.get("Stripe-Signature");

    try {
        const event = await stripe.webhooks.constructEventAsync(
            reqText,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        switch (event.type) { // Add more events here
            case "checkout.session.completed":
                // do some stuff here
            default:
                return NextResponse.json({
                    status: 400,
                    error: "Unhandled event type",
                });
        }
    } catch (err) {
        console.error("Error constructing Stripe event:", err);
        return NextResponse.json({
            status: 500,
            error: "Webhook Error: Invalid Signature",
        });
    }
}