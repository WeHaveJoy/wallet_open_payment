const fetch = require("node-fetch");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const CHIMONEY_API = "https://api-v2-sandbox.chimoney.io/";
const API_KEY = process.env.API_KEY || "0000";

class InterledgerController {
 
  static async createSubaccount(req, res) {
    try {
      const { name, email, firstName, lastName, phoneNumber, meta = {} } = req.body;

      const response = await fetch(`${CHIMONEY_API}v0.2/sub_account/create`, {
        method: "POST",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, firstName, lastName, phoneNumber, meta })
      });

      const data = await response.json();
      if (response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Subaccount created successfully",
          data: data,
          code: 200
        });
      } else {
        return res.status(400).json({
          status: "failed",
          message: "Subaccount creation failed",
          data: data,
          code: 400
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

  
  static async issueInterledgerWalletAddress(req, res) {
    try {
      const { userID, ilpUsername } = req.body;

      const response = await fetch(`${CHIMONEY_API}v0.2/accounts/issue_wallet_address`, {
        method: "POST",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID, ilpUsername })
      });

      const data = await response.json();
      if (response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Interledger wallet address issued successfully",
          data: data,
          code: 200
        });
      } else {
        return res.status(400).json({
          status: "failed",
          message: "Failed to issue Interledger wallet address",
          data: data,
          code: 400
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

  
  static async initiatePayout(req, res) {
    try {
      const { subAccount, turnOffNotification, interledgerWallets } = req.body;

      const response = await fetch(`${CHIMONEY_API}v0.2/payouts/interledger-wallet-address`, {
        method: "POST",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ subAccount, turnOffNotification, interledgerWallets })
      });

      const data = await response.json();
      if (response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Interledger payout initiated successfully",
          data: data,
          code: 200
        });
      } else {
        return res.status(400).json({
          status: "failed",
          message: "Interledger payout initiation failed",
          data: data,
          code: 400
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }
}

module.exports = InterledgerController;