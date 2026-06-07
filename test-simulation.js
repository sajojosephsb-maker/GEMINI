const axios = require('axios');

// Replace this with your actual live Render URL
const BASE_URL = 'https://spice-auction-server.onrender.com/api/v1';

// Global tracking variables for the pipeline simulation
let adminToken, poolingToken, qualityToken, auctioneerToken, traderToken;
let targetLotNo = `LOT-${Math.floor(1000 + Math.random() * 9000)}`;
let samplePlanterEmail = "planter.test@puttady.com";
let sampleTraderId;

async function runSystemSimulation() {
  console.log(`🚀 Starting Unified Spice Auction Lifecycle Test [${targetLotNo}]\n`);

  try {
    // --- STEP 1: MASTER ADMIN LOGIN ---
    console.log("--------------------------------------------------");
    console.log("Executing Step 1: Admin Authentication Override...");
    const adminLogin = await axios.post(`${BASE_URL}/auth/login`, {
      userId: 'admin@puttady',
      password: '1234'
    });
    adminToken = adminLogin.data.token;
    console.log("✅ Admin Logged In. Master Token Generated.");

    // --- STEP 2: ADMIN CREATES PLANTER AND TRADER ACCOUNTS ---
    console.log("\nExecuting Step 2: Admin Provisioning Operational Accounts...");
    
    // Create Dummy Planter
    const planterRes = await axios.post(`${BASE_URL}/admin/users`, {
      email: samplePlanterEmail,
      password: "password123",
      role: "PLANTER",
      name: "Sajo Cardamom Farms",
      crSblRegistration: "SBL-REG-88912"
    }, { headers: { Authorization: `Bearer ${adminToken}` } });
    console.log(`✅ Planter Registered: ${samplePlanterEmail}`);

    // Create Dummy Trader
    const traderRes = await axios.post(`${BASE_URL}/admin/users`, {
      email: "trader.test@puttady.com",
      password: "password123",
      role: "TRADER",
      name: "Global Spices Export Ltd",
      gstIdentifier: "32AAAAA1111A1Z1"
    }, { headers: { Authorization: `Bearer ${adminToken}` } });
    sampleTraderId = traderRes.data.data._id;
    console.log(`✅ Trader Registered and Matrix ID Mapped: ${sampleTraderId}`);

    // Create Dummy Quality Checker & Auctioneer for token generation
    await axios.post(`${BASE_URL}/admin/users`, { email: "quality@puttady.com", password: "123", role: "QUALITY" }, { headers: { Authorization: `Bearer ${adminToken}` } });
    await axios.post(`${BASE_URL}/admin/users`, { email: "auctioneer@puttady.com", password: "123", role: "AUCTIONEER" }, { headers: { Authorization: `Bearer ${adminToken}` } });
    await axios.post(`${BASE_URL}/admin/users`, { email: "pooling@puttady.com", password: "123", role: "POOLING_CENTER" }, { headers: { Authorization: `Bearer ${adminToken}` } });

    // --- STEP 3: POOLING CENTER INTAKE (CATEGORY 9) ---
    console.log("--------------------------------------------------");
    console.log("Executing Step 3: Simulating Inbound Weigh-In (Category 9)...");
    const poolLogin = await axios.post(`${BASE_URL}/auth/login`, { userId: 'pooling@puttady.com', password: '123' });
    poolingToken = poolLogin.data.token;

    const inboundLot = await axios.post(`${BASE_URL}/pooling/intake`, {
      lotNo: targetLotNo,
      planterEmail: samplePlanterEmail,
      noOfBags: 45,
      qtyKg: 2250,
      poolCenter: "Puttady Main Hub"
    }, { headers: { Authorization: `Bearer ${poolingToken}` } });
    console.log(`✅ Lot successfully initialized into database state: ${inboundLot.data.data.status}`);

    // --- STEP 4: QUALITY EVALUATION LAB (CATEGORY 3) ---
    console.log("--------------------------------------------------");
    console.log("Executing Step 4: Grading & Physical Inspection (Category 3)...");
    const qualLogin = await axios.post(`${BASE_URL}/auth/login`, { userId: 'quality@puttady.com', password: '123' });
    qualityToken = qualLogin.data.token;

    const qualityUpdate = await axios.put(`${BASE_URL}/quality/update/${targetLotNo}`, {
      isSuspect: false,
      isColored: false,
      litreWt: 420,
      moisture: 11.5
    }, { headers: { Authorization: `Bearer ${qualityToken}` } });
    console.log(`✅ Physical parameters updated. Quality State: ${qualityUpdate.data.data.status}`);

    // --- STEP 5: AUCTIONEER MANAGEMENT SYSTEM (CATEGORY 5) ---
    console.log("--------------------------------------------------");
    console.log("Executing Step 5: Pushing Verified Lot to Live Terminal (Category 5)...");
    const auctLogin = await axios.post(`${BASE_URL}/auth/login`, { userId: 'auctioneer@puttady.com', password: '123' });
    auctioneerToken = auctLogin.data.token;

    const liveLot = await axios.post(`${BASE_URL}/auctioneer/push-live`, {
      lotNo: targetLotNo
    }, { headers: { Authorization: `Bearer ${auctioneerToken}` } });
    console.log(`✅ Live WebSocket Broadcast Dispatched. Lot State: ${liveLot.data.activeLot.status}`);

    // --- STEP 6: CONCLUDING AUCTION AND LEDGER SPLIT ---
    console.log("--------------------------------------------------");
    console.log("Executing Step 6: Final Lot Allocation and Financial Split...");
    
    // Simulating final allocation trigger
    const finalizationResult = await axios.post(`${BASE_URL}/auction/finalize-lot`, {
      lot_id: targetLotNo,
      dealer_id: sampleTraderId,
      concluded_rate: 1450, // Rs per KG
      table_no: 12
    }, { headers: { Authorization: `Bearer ${auctioneerToken}` } });

    console.log("--------------------------------------------------");
    console.log("🎉 SIMULATION SUCCESSFUL 🎉");
    console.log(`Final Rate: Rs. 1450/Kg`);
    console.log(`Audit Message Recieved: ${finalizationResult.data.message}`);
    console.log("The entire cross-sectional loop is communicating flawlessly!");

  } catch (error) {
    console.error("\n❌ Simulation Failed!");
    if (error.response) {
      console.error(`Status Code: ${error.response.status}`);
      console.error("Server Message:", error.response.data);
    } else {
      console.error("Connection Error:", error.message);
    }
  }
}

runSystemSimulation();