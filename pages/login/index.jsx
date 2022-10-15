import React, { useState, useEffect } from "react";
import { Header } from "../../components/layout/Header";
import Head from "next/head";
import styles from "./Login.module.scss";
import Button  from "@heathmont/moon-core-tw/lib/button/Button";
import GenericCheckRounded  from "@heathmont/moon-icons-tw/lib/icons/GenericCheckRounded";
import GenericClose  from "@heathmont/moon-icons-tw/lib/icons/GenericClose";
import isServer from "../../components/isServer";

let redirecting = "";
export default function Login() {
  const [ConnectStatus, setConnectStatus] = useState(true);

  if (!isServer()) {
    const regex = /\[(.*)\]/g;
    const str = decodeURIComponent(window.location.search);
    let m;

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      redirecting = m[1];
    }
  }



  const fetchDataStatus = async () => {
    if (
      window.ethereum.selectedAddress != null && window.localStorage.getItem("ConnectedMetaMask") == "true"
    ) {
      setConnectStatus(true);
    } else {
      setConnectStatus(false);
    }
  };
  useEffect(() => {
    if (!isServer()) {
      setInterval(() => {
        if (window.ethereum.selectedAddress != null && window.localStorage.getItem("ConnectedMetaMask") == "true") {
          window.location.href = redirecting;
        }
        fetchDataStatus();
      }, 1000);
    }
  }, []);
  if (isServer()) return null;


  async function onClickConnect() {
    let result = await window.ethereum.request({ method: 'eth_requestAccounts' });
    result;
    try {
        const getacc = await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaef3', }], //44787
        });
        getacc;
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0xaef3', //44787
                            chainName: 'Alfajores Celo Testnet',
                            nativeCurrency: {
                                name: 'CELO',
                                symbol: 'CELO',
                                decimals: 18,
                            },
                            rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
                        },
                    ],
                });
            } catch (addError) {
                // handle "add" error
                console.log(addError);
            }
        }
        // handle other "switch" errors
    }
    window.localStorage.setItem('ConnectedMetaMask', 'true')
  }
  async function TypeSet(e) {                           //Setting Type (Company/User)
    window.localStorage.setItem('Type', e.target.getAttribute('type'))
    await onClickConnect()
    window.location.href = redirecting
  }

  function CompanyType() {                             //Company Button    
    return (
      <>
        <div type="company" onClick={TypeSet} className={styles.companyButton}>
          <span type="company" >
            Company
          </span>
        </div>
      </>
    )
  }
  function UserType() {                            //User Button  
    return (
      <>
        <div type="user" onClick={TypeSet} className={styles.userButton}>
          <span type="user">
            User
          </span>
        </div>
      </>
    )
    }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="SambaCHECK - Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <div className={`${styles.container} flex items-center flex-col gap-8`}>
        <div className={`${styles.title} gap-8 flex flex-col`}>
          <h1 className="text-moon-32 font-bold">Login to your account</h1>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.Login_container}>
          <CompanyType/>
          <UserType/>
        </div>

      </div>
    </>
  );
}
