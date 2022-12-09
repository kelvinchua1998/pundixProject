import "./App.css";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CardSection from "./components/CardSection";
import CardSectionERC20 from "./components/CardSectionERC20";

const erc20_abi = require("./erc20Contract.json").abi;
const erc721_abi = require("./KELVIN.json").abi;

function App() {
  const [appState, setappState] = useState({
    loading: true,
    metaMaskAddress: "",
    metaMaskBalance: 0,
    erc20: null,
    erc721: null,
  });

  const [loading, setLoading] = useState(true);
  const [metaMaskAddress, setmetaMaskAddress] = useState("");
  const [metaMaskBalance, setmetaMaskBalance] = useState(0);
  const [erc20, seterc20] = useState(null);
  const [erc721, seterc721] = useState(null);

  useEffect(() => {
    async function temp() {
      await loadWeb3();
      await loadBlockChainData();
      setLoading(false);
    }
    temp();
  }, []);

  async function loadBlockChainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setmetaMaskAddress(accounts[0]);

    const ethBalance = await web3.eth.getBalance(
      web3.utils.toChecksumAddress(accounts[0])
    );
    setmetaMaskBalance(ethBalance);

    const erc20Contract = new web3.eth.Contract(
      erc20_abi,
      "0x2A76Ec22A0A2D16794Fb40db51BFF81212ACF4A5"
    );
    seterc20(erc20Contract);
    const erc721Contract = new web3.eth.Contract(
      erc721_abi,
      "0xCCcCFb588b4c7D594CecC7AC80e918122997DB1a"
    );
    seterc721(erc721Contract);
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.eth_requestAccounts;
    } else if (window.web3) {
      window.web3 = new Web3(window.ethereum);
    } else {
      window.alert(
        "Non-Ethereum browser detected. you should consider trying Metamask!"
      );
    }
  }

  return (
    <Container>
      <Navbar account={metaMaskAddress} balance={metaMaskBalance} />
      <div style={{ marginTop: "100px" }}>
        {loading ? (
          <p id=" loader" className="text-center">
            loading
          </p>
        ) : (
          <div>
            <Row>
              <Col>
                <CardSection
                  erc721={erc721}
                  metaMaskAddress={metaMaskAddress}
                />
              </Col>
              <Col>
                <CardSectionERC20
                  erc20={erc20}
                  metaMaskAddress={metaMaskAddress}
                />
              </Col>
            </Row>
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;
