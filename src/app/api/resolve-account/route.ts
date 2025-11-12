import axios from "axios";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const accountNumber = searchParams.get("accountNumber");
    const bankCode = searchParams.get("bankCode");

    console.log(process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY);
    

    try {
        const r = await axios.get("https://api.paystack.co/bank/resolve", {
            params: { account_number: accountNumber, bank_code: bankCode },
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`
            }
        });

        return Response.json({
            success: true,
            accountName: r.data.data.account_name
        });
    } catch (error) {
        return Response.json(
            { success: false, accountName: null },
            { status: 400 }
        );
    }
}
