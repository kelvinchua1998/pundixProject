import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import Web3 from "web3";
import { ethers } from "ethers";

export default function CardSection({ erc20, metaMaskAddress }) {
  const erc20Contract = erc20;

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [supply, setSupply] = useState(0);
  const [mintInput, setMintInput] = useState(0);
  const [mintaddressInput, setMintaddressInput] = useState("");
  const [transferRecipientInput, setTransferRecipientInput] = useState("");
  const [transferAmountInput, setTransferAmountInput] = useState(0);
  const [burnInput, setBurnInput] = useState(0);

  useEffect(() => {
    getTotalSupply();
    getName();
    getOwner();
  }, []);

  function getTotalSupply() {
    erc20Contract.methods.totalSupply().call((err, result) => {
      if (err) {
        console.error("Error: ", err);
      }
      setSupply(result);
    });
  }
  function getName() {
    erc20Contract.methods.name().call((err, result) => {
      if (err) {
        console.error("Error: ", err);
      }
      console.log(result);
      setName(result);
    });
  }
  function getOwner() {
    erc20Contract.methods.owner().call((err, result) => {
      if (err) {
        console.error("Error: ", err);
      }
      setOwner(result);
    });
  }

  function mint() {
    if (mintInput < 0) {
      alert("please provide a valid number");
      return;
    }
    if (!Web3.utils.isAddress(mintaddressInput)) {
      alert("please provide a valid address");
      return;
    }

    erc20Contract.methods
      .mint(mintaddressInput, mintInput)
      .send({ from: metaMaskAddress }, (err) => {
        if (err) {
          console.error("Error: ", err);
        }
      })
      .once("receipt", () => {
        getTotalSupply();
      });
  }

  function transfer() {
    if (transferAmountInput < 0) {
      alert("please provide a valid number");
      return;
    }
    if (!Web3.utils.isAddress(transferRecipientInput)) {
      alert("please provide a valid address");
      return;
    }

    erc20Contract.methods
      .transfer(transferRecipientInput, transferAmountInput)
      .send({ from: metaMaskAddress }, (err) => {
        if (err) {
          console.error("Error: ", err);
        }
      })
      .once("receipt", () => {
        getTotalSupply();

        alert("transfer completed!");
      });
  }

  function burn() {
    if (burnInput < 0) {
      alert("please provide a valid number");
      return;
    }
    erc20Contract.methods
      .burn(ethers.BigNumber.from(burnInput))
      .send({ from: metaMaskAddress }, (err) => {
        if (err) {
          console.error("Error: ", err);
        }
      })
      .once("receipt", () => {
        getTotalSupply();
      });
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>ERC721 {name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Total supply: {supply}
          <br></br> Owner: {owner}
        </Card.Subtitle>
        <Card.Text>
          UUPS ERC20. It have a mint, transfer and pause function
        </Card.Text>
        <Row>
          <Col>
            <Form>
              <Form.Control
                type="number"
                placeholder="Amount"
                onChange={(e) => {
                  setMintInput(e.target.value);
                }}
              />
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) => {
                  setMintaddressInput(e.target.value);
                }}
              />
              <Button size="lg" variant="success" onClick={mint}>
                Mint
              </Button>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Control
                type="number"
                placeholder="Amount"
                onChange={(e) => {
                  setTransferAmountInput(e.target.value);
                }}
              />
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) => {
                  setTransferRecipientInput(e.target.value);
                }}
              />
              <Button size="lg" variant="primary" onClick={transfer}>
                Transfer
              </Button>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Control
                type="number"
                placeholder="Amount"
                onChange={(e) => {
                  setBurnInput(e.target.value);
                }}
              />

              <Button size="lg" variant="danger" onClick={burn}>
                Burn
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
