import {
    ThirdwebProvider,
    ConnectWallet,
    metamaskWallet,
    coinbaseWallet,
    walletConnect,
    safeWallet,
    localWallet,
    embeddedWallet,
    trustWallet,
    rainbowWallet,
    phantomWallet,
    lightTheme,
  } from "@thirdweb-dev/react";
  
  export default function App() {
    return (
      <ThirdwebProvider
        activeChain="mumbai"
        clientId="YOUR_CLIENT_ID"
        locale={en()}
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet({ recommended: true }),
          walletConnect(),
          safeWallet({
            personalWallets: [
              metamaskWallet(),
              coinbaseWallet({ recommended: true }),
              walletConnect(),
              localWallet(),
              embeddedWallet({
                auth: {
                  options: [
                    "email",
                    "google",
                    "apple",
                    "facebook",
                  ],
                },
              }),
              trustWallet(),
              rainbowWallet(),
              phantomWallet(),
            ],
          }),
          localWallet(),
          embeddedWallet({
            auth: {
              options: [
                "email",
                "google",
                "apple",
                "facebook",
              ],
            },
          }),
          trustWallet(),
          rainbowWallet(),
          phantomWallet(),
        ]}
        authConfig={{
          authUrl: "/api/auth",
          domain: "https://example.com",
        }}
      >
        <ConnectWallet
          theme={lightTheme({
            colors: {
              accentText: "#000000",
              accentButtonBg: "#080808",
              primaryButtonBg: "#050505",
            },
          })}
          modalTitle={"Conenct your wallet"}
          auth={{ loginOptional: false }}
          switchToActiveChain={true}
          modalSize={"wide"}
          welcomeScreen={{
            img: {
              src: "https://raw.githubusercontent.com/Nexis-Network/Nexis-Brand-Kit/7c5d9dc3e7bea64757debab79faac32dbc2da4aa/NEXIS-Full-Dark.svg",
              width: 150,
              height: 150,
            },
            title: "Innovation without limitation",
          }}
          modalTitleIconUrl={
            "https://raw.githubusercontent.com/Nexis-Network/Nexis-Brand-Kit/adf180dc48d42b1f16baff3ca088b99af0a0e586/Mask%20group.svg"
          }
        />
      </ThirdwebProvider>
    );
  }
  
  