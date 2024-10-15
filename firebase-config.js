const firebaseConfig = {
  type: "service_account",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  privateKeyId: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix newline characters
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  clientId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
  authUri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
  tokenUri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
  authProviderCertUrl: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_CERT_URL,
  clientCertUrl: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CERT_URL,
  universeDomain: process.env.NEXT_PUBLIC_FIREBASE_UNIVERSE_DOMAIN,
};


export default firebaseConfig;
