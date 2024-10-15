import admin from "firebase-admin";
import { NextResponse } from "next/server";

const firebaseConfig = {
  type: "service_account",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  privateKeyId: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCb4Pz8yxwS5On+\nwoAv8CQw+NmyMXBZ02gT7VryoQI9p2or0LkiBkdHnsCjAjmkvkRyihmmg/UlxEee\nWe2EpuXUypFwuEAY76TeqxwLPuCJN+XXFaVqA4DxVzsEyHipCC+Mq/SLfZPVMDj4\nplRkFnS6OyvYJoO/kg84BkRMSLr+jFLfJyvzGxEZ8OGMVhhp3+myNYD2BicPjcpw\nioaPSbQ3PIz346VBo/6uwC6JRJvKXy8Q0+4LIzIR7PB/qb/rozr5bqfcmP9tAZ/F\nq4eVBL/r96/5DBpDpC1goR0IpM+WtUNEWWI9KbNbSWcDFQ/BAttOmeKWZbOsXh3T\nSfV5rwSpAgMBAAECggEASDKgqquegKfTM4K94bY95QrVteGNMqWmzpgAqGFnysuo\ncsvVe8thp2wBuF6W+VWBGXYaZFQ5Lvlm3JK1Xtv4lqMOUyGb2pDgkZu6PQEt+ZBQ\n3dqyR1SBHAc1mEUMEepvL54Tgaoz1ynjMVPEwaje/sTaTV6lZg0ODHpmltiW97+o\nH1HqSIjdjLRceJiEklh08trPsRQ87orqWwEqBndH5JhsCePAqL+wVYzl4p/Yp3/M\nL8IdrZcXyjtjA6yncB4S+PSI5VBiceLU2aZalw/VbSJ6c/f4h476svwA7fFBfRa0\n02/ZgH0GBxcp0Kl4cAuYoj2Q3ifTaVwxAE2oeOICSwKBgQDYO7ZwePrTgKfe0prI\nkrZS9vC5yVR7g0C9eSmlomTeHenBIVh2UIKdBQDBWOu4iqKesebYu01Sag3jzcXy\ncyeC6dDoo5ubgc5bv3ux73CAlcfw9aAZ2Qxk+7x4zToXs0iCHG5j1Roc2XwjWReU\n3woczplnPGVuBPEp/wMhok0rawKBgQC4i8iZA2U5INpieBv+fp8L3Chl+A5K+L8m\nlH9lRzUhXLF0Zji22b/TAnjnmFQJNdK9HX2qn8alzV2syErgyA4OHjPCDJaenFJt\nGKi6sYe+nR5lt9Kz5bugwZLDkEvIv6Sv94YnICnhOFJh2pUkVyUHIdepdOPkZ1ql\n+UlYyy3JOwKBgAlwieVdEq4bBrkOfp1U8kqq5xVlOZ/uuevLl0rYzQh5S9QXjZIU\nr68FIeRO6nNy8eh1obtCafy4DoUsXYDZEBeB95HAWrGuOAD/WfoJluK2JzVYs7WN\nKSJbbv3jD68rL3YmoZcQHYS25dlxMTtZhUp+pmnAVDk6VADeVheoyy+jAoGAcl42\noBVJmwDwNkwnVS3VlT0IUEFNYksL83XeCb76f0V5uCBNj4wc5EFI+oYdtmODya3I\nHoDMVB6UqiqqtOlmRHuVKfIxOfS45GF+18yDyq6GkxU74D9Ea1jrgoUfYjbaci8d\nFYxKSAhmjbwv54iWKvhfNeZ6ASfINsnqGbw5ENcCgYEA1YofCL0Gzu6FbAE4Fdde\n0ZFHNZfbGERvYPDKrfaybh4+U5IxLhLoTAnUpdJpA53Jv8QASGC7QTyuNlcXUyPK\nEZBQgsNrIYy914VfXFgyMwuAT5cCwwKGq+2fc1oUJ3JP7bGDNwpqb5VdxXW0nZ02\n2Sws8Nf80opgyTyRTTNiILw=\n-----END PRIVATE KEY-----\n",
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  clientId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
  authUri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
  tokenUri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
  authProviderCertUrl: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_CERT_URL,
  clientCertUrl: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CERT_URL,
  universeDomain: process.env.NEXT_PUBLIC_FIREBASE_UNIVERSE_DOMAIN,
};

const firebaseConfig = {
  type: "service_account",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  privateKeyId: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  clientId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
  authUri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
  tokenUri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
  authProviderCertUrl: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_CERT_URL,
  clientCertUrl: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CERT_URL,
  universeDomain: process.env.NEXT_PUBLIC_FIREBASE_UNIVERSE_DOMAIN,
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
}

export async function POST(request) {
  const { token, title, message, link } = await request.json();

  const payload = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
