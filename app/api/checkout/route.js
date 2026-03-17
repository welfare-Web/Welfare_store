import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // 1. Get the cart items from the frontend request
    const { items } = await request.json();

    // 2. Format the items for Stripe
    // Stripe requires amounts to be in cents (e.g., $5.00 is 500)
    const formattedLineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          // Check if the image is a public URL. If not (like localhost), use a public placeholder so Stripe doesn't break.
          images: [
            item.image.startsWith('http') 
              ? item.image 
              : 'https://i.pinimg.com/1200x/88/70/62/88706259df3e417954d4af2574d9184b.jpg'
          ], 
        },
        unit_amount: Math.round(item.price * 100), 
      },
      quantity: item.quantity,
    }));

    // 3. Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Add 'alipay', 'paypal' etc if needed
      line_items: formattedLineItems,
      mode: 'payment',
      // Where Stripe sends the user after payment success or cancel
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    // 4. Return the Stripe URL to the frontend
    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}