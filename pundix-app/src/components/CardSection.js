import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
} from "react-bootstrap";
import Web3 from "web3";
import { ethers } from "ethers";

export default function CardSectionERC20({ erc721, metaMaskAddress }) {
  const erc721Contract = erc721;

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [supply, setSupply] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [burnInput, setBurnInput] = useState(0);
  const [mintInput, setMintInput] = useState("");

  useEffect(() => {
    getTotalSupply();
    getName();
    getOwner();
    getPaused();
  }, []);

  function getTotalSupply() {
    erc721Contract.methods.totalSupply().call((err, result) => {
      if (err) {
        console.error("Error: ", err);
      }
      setSupply(result);
    });
  }
  function getName() {
    erc721Contract.methods.name().call((err, result) => {
      if (err) {
        console.error("Error: ", err);
      }
      console.log(result);
      setName(result);
    });
  }
  function getOwner() {
    erc721Contract.methods.owner().call((err, result) => {
      if (err) {
        console.error("Error: ", err);
      }
      setOwner(result);
    });
  }

  function getPaused() {
    erc721Contract.methods.paused().call((err, result) => {
      if (err) {
        console.error("Error: ", err);
      }
      console.log(result);
      setIsPause(result);
    });
  }

  function mint() {
    if (!Web3.utils.isAddress(mintInput)) {
      alert("please provide a valid address");
      return;
    }
    erc721Contract.methods
      .safeMint(mintInput)
      .send({ from: metaMaskAddress }, (err, result) => {
        if (err) {
          console.error("Error: ", err);
        }
      })
      .once("receipt", (receipt) => {
        getTotalSupply();
      });
  }

  function pause() {
    erc721Contract.methods
      .pause()
      .send({ from: metaMaskAddress }, (err, result) => {
        if (err) {
          console.error("Error: ", err);
        }
      })
      .once("receipt", (receipt) => {
        getPaused();
      });
  }

  function unpause() {
    erc721Contract.methods
      .unpause()
      .send({ from: metaMaskAddress }, (err, result) => {
        if (err) {
          console.error("Error: ", err);
        }
      })
      .once("receipt", (receipt) => {
        getPaused();
      });
  }

  function burn() {
    if (burnInput < 0) {
      alert("please provide a valid number");
      return;
    }
    erc721Contract.methods
      .burn(ethers.BigNumber.from(burnInput))
      .send({ from: metaMaskAddress }, (err, result) => {
        if (err) {
          console.error("Error: ", err);
        }
      })
      .once("receipt", (receipt) => {
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
          UUPS erc721. It have a mint, burn and pause function
        </Card.Text>
        <Row>
          <Col>
            <Form>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) => {
                  setMintInput(e.target.value);
                }}
                required
              />
            </Form>
            <Button size="lg" variant="success" onClick={mint}>
              Mint
            </Button>
          </Col>
          <Col>
            {isPause ? (
              <Button size="lg" variant="primary" onClick={unpause}>
                Unpause
              </Button>
            ) : (
              <Button size="lg" variant="warning" onClick={pause}>
                Pause
              </Button>
            )}
          </Col>
          <Col>
            <Form>
              <Form.Control
                type="number"
                placeholder="Token index"
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
