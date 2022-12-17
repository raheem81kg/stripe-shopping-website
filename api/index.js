const express = require("express");
var cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const createCheckoutSessionLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 15, // Limit each IP to 15 requests per windowMs
    message: "Too many requests, please try again later",
});

const HOST = process.env.REACT_APP_HOST || 3000;

app.post("/api/checkout", createCheckoutSessionLimiter, async (req, res) => {
    console.log(req.body);
    const { items, email } = req.body;

    try {
        const transformedItems = items.map((item) => ({
            price: item.stripe_id,
            quantity: item.quantity,
            adjustable_quantity: {
                enabled: true,
            },
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["GB", "US", "CA", "JM", "AE"],
            },
            line_items: transformedItems,
            mode: "payment",
            shipping_options: [{ shipping_rate: "shr_1MBWxqJNYo4YcWw07wW8hchF" }],
            success_url: `${HOST}/success`,
            cancel_url: `${HOST}/catalog`,
            metadata: {
                email,
            },
        });
        res.status(200).json({ url: session.url });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
